const express = require('express');
const router = express.Router();


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