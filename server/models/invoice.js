const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const invoiceSchema = new Schema({
    sub_total: {
        type: Number,
        required: [true, 'Sub total is required']
    },

    delivery_fee: {
        type: Number,
        required: [true, 'Delivery fee is required']
    },

    delivery_address: {
        address: { type: String, required: [true, 'alamat harus diisi.'] },
        kota: { type: String, required: [true, 'kota harus diisi.'] },
        provinsi: { type: String, required: [true, 'provinsi harus diisi.'] },
        kodepos: { type: String, required: [true, 'kode pos harus diisi.'] },
    },

    total: {
        type: Number,
        required: [true, 'Total is required']
    },

    payment_status: {
        type: String,
        enum: ['waiting_payment', 'paid', 'cancelled'],
        default: 'waiting_payment'
    },

    order_number: {
        type: Number
    },

    order_items : {
        type: [Schema.Types.ObjectId]
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
}, { timestamps: true });

module.exports = model('Invoice', invoiceSchema);       