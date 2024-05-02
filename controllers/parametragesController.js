const Commune = require('../models/parametragesModel');

const parametragesController = {
    async renderParametragesPage(req, res) {
      const user = req.session.user;
      if (user && user.comptable_bool === 1) {
        try {
          const communes = await Commune.getAllCommunes();
          res.render('parametrages', { communes });
        } catch (error) {
          res.status(500).send("Erreur lors de la récupération des communes.");
        }
      } else {
        res.status(403).send("Accès non autorisé");
      }
    },

async insertDistance(req, res) {
    const { id_commune1, id_commune2, distance } = req.body;
    console.log(id_commune1);
    console.log(id_commune2);
    try {
      const result = await Commune.insertDistance(id_commune1, id_commune2, distance);
      
      if (result.success) {
        // Rediriger vers la même page pour rafraîchir les données
        res.redirect('/parametrages');
      } else {
        res.status(400).send(result.message);
      }
    } catch (error) {
      res.status(500).send("Erreur lors de l'insertion de la distance.");
    }
  }
};


module.exports = parametragesController;