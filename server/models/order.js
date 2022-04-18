const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Invoice = require('./invoice');

const orderSchema = Schema({
    status: {
        type: String,
        enum: ['waiting_payment', 'processing', 'in_delivery', 'delivered', 'cancelled'],
        default: 'waiting_payment'
    },

    delivery_fee: {
        type: Number,
        default: 0
    },

    delivery_address: {
        address: { type: String, required: [true, 'alamat harus diisi.'] },
        kota: { type: String, required: [true, 'kota harus diisi.'] },
        provinsi: { type: String, required: [true, 'provinsi harus diisi.'] },
        kodepos: { type: String, required: [true, 'kode pos harus diisi.'] },
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    order_items: [{type: Schema.Types.ObjectId, ref: 'OrderItem'}],

}, { timestamps: true });

orderSchema.plugin(AutoIncrement, { inc_field: 'order_number' });
orderSchema.virtual('item_count').get(function() {
    return this.order_items.reduce((total, item) => total + parseInt(item.qty), 0);
});
orderSchema.post('save', async function() {
    console.log(`${this}`)
    await this.populate('order_items');
    let sub_total = this.order_items.reduce((total, item) => total + (item.price * item.qty), 0);
    let invoice = new Invoice({
        user: this.user,
        order: this._id,
        order_items: this.order_items,
        order_number: this.order_number,
        sub_total: sub_total,
        delivery_fee: parseInt(this.delivery_fee),
        total: sub_total + parseInt(this.delivery_fee),
        delivery_address: this.delivery_address
    });
    const savedInvoice = await invoice.save();
    return savedInvoice;
});

module.exports = model('Order', orderSchema);