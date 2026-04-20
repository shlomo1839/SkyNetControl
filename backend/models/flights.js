import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Flight = sequelize.define("Flight", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  aircraftId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'aircrafts',
      key: 'id'
    }
  },
  departureTime: {
    type: DataTypes.DATE,
    allowNull: false, // זמן יציאה
    defaultValue: DataTypes.NOW,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: true,
},

  landingTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  destLat: {
    type: DataTypes.FLOAT, // קו רוחב
    allowNull: false,
  },
  destLong: {
    type: DataTypes.FLOAT, // קו אורך 
    allowNull: false,
  },
}, {
  tableName: 'flights',
  timestamps: true,
});

export default Flight;