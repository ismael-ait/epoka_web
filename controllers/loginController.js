const loginModel = require('../models/loginModel');

const loginController = {
    // Fonction qui affiche la vue du formulaire de connexion
    async renderLoginForm(req, res) {
        res.render('login');
    },

    // Fonction qui effectue l'opération de connexion, et redirige vers la vue en fonction du rôle de l'utilisateur
    async login(req, res) {
        try {
            const { id_salarie, mdp_salarie } = req.body;
            const utilisateur = await loginModel.getUtilisateurByLogin(id_salarie, mdp_salarie);
            if (utilisateur) {
                req.session.user = utilisateur; // Enregistrer l'utilisateur dans la session
                
               // console.log(utilisateur)
             
                res.redirect('/accueil'); // Redirection vers l'URL /accueil
            } else {
                res.send("Identifiant ou mot de passe incorrect.");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Une erreur s'est produite lors de la connexion.");
        }
    },

    // Fonction de déconnexion
    logout(req, res) {
        // Détruire la session de l'utilisateur
        req.session.destroy((err) => {
            if (err) {
                console.error("Erreur lors de la déconnexion :", err);
                res.status(500).send("Une erreur s'est produite lors de la déconnexion.");
            } else {
                // Rediriger vers la page d'accueil ou une autre page
                res.redirect('/login');
            }
        });
    }
};

module.exports = loginController;
