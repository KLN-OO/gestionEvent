const { Sequelize } = require('sequelize');
const path = require('path');

// Utilise Supabase via DATABASE_URL si disponible, sinon retombe sur la config locale.
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  })
  : new Sequelize(
    process.env.DB_NAME || 'evnto',
    process.env.DB_USER || 'evnto_user',
    process.env.DB_PASSWORD || 'evnto_pass',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      port: process.env.DB_PORT || 5432,
      logging: false,
    }
  );

// Charger tous les modèles
const models = [
  'categories',
  'evenements',
  'inscriptions',
  'lieux',
  'role',
  'utilisateurs'
].map(model => require(path.join(__dirname, '../models', model + '.js'))(sequelize, Sequelize.DataTypes));

async function migrate() {
  try {
    // Synchronise tous les modèles (crée les tables si elles n'existent pas)
    await sequelize.sync({ alter: true });
    console.log('Toutes les tables ont été migrées avec succès !');
    await sequelize.close();
  } catch (err) {
    console.error('Erreur lors de la migration :', err);
    process.exit(1);
  }
}

migrate();
