const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Evenement = sequelize.define('Evenement', {
    evenement_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    titre: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date_debut: {
      type: DataTypes.DATE,
    },
    date_fin: {
      type: DataTypes.DATE,
    },
    categorie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'categorie_id',
      },
    },
    est_publie: {           // <--- déplacé ici, au même niveau que categorie_id
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lieu_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'lieux',
        key: 'lieu_id',
      },
    },
    organisateur_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'utilisateurs',
        key: 'utilisateur_id',
      },
    },
    cree_le: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'evenements',
    timestamps: false,
  });

  return Evenement;
};
