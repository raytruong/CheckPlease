import mongoose from 'mongoose';
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
    img: {type: String, default: "default.jpg"}
});

let AddonSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true}
});

let schemaCtrl = {
  transaction: mongoose.model("Transactions", TransactionSchema),
  item: mongoose.model("Items", ItemSchema),
  addon: mongoose.model("Addons", AddonSchema)
}

export default schemaCtrl;
