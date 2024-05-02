const express = require('express');
const router = express.Router();
const parametragesController = require('../controllers/parametragesController');

// Afficher la page de paramétrages
router.get('/parametrages', parametragesController.renderParametragesPage);

// Soumettre les données du formulaire de distance entre villes
router.post('/ajoutDistance', parametragesController.insertDistance);
router.post('/ajoutRemboursement', parametragesController.updateRemboursement);


module.exports = router;
