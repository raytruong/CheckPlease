const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json());

const pagesCtrl = require('./pages/pagesCtrl');

router.get('/', pagesCtrl.home, pagesCtrl.render);

module.express = router;
