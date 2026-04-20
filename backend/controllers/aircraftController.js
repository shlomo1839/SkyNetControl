import { Aircraft, AircraftType } from "../models/connections.js";

export const createAircraft = async (req, res) => {
  try {
    const { tailNumber, typeId, status } = req.body;

    console.log("data from front:", { tailNumber, typeId, status });

    if (!tailNumber || !typeId) {
      return res.status(400).json({ message: "Missing tailNumber or typeId" });
    }


    const typeExists = await AircraftType.findByPk(typeId);
    if (!typeExists) {
      return res
        .status(404)
        .json({ message: "Specified aircraft type not found" });
    }

    const newJet = await Aircraft.create({ name:tailNumber, typeId: typeId, status: status || "available" });

    const aircraftWithData = await Aircraft.findByPk(newJet.id, {
      include: [{ model: AircraftType, as: "type" }],
    });
    res.status(201).json(aircraftWithData);
  } catch (error) {
    console.error("Sql Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};


export const updateAircraft = async (req, res) => {
  try {
    const { id } = req.params;
    const { tailNumber, typeId, status } = req.body;
    if (typeId) {
      const exsistsType = await AircraftType.findByPk(typeId);
      if (!exsistsType) {
        return res.status(404).json({ message: "This type dosent exsists" });
      }
    }

    const [updatedRow] = await Aircraft.update(
      { name: tailNumber, typeId, status },
      {
        where: { id: id },
      },
    );

    if (updatedRow === 0) {
      return res
        .status(404)
        .json({ message: "Aircraft not found or no changes made" });
    }
    const updatedJet = await Aircraft.findByPk(id, {
      include: [{ model: AircraftType, as: "type" }],
    });
    res.status(200).json(updatedJet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAircraft = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Aircraft.destroy({
      where: { id: id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Aircraft not found" });
    }
    res.status(200).json({ message: "Aircraft deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllAircrafts = async (req, res) => {
  try {
    const jets = await Aircraft.findAll({
      include: [{ model: AircraftType, as: "type" }],
    });
    res.status(200).json(jets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAircraftById = async (req, res) => {
  try {
    const { id } = req.params;
    const jet = await Aircraft.findByPk(id, {
      include: [{ model: AircraftType, as: "type" }],
    });
    if (!jet) {
      return res.status(404).json({ message: "Aircraft not found" });
    }
    res.status(200).json(jet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
