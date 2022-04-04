const CartItem = require('../models/cartItem');
const DeliveryAddress = require('../models/deliveryAddress');
const Order = require('../models/order');
const { Types } = require('mongoose');
const OrderItem = require('../models/orderItem');

const store = async (req, res) => {
    try{
        let {delivery_fee, delivery_address} = req.body;
        let items = await CartItem.find({user: req.user._id}).populate('product');
        if(!items) {
            return res.json({
                error: 1,
                message: 'Cart is empty'
            });
        }
        let address = await DeliveryAddress.findById(delivery_address);
        let order = new Order({
            _id: new Types.ObjectId(),
            status: 'waiting_payment',
            delivery_fee: delivery_fee,
            delivery_address: {
                address: address.address,
                kota: address.kota,
                provinsi: address.provinsi,
                kodepos: address.kodepos
            },
            user: req.user._id
        });
        let orderItems = await OrderItem
            .insertMany(items.map(item => ({
                ...item,
                name: item.product.name,
                qty: parseInt(item.qty),
                price: parseInt(item.product.price),
                order: order._id
            })));
            orderItems.forEach(item => order.order_items.push(item._id));
            order.save();
            await CartItem.deleteMany({user: req.user._id});
            return res.json(order);
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
    }
}

const index = async (req, res) => {
    try {
        let {skip = 0, limit = 10} = req.query;
        let count = await Order.find({user: req.user._id}).countDocuments();
        let orders = await Order
        .find({user: req.user._id})
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .populate('order_items')
        .sort('-created_at');
        return res.json({
            data: orders.map(order => order.toJSON({virtuals: true})),
            count
        });
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

module.exports = {
    store,
    index
}