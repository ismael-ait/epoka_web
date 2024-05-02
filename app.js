const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Importation du module path
const session = require('express-session');

const app = express();


// Configuration de la session
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));


// Configuration du répertoire des fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// configuration de EJS comme moteur de template
app.set('view engine', 'ejs');
// configuration du répertoire des vues
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

// configuration des routes
const loginRoute = require('./routes/loginRoute');
const missionsRoute = require('./routes/missionsRoute');
const fraisRoute = require('./routes/fraisRoute');
const parametragesRoute = require('./routes/parametragesRoute');
const accueilRoute = require('./routes/accueilRoute');



app.use('/', loginRoute);
app.use('/', missionsRoute);
app.use('/', fraisRoute);
app.use('/', parametragesRoute);
app.use('/', accueilRoute);






// démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT}/login in your browser to access the service.`);
});
