require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const baseConfig = process.env.DATABASE_URL
  ? {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
    use_env_variable: 'DATABASE_URL',
  }
  : {
    dialect: 'postgres',
    logging: false,
  };

module.exports = {
  development: {
    ...baseConfig,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
  test: {
    ...baseConfig,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
  production: {
    ...baseConfig,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
};
