import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const AircraftType = sequelize.define("AircraftType", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  maxSpeed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  fuelCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
},{
  tableName: 'aircraft_types',
  timestamps: true,
});


export default AircraftType;
