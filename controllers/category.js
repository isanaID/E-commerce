const path = require('path');
const fs = require('fs');
const config = require('../config/env');
const Categories = require('../config/model/category');

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
        await product.save();
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
        let category = await Categories.findByIDAndUpdate(id, payload, {new: true, runValidators: true});
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
        let product = await Product.findByIdAndDelete(req.params.id);
        let currentImage = `${config.rootPath}/public/images/products/${product.image_url}`;
        if(fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
        }
        return res.json(`Product ${product.name} deleted`);
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

