const jwt = require('jsonwebtoken');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

function extractToken(req) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const xAccessToken = req.headers['x-access-token'];
    const queryToken = req.query?.token;

    if (authHeader) {
        const parts = authHeader.split(' ');
        if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
        if (parts.length === 1) return parts[0];
    }

    return xAccessToken || queryToken || null;
}

module.exports = (req, res, next) => {
    // Fallback 1: Authorization Bearer
    // Fallback 2: Authorization sans préfixe Bearer
    // Fallback 3: x-access-token ou query token
    const token = extractToken(req);
    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }
    try {
        // Vérifie le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.utilisateur = {
            ...decoded,
            utilisateur_id: decoded.utilisateur_id || decoded.userId || decoded.id || decoded.sub,
            role: decoded.role || decoded.libelle || decoded.roles?.[0],
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide' });
    }
};
