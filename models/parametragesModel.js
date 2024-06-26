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

async function getAllDistances() {
    try {
        const query = `
            SELECT d.*, c1.nom_commune AS nom_depart, c2.nom_commune AS nom_arrivee
            FROM distance d
            INNER JOIN commune c1 ON d.id_commune1 = c1.id_commune
            INNER JOIN commune c2 ON d.id_commune2 = c2.id_commune
        `;
        const [rows, fields] = await pool.query(query);
        return rows;
    } catch (error) {
        console.error("Erreur lors de la récupération des distances :", error);
        throw error;
    }
}

async function updateRemboursement(montant_km, montant_journee) {
    try {
        const [updateRows, _] = await pool.query("UPDATE parametres SET montant_km = ?, montant_journee = ?", [montant_km, montant_journee]);
        if (updateRows.affectedRows > 0) {
            return { success: true, message: "Remboursement mis à jour avec succès." };
        } else {
            return { success: false, message: "Le remboursement n'a pas pu être mis à jour." };
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour du remboursement :", error);
        throw error;
    }
}



module.exports = {
    getAllCommunes,
    insertDistance,
    getAllDistances,
    updateRemboursement
};
