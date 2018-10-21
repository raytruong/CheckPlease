let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TransactionSchema = new Schema({
    items: {type: Array, required: true},
    date: {type: Date, default: Date.now},
    tax: {type: Number, required: true},
    subtotal: {type: Number, required: true},
    total: {type: Number, required: true}
});

let ItemSchema = new Schema({
    name: {type: String, required: true},
    addons: {type: Array, required: true},
    price: {type: Number, required: true},
    img: {type: String, default: 'default.png'}
});

let AddonSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = {
    transactions: mongoose.model('Transactions', TransactionSchema),
    items: mongoose.model('Items',  ItemSchema),
    addons: mongoose.model('Addons', AddonSchema)
}
