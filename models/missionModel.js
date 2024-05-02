// missionModel.js

const pool = require('../config/database');

async function getAllMissions() {
    try {
        const query = `
            SELECT m.id, s.nom_salarie, s.prenom_salarie, 
                   c_depart.nom_commune AS commune_depart,
                   c_arrivee.nom_commune AS commune_arrivee,
                   m.date_depart, m.date_fin, m.valide, m.paye
            FROM mission m
            INNER JOIN salaries s ON m.id_salarie = s.id_salarie
            INNER JOIN agence a ON s.id_agence = a.id_agence
            INNER JOIN commune c_depart ON a.id_commune = c_depart.id_commune
            INNER JOIN commune c_arrivee ON m.id_commune = c_arrivee.id_commune
        `;
        const [rows, fields] = await pool.query(query);
        return rows;
    } catch (error) {
        console.error("Erreur lors de la récupération des missions :", error);
        throw error;
    }
}



async function validerMission(idMission) {
    try {
        // Mettre à jour le champ "valide" de la mission
        const [updateRows, _] = await pool.query("UPDATE mission SET valide = 1 WHERE id = ?", [idMission]);
        // Vérifier si la mise à jour a été effectuée avec succès
        if (updateRows.affectedRows > 0) {
            return { success: true, message: "La mission a été validée avec succès." };
        } else {
            return { success: false, message: "La mission n'a pas pu être validée." };
        }
    } catch (error) {
        console.error("Erreur lors de la validation de la mission :", error);
        throw error;
    }
}

module.exports = {
    getAllMissions,
    validerMission
};
