let models = require('../mongo/models/schemas.js'); //import the schema library
let transaction = models.transactions;
let item = models.items;
let addon = models.addons;

const mongoose = require('mongoose');
mongoose.connect('localhost:27017/data');

export function getStoreItems(req,res){
  //return list of items from database
  return {};
}

export function addStoreItem(req, res) {
  //add store items to the database;
  newItem = new item({
    name: req.body.name,
    price: req.body.price,
    addons: []
  })
  if (newItem.save().hasWriteError()) {
    res.status(500).send({message: 'Unsuccessful request to add item'});
  }
  else {
    res.status(200).send({message: 'Sucessfully added item to the database'});
  }
}

export function getLogin(req,res){
  //return login page;
  return {};
}

export function deleteItem(req,res){
  //delete an item from the database
  return {};
}

export function checkout(req,res){
  //checkout with the items
  return {};
}

export function login(req,res){
  //check details and authenticate
  return {};
}

export function getManage(req,res){
  //return manage page
  return {};
}

export function editItem(req,res){
  //edit item details
  return {};
}

export function getTransactionHistory(req,res){
  //return all past transactions from database
  return {};
}

export function deleteTransaction(req,res){
  //delete specified transaction from database
  return {};
}

function exitMongo(){
  mongoose.disconnect();
}
