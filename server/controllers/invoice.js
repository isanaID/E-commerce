const { subject } = require('@casl/ability');
const Invoice = require('../models/invoice');
const { policyFor } = require('../utils/index');

async function show(req, res, next){
    try{
      let policy = policyFor(req.user);
      let invoice = await Invoice.findOne({order: req.params.order_id});
      if(!policy.can('read', invoice)){
        return res.json({
          error: 1, 
          message: `Anda tidak memiliki akses untuk melihat invoice ini.`
        });
      }
      if(!invoice) return res.status(404).json({error: 1, message: 'Invoice not found'});
        // const ability = policyFor(req.user, 'invoice', invoice);
        // if(!ability.can('show', 'invoice')) return res.status(403).json({error: 1, message: 'You are not authorized to view this invoice'});
      return res.json(invoice);
    } catch(err) {
  
      return res.json({
        error: 1, 
        messageerror: err.message,
        message: `Error when getting invoice.`
      });
  
    }
  }

module.exports = {
    show
}