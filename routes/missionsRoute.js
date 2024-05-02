const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');


router.get('/missions', missionController.renderMissionPage);
router.post('/validerMission', missionController.validerMission);

module.exports = router;