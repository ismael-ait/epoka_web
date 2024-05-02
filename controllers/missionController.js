const missionModel = require('../models/missionModel');

const missionController = {
    async renderMissionPage(req, res) {
        try {
            const user = req.session.user;
            if (user && user.responsable_bool === 1) {
                // Récupérer la liste des missions depuis le modèle
                const missions = await missionModel.getAllMissions();
                // Rendre la vue avec les données des missions
                res.render('missions', { missions: missions });
            } else {
                res.status(403).send("Accès non autorisé");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Une erreur s'est produite lors de la récupération des missions.");
        }
    },
    async validerMission(req, res) {
        try {
            const user = req.session.user;
            // Vérifier si l'utilisateur est un responsable
            if (user && user.responsable_bool === 1) {
                const idMission = req.body.missionId;
                console.log(idMission);
                // Valider la mission en utilisant la méthode du modèle
                await missionModel.validerMission(idMission);
                
                // Récupérer à nouveau la liste des missions après la validation
                const missions = await missionModel.getAllMissions();
                
                // Rendre la vue avec les données des missions actualisées
                res.render('missions', { missions: missions });
            } else {
                res.status(403).send("Accès non autorisé");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Une erreur s'est produite lors de la validation de la mission.");
        }
    }
    

};


module.exports = missionController;
