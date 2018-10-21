import mongoose from 'mongoose';
import schemaCtrl from '../mongo/models/schema';

function connectToDb() {
  mongoose.connect("mongodb://admin:admin@cluster0-shard-00-00-ipvsp.gcp.mongodb.net:27017,cluster0-shard-00-01-ipvsp.gcp.mongodb.net:27017,cluster0-shard-00-02-ipvsp.gcp.mongodb.net:27017/wcg?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true });
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  return db;
}

let getStoreItems = function getStoreItems(req,res){
  //return list of items from database
  let db = connectToDb();
  db.once('open', () => {
    schemaCtrl.item.find({},function(err,items){
      if(err){
        res.status(500).send({message: "Error getting items"});
      }
      else{
        res.send(items);
      }
    });
  });
}

let addStoreItem = function addStoreItem(req, res) {
  let db = connectToDb();

  db.once('open', () => {
    let newItem = new schemaCtrl.item({
      name: req.body.name,
      price: req.body.price,
      addons: []
    });

    newItem.save(function (err, newItem) {
      if (err) return res.status(500).send({message: 'could not add new item'});
      else res.status(200).send({message: 'successfully added item to the database'});
    });
  });
}

let getLogin = function getLogin(req,res){
  //return login page;
  return {};
}

let deleteItem = function deleteItem(req,res){
  //delete an item from the database
  let i = req.params.id;
  let arr = req.body.array;
  for(let x = 0; x < arr.length;x++){
    schemaCtrl.item.remove({_id:`${arr[x]._id}`});
  }
}

let checkout = function checkout(req,res){
  //checkout with the items
  return {};
}

let login = function login(req,res){
  //check details and authenticate
  return {};
}

let getManage = function getManage(req,res){
  //return manage page
  return {};
}

let editItem = function editItem(req,res){
  //edit item details
  return {};
}

let getTransactionHistory = function getTransactionHistory(req,res){
  //return all past transactions from database
  return {};
}

let deleteTransaction = function deleteTransaction(req,res){
  //delete specified transaction from database
  return {};
}

let apiCtrl = {
  getStoreItems: getStoreItems,
  addStoreItem: addStoreItem,
  getLogin: getLogin,
  deleteItem: deleteItem,
  checkout: checkout,
  login: login,
  getManage: getManage,
  editItem: editItem,
  getTransactionHistory: getTransactionHistory,
  deleteTransaction: deleteTransaction
}

export default apiCtrl;
