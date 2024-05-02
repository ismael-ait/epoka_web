const express = require('express');
const router = express.Router();
const { fraisController } = require('../controllers/fraisController');

// Afficher la page de paiement des frais
router.get('/paiements', fraisController.renderFraisPage);

// Gérer le paiement d'une mission
router.post('/rembourser', fraisController.payerMission);

module.exports = router;
