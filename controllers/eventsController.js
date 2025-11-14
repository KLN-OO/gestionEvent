const db = require('../models');

// Récupère tous les événements publics
exports.getAllPublic = async (req, res) => {
    try {
        const events = await db.Evenement.findAll({ where: { est_publie: true } });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Récupère un événement public par ID
exports.getByIdPublic = async (req, res) => {
    try {
        const event = await db.Evenement.findByPk(req.params.id);
        if (!event || !event.est_publie) {
            return res.status(404).json({ message: 'Événement non trouvé ou non publié' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Crée un nouvel événement
exports.create = async (req, res) => {
    try {
        const event = await db.Evenement.create({ ...req.body, organisateur_id: req.utilisateur.utilisateur_id });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Met à jour un événement
exports.update = async (req, res) => {
    try {
        const event = await db.Evenement.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        await event.update(req.body);
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Publie un événement
exports.publish = async (req, res) => {
    try {
        const event = await db.Evenement.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        await event.update({ est_publie: true });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Supprime un événement
exports.delete = async (req, res) => {
    try {
        const event = await db.Evenement.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        await event.destroy();
        res.json({ message: 'Événement supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Upload une image pour un événement
exports.uploadImage = async (req, res) => {
    // Logique pour uploader une image (à implémenter selon ton stockage)
    res.json({ message: 'Image uploadée' });
};
