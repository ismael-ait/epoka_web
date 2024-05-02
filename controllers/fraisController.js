const fraisModel = require('../models/fraisModel')


// Contrôleur des frais
const fraisController = {
    
    async renderFraisPage(req, res) {
        const user = req.session.user;
        if (user && user.comptable_bool === 1) {
            try {
                // Récupérer toutes les missions avec les détails depuis le modèle
                const missions = await fraisModel.getAllMissions();
                console.log(missions);

                // Rendre la vue frais en transmettant les missions récupérées
                res.render('frais', { missions: missions });
            } catch (error) {
                console.error("Erreur lors de la récupération des missions :", error);
                res.status(500).send("Erreur lors de la récupération des missions");
            }
        } else {
            res.status(403).send("Accès non autorisé");
        }
    },

    async payerMission(req, res) {
        const missionId = req.body.missionId; // Récupérer l'ID de la mission à partir du corps de la requête
        try {
            // Payer la mission en utilisant la fonction dans le modèle
            const result = await fraisModel.payerMission(missionId);
            if (result.success) {
                // Si le paiement réussit, récupérer à nouveau toutes les missions
                const missions = await fraisModel.getAllMissions();
                // Renvoyer la page frais avec les missions mises à jour
                res.render('frais', { missions: missions });
            } else {
                res.status(400).json(result); // Réponse JSON si le paiement échoue
            }
        } catch (error) {
            console.error("Erreur lors du paiement de la mission :", error);
            res.status(500).json({ success: false, message: "Erreur lors du paiement de la mission" }); // Réponse JSON pour les erreurs internes
        }
    }
    
};





// Exportez le contrôleur des frais et le middleware de vérification
module.exports = {
    fraisController
};