import express from 'express';
const router = express.Router();

import bodyParser from 'body-parser';
router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json());

// control files
import pagesCtrl from './pages/pagesCtrl';
import apiCtrl from './api/apiCtrl';

// pages
router.get('/', pagesCtrl.home, pagesCtrl.render);
router.get('/transactions', pagesCtrl.transactionHistory, pagesCtrl.render);

// api
router.get('/items',apiCtrl.getStoreItems);
router.get('/login',apiCtrl.getLogin);
router.get('/manage',apiCtrl.getManage);
router.get('/transaction-history',apiCtrl.getTransactionHistory);
router.post('/new-item',apiCtrl.addStoreItem);
router.post('/check-out',apiCtrl.checkout);
router.post('/login',apiCtrl.login);
router.post('/edit-item/:id',apiCtrl.editItem);
router.delete('/delete-transaction/:id',apiCtrl.deleteTransaction);
router.delete('/delete-item/:id',apiCtrl.deleteItem);

// static files
router.use('/css', express.static('public/css'));
router.use('/images', express.static('public/images'));
router.use('/js', express.static('public/js'));

export default router;
