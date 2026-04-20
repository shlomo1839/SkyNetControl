import {Flight, Aircraft, AircraftType} from '../models/connections.js';
import { Op } from 'sequelize';

// export const createFlight = async (req, res) => {
//     try {
//         const { aircraftId, destination, lat, lan } = req.body;

//         console.log("Data received from Frontend:", req.body);

//         // is in air?
//         const activeFlight = await Flight.findOne({
//             where: {
//                 AircraftId: aircraftId,
//                 landingTime: { [Op.is]: null}
//             }
//         });

//         if (activeFlight) {
//             return res.status(400).json({message: "Flight Already Active"})
//         };

//         // creating flight
//         const newFlight = await Flight.create({
//             aircraftId,
//             destLat,
//             destLong,
//             departureTime : departureTime || new Date()
//         });
//         res.status(201).json(newFlight);
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// };


export const createFlight = async (req, res) => {
    try{ 
        const { aircraftId, destination, lat, lng } = req.body;
        console.log("Saving flight with destination:", destination);

        const activeFlight = await Flight.findOne({
            where: {
                aircraftId: aircraftId,
                landingTime: null
            }
        });
        
        if (activeFlight) {
            return res.status(400).json({ message: "Flight Already Active" });
        };

        const newFlight = await Flight.create({
            aircraftId : aircraftId,
            destination: destination || "Unknown",
            destLat: parseFloat(lat),
            destLong: parseFloat(lng),
            departureTime : new Date()
        });
        const flightWithData = await Flight.findByPk(newFlight.id, {
            include: [{ model: Aircraft, as: 'aircraft' }]
        })
        res.status(201).json(flightWithData);
        
    } catch (error) {
        console.error("Error in createFlight:", error.message);
        res.status(400).json({ error: error.message });

    }
}

export const landingFlight = async (req, res) => {
    try {
        const { id } = req.params;
        const flight = await Flight.findByPk(id);

        if (!flight) {
            return res.status(404).json({ message: "Flight dwosent exsists"})
        }

        await flight.update({
            landingTime: new Date()
        });
        
       const updatedFlight = await Flight.findByPk(id, {
            include: [{ model: Aircraft, as: 'aircraft' }]
        });

        res.status(200).json(updatedFlight);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

export const getAllFlights = async (req, res) => {
    try {
        const flights = await Flight.findAll({
            include: [
                {
                    model: Aircraft,
                    as: 'aircraft',
                    include: [{ model: AircraftType, as: 'type' }]
                }
            ],
            order: [['departureTime', 'DESC']]
    });
        res.status(200).json(flights)
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};


export const deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Flight.destroy({
      where: { id: id }
    });

    if (!deleted) {
      return res.status(404).json({ message: "this flight not exsists" });
    }

    res.status(200).json({ message: "Flight deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};