const pool = require('../config/database');

async function getUtilisateurByLogin(id_salarie, mdp_salarie) {
    try {

        // Déclaration de la requête
    const sql = "SELECT * FROM salaries WHERE id_salarie = ? AND mdp_salarie = ?";
    //const sql = "SELECT *, libelle_role FROM utilisateur JOIN role ON utilisateur.id_role = role.id_role WHERE id_utilisateur = ? AND mdp = ?;"


        // Exécution de la requête, et récupération du résultat dans rows
        const [rows, fields] = await pool.query(sql, [id_salarie, mdp_salarie]);
        return rows[0];
    } catch (err) {
        console.error("Error fetching data from the database:", err);
        throw err;
    }
}

module.exports = {
    getUtilisateurByLogin
};
