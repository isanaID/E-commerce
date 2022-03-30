const mongoose = require('mongoose');
const { model, Schema } = mongoose

let tagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: [true, 'Name is already taken']
    }
});

module.exports = model('Tag', tagSchema);