import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Aircraft = sequelize.define(
  "Aircraft",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status : {
      type: DataTypes.ENUM("available", "maintenance", "operational"),
      defaultValue: "available",
       allowNull: false,
    }
  },
  {
    tableName: "aircraft",
    timestamps: true,
  },
);

export default Aircraft;
