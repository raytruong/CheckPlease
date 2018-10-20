const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json());

const pagesCtrl = require('./pages/pagesCtrl');
const apiCtrl = require('./api/apiCtrl');

// pages
router.get('/', pagesCtrl.home, pagesCtrl.render);

// api
router.get('/EXAMPLE-PATH', apiCtrl.EXAMPLEAPIFUNC);

router.get('/items',apiCtrl.getStoreItems);

router.get('/login',apiCtrl.getLogin);

router.get('/manage',apiCtrl.getManage);

router.post('/new-item',apiCtrl.addStoreItem);

router.post('/check-out',apiCtrl.checkout);

router.post('/login',apiCtrl.login);

router.post('/edit-item/:id',apiCtrl.editItem);

router.post('/transaction-history',apiCtrl.getTransactionHistory);

router.delete('/delete-transaction/:id',apiCtrl.deleteTransaction);

router.delete('/delete-item/:id',apiCtrl.deleteItem);

// static files
router.use('/css', express.static('public/css'));
router.use('/images', express.static('public/images'));
router.use('/js', express.static('public/js'));

module.exports = router;
