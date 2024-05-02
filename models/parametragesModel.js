//communeModel.js
const pool = require('../config/database');

async function getAllCommunes() {
    try {
        const [rows, _] = await pool.query("SELECT * FROM commune ORDER BY categorie, nom_commune ASC");
        return rows;
    } catch (error) {
        console.error("Erreur lors de la récupération des communes :", error);
        throw error;
    }
}

async function insertDistance(id_commune1, id_commune2, distance) {
    try {
        const [insertRows, _] = await pool.query("INSERT INTO distance (id_commune1, id_commune2, distance) VALUES (?, ?, ?)", [id_commune1, id_commune2, distance]);
        if (insertRows.affectedRows > 0) {
            return { success: true, message: "Distance insérée avec succès." };
        } else {
            return { success: false, message: "La distance n'a pas pu être insérée." };
        }
    } catch (error) {
        console.error("Erreur lors de l'insertion de la distance :", error);
        throw error;
    }
}

module.exports = {
    getAllCommunes,
    insertDistance
};
