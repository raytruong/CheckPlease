import mongoose from 'mongoose';
import schemaCtrl from '../mongo/models/schema';


function connectToDb() {
  mongoose.connect("mongodb://admin:admin@cluster0-shard-00-00-ipvsp.gcp.mongodb.net:27017,cluster0-shard-00-01-ipvsp.gcp.mongodb.net:27017,cluster0-shard-00-02-ipvsp.gcp.mongodb.net:27017/wcg?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true });
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  return db;
}

let getStoreItems = function getStoreItems(req, res) {
  //return list of items from database
  let db = connectToDb();
  db.once('open', () => {
    schemaCtrl.item.find({}, function (err, items) {
      if (err) {
        res.status(500).send({ message: "Error getting items" });
      }
      else {
        res.send(items);
      }
    });
  });
}

let addStoreItem = function addStoreItem(req, res) {
  //add item to database
  let db = connectToDb();
  db.once('open', () => {
    let newItem = new schemaCtrl.item({
      name: req.body.name,
      price: req.body.price,
      addons: []
    });

    newItem.save(function (err, newItem) {
      if (err) return res.status(500).send({ message: 'could not add new item' });
      else res.status(200).send({ message: 'successfully added item to the database' });
    });
  });
}

let deleteItem = function deleteItem(req, res) {
  //delete an item from the database
  let db = connectToDb();
  db.once('open', () => {
    let id = req.params.id;
    schemaCtrl.item.deleteOne({ _id: id }, function (err) {
      if (err) {
        res.status(500).send({ message: "Error deleting item" });
      }
      else {
        res.status(200).send({ message: "Successfully deleted item" });
      }
    });
  });
}

let checkout = function checkout(req, res) {
  //checkout with the items
  let db = connectToDb();

  db.once('open', () => {
    let newTransaction = new schemaCtrl.transaction({
      items: req.body.items,
      tax: req.body.tax,
      subtotal: req.body.subtotal,
      total: req.body.total
    });

    newTransaction.save(function (err, newTransaction) {
      if (err) return res.status(500).send({ message: 'could not proceed to transaction' });
      else res.status(200).send({ message: 'successfully checked out' });
    });
  });
}

let editItem = function editItem(req, res) {
  //edit item details
  let db = connectToDb();
  db.once('open', () => {
    let id = req.params.id;
    schemaCtrl.item.findById(id, function(err, item) {
      if (err) res.status(500).send({ message: "Error updating item" });
      else {
        item.name = req.body.name;
        item.price = req.body.price;
        item.save(function (err) {
          if (err) res.status(500).send({ message: "Error updating item" });
          res.status(200).send({ message: "Successfully updated item" });
        });
      }
    });
  });
}

let getTransactionHistory = function getTransactionHistory(req, res) {
  //return all past transactions from database
  let db = connectToDb();
  db.once('open', () => {
    schemaCtrl.transaction.find({}, function (err, transactions) {
      if (err) {
        res.status(500).send({ message: "Error getting transactions" });
      }
      else {
        res.send(transactions);
      }
    });
  });
}

let deleteTransaction = function deleteTransaction(req, res) {
  //delete specified transaction from database
  let db = connectToDb();
  db.once('open', () => {
    let id = req.params.id;
    schemaCtrl.transaction.deleteOne({ _id: id }, function (err) {
      if (err) {
        res.status(500).send({ message: "Error deleting transaction" });
      }
      else {
        res.status(200).send({ message: "Successfully deleted transaction" });
      }
    });
  });
}

let apiCtrl = {
  getStoreItems: getStoreItems,
  addStoreItem: addStoreItem,
  deleteItem: deleteItem,
  checkout: checkout,
  editItem: editItem,
  getTransactionHistory: getTransactionHistory,
  deleteTransaction: deleteTransaction
}

export default apiCtrl;
