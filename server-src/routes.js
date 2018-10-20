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

module.express = router;
