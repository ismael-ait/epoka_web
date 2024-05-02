// missionModel.js

const pool = require('../config/database');

async function getAllMissions() {
    try {
        // Exécuter une requête pour récupérer toutes les missions
        const [rows, fields] = await pool.query("SELECT * FROM mission");
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
