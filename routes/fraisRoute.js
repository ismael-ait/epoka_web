const express = require('express');
const router = express.Router();
const {fraisController} = require('../controllers/fraisController');


router.get('/paiements', fraisController.renderFraisPage);

module.exports = router;