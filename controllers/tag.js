const Tags = require('../config/model/tag');

const index = async (req, res, next) => {
    try {
        let { skip = 0, limit = 10 } = req.query;
        let tag = await Tags
        .find()
        .skip(parseInt(skip))
        .limit(parseInt(limit));
        return res.json(tag);
    } catch (err) {
        next(err);
    }
};

const store = async (req, res, next) => {
    try {
        let payload = req.body;
        let tag = new Tags(payload);
        await tag.save();
        return res.json(tag);
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
        let tag = await Tags.findByIdAndUpdate(id, payload, {new: true, runValidators: true});
        return res.json(tag);
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
        let tag = await Tags.findByIdAndDelete(req.params.id);
        return res.json(`Tag ${tag.name} deleted`);
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

