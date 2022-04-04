const { Schema, model} = require('mongoose');

const deliveryAddressSchema = Schema ({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [255, 'Name must be at most 255 characters long']
    },

    address: {
        type: String,
        required: [true, 'Address is required'],
        minlength: [3, 'Address must be at least 3 characters long'],
        maxlength: [1000, 'Address must be at most 1000 characters long']
    },

    kota: {
        type: String,
        required: [true, 'Kota is required'],
        minlength: [3, 'Kota must be at least 3 characters long'],
        maxlength: [255, 'Kota must be at most 255 characters long']
    },

    provinsi: {
        type: String,
        required: [true, 'Provinsi is required'],
        minlength: [3, 'Provinsi must be at least 3 characters long'],
        maxlength: [255, 'Provinsi must be at most 50 characters long']
    },

    kodepos: {
        type: String,
        required: [true, 'Kode Pos is required'],
        minlength: [3, 'Kode Pos must be at least 3 characters long'],
        maxlength: [255, 'Kode Pos must be at most 50 characters long']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = model('DeliveryAddress', deliveryAddressSchema);