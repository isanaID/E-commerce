const { subject } = require('@casl/ability');
const Invoice = require('../models/invoice');
const { PolicyFor } = require('../utils/index');

const show = async (req, res, next) => {
    try {
        let policy = PolicyFor(req.user);
        let subjectInvoice = subject('Invoice', {...invoice, user_id: Invoice.user._id});
        if (!policy.can('read', subjectInvoice)) {
            return res.json({
                error: 1,
                message: 'You are not allowed to view this invoice'
            });
        }

        let {order_id} = req.params;
        let invoice = await Invoice
            .findOne({order: order_id})
            .populate('order')
            .populate('user');

            return res.json(invoice);
    } catch (err) {
        return res.json({
            error: 1,
            message: "Error while retrieving invoice"
        })
    }
}

module.exports = {
    show
}