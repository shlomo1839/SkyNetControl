import express from 'express';
import { createFlight, landingFlight, getAllFlights, deleteFlight, updateFlightLocation } from '../controllers/flightController.js';

const router = express.Router();

router.post('/', createFlight);
router.patch('/:id/location', updateFlightLocation);
router.patch('/:id/land', landingFlight);
router.get('/', getAllFlights);
router.delete("/:id", deleteFlight);

export default router;