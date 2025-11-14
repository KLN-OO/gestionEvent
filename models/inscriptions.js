const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Inscription = sequelize.define('Inscription', {
    inscription_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    utilisateur_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'utilisateurs',
        key: 'utilisateur_id',
      },
    },
    evenement_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'evenements',
        key: 'evenement_id',
      },
    },
    date_inscription: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'inscriptions',
    timestamps: false,
  });

  return Inscription;
};
