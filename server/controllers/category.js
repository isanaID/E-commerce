const Categories = require('../models/category');

const index = async (req, res, next) => {
    try {
        let { skip = 0, limit = 10 } = req.query;
        let Category = await Categories
        .find()
        .skip(parseInt(skip))
        .limit(parseInt(limit));
        return res.json(Category);
    } catch (err) {
        next(err);
    }
};

const store = async (req, res, next) => {
    try {
        let payload = req.body;
        let category = new Categories(payload);
        await category.save();
        return res.json(category);
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next (err);
    }
};

const update = async (req, res, next) => {
    try {
        let payload = req.body;
        let { id } = req.params;
        let category = await Categories.findByIdAndUpdate(id, payload, {new: true, runValidators: true});
        return res.json(category);
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next (err);
    }
};

const destroy = async (req, res, next) => {
    try {
        let category = await Categories.findByIdAndDelete(req.params.id);
        return res.json(`Category ${category.name} deleted`);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    store,
    index,
    update,
    destroy
};

