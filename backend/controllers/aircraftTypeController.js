import { AircraftType } from "../models/connections.js";

export const getAllTypes = async (req, res) => {
  try {
    const types = await AircraftType.findAll();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await AircraftType.findByPk(id);
    if (!type) {
      return res.status(404).json({ message: "type not found" });
    }
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createType = async (req, res) => {
    try {
        const { name, maxSpeed, fuelCapacity } = req.body
        const newType = await AircraftType.create({ name, maxSpeed, fuelCapacity });
        res.status(200).json(newType);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: "Type name already exists"})
        }
        res.status(400).json({ error: error.message })
    };
};


export const updateType = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRow] = await AircraftType.update(req.body, {
            where: {id: id},
        });

        if (updatedRow === 0) {
            return res.status(404).json({ message: "Aircraft type not found or no changes made" });
        }

        res.status(200).json({ message: "Update successful" });
    } catch(error) {
        res.status(500).json({ message: error.message})
    }
};


export const deleteType = async (req, res) => {
  try {
    const { id } = req.params;

    
    const deleted = await AircraftType.destroy({
      where: { id: id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Aircraft type not found" });
    }

    res.status(200).json({ message: "Type deleted successfully" });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ 
        message: "Cannot delete type: It is currently assigned to existing aircraft." 
      });
    }
    res.status(500).json({ error: error.message });
  }
};

