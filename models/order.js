const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Invoice = require('./invoice');

const orderSchema = Schema({
    status: {
        type: String,
        enum: ['waiting_payment', 'processing', 'shipped', 'delivered', 'cancelled'],
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
orderSchema.virtual('save', async function(){
    let sub_total = this.order_item.reduce((total, item) => total += (item.price * item.qty), 0);
    let invoice = new Invoice({
        user: this.user,
        order: this._id,
        sub_total: sub_total,
        delivery_fee: parseInt(this.delivery_fee),
        total: sub_total + parseInt(this.delivery_fee),
        delivery_address: this.delivery_address
    });
    await invoice.save();
});

module.exports = model('Order', orderSchema);