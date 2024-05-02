// Contrôleur des frais
const fraisController = {
    async renderFraisPage(req, res) {
        const user = req.session.user;
        if (user && user.comptable_bool === 1) {
        res.render('frais');
        } else{
            res.status(403).send("Accès non autorisé");
        }
    }
};

// Exportez le contrôleur des frais et le middleware de vérification
module.exports = {
    fraisController  
};