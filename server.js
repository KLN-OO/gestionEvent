require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middlewares/authMiddleware');

const eventsRoutes = require('./routes/events');
const inscriptionsRoutes = require('./routes/inscriptions');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes PUBLIQUES (sans authentification)
app.use('/api/utilisateurs', utilisateurRoutes); // Routes pour register/login
app.use('/api/events', require('./routes/events')); // Routes publiques pour les événements

// Routes PROTÉGÉES (avec authentification)
app.use('/api/events', authMiddleware, eventsRoutes); // Routes protégées pour les événements (POST/PUT/DELETE)
app.use('/api/inscriptions', authMiddleware, inscriptionsRoutes);
app.use('/api/users', authMiddleware, userRoutes); // Routes utilisateur

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅Server running on port ${PORT}`);
});
