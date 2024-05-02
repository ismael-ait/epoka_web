const pool = require('../config/database');

async function getAllMissions() {
    try {
        const query = `
        SELECT m.id, 
        s.nom_salarie, 
        s.prenom_salarie, 
        m.id_commune AS id_commune_arrivee,
        a.id_commune AS id_commune_depart,
        m.date_depart, 
        m.date_fin, 
        m.valide, 
        m.paye,
        c_depart.nom_commune AS nom_commune_depart,
        c_arrivee.nom_commune AS nom_commune_arrivee
 FROM mission m
 INNER JOIN salaries s ON m.id_salarie = s.id_salarie
 INNER JOIN agence a ON s.id_agence = a.id_agence
 INNER JOIN commune c_depart ON a.id_commune = c_depart.id_commune
 INNER JOIN commune c_arrivee ON m.id_commune = c_arrivee.id_commune
 
        `;
        const [rows, fields] = await pool.query(query);

        // Calculer le montant de la mission et ajouter l'information à chaque mission
        for (const mission of rows) {
            const distance = await getDistance(mission.id_commune_depart, mission.id_commune_arrivee);
            mission.distance = distance !== null ? distance : "Non définie";
            mission.montant = distance !== null ? (await calculateAmount(distance)).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : "Non défini";
        }

        return rows;
    } catch (error) {
        console.error("Erreur lors de la récupération des missions avec détails :", error);
        throw error;
    }
}

async function getDistance(commune_depart, commune_arrivee) {
    try {
        const query = "SELECT distance FROM distance WHERE id_commune1 = ? AND id_commune2 = ?";
        const [rows, fields] = await pool.query(query, [commune_depart, commune_arrivee]);

        return rows.length > 0 ? rows[0].distance : null;
    } catch (error) {
        console.error("Erreur lors de la récupération de la distance entre les communes :", error);
        throw error;
    }
}


async function calculateAmount(distance) {
    try {
        // Récupérer les paramètres de calcul depuis la table parametres
        const query = "SELECT montant_km, montant_journee FROM parametres";
        const [rows, fields] = await pool.query(query);
        
        if (rows.length === 0) {
            throw new Error("Aucun paramètre de calcul trouvé.");
        }

        const { montant_km, montant_journee } = rows[0];

        // Calculer le montant en fonction de la distance et des tarifs
        const montant = distance * montant_km + montant_journee;
        return montant;
    } catch (error) {
        console.error("Erreur lors du calcul du montant de la mission :", error);
        throw error;
    }
}




async function payerMission(idMission) {
    try {
        // Mettre à jour le champ "valide" de la mission
        const [updateRows, _] = await pool.query("UPDATE mission SET paye = 1 WHERE id = ?", [idMission]);
        // Vérifier si la mise à jour a été effectuée avec succès
        if (updateRows.affectedRows > 0) {
            return { success: true, message: "La mission a été payée avec succès." };
        } else {
            return { success: false, message: "La mission n'a pas pu être payée." };
        }
    } catch (error) {
        console.error("Erreur lors de la validation de la mission :", error);
        throw error;
    }
}



module.exports = {
    getAllMissions,
    payerMission
};