const express = require('express');
const router = express.Router();
const parametragesController = require('../controllers/parametragesController');


router.get('/parametrages', parametragesController.renderParametragesPage);

module.exports = router;