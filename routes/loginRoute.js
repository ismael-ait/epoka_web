const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Route pour afficher le formulaire de connexion
router.get('/login', loginController.renderLoginForm);

// Route pour gérer la soumission du formulaire de connexion
router.post('/login', loginController.login);

// Route pour gérer la déconnexion de l'utilisateur
router.post('/logout', loginController.logout);


// Route pour afficher la page d'accueil après la connexion
router.get('/accueil', (req, res) => {
    // Assurez-vous que l'utilisateur est connecté avant d'afficher la page d'accueil
    if (req.session.user) {
        res.render('accueil', { user: req.session.user });
    } else {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        res.redirect('/login');
    }
});

module.exports = router;