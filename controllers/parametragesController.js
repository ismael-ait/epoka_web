
const parametragesController = {

    async renderParametragesPage(req, res) {
        const user = req.session.user;
        if (user && user.comptable_bool === 1) {
        res.render('parametrages');
        } else{
            res.status(403).send("Accès non autorisé");
        }
    }
};

module.exports = parametragesController;