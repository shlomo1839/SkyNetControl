import Aircraft from './aircraft.js';
import AircraftType from './aircraftType.js';
import Flight from './flights.js';



AircraftType.hasMany(Aircraft, { foreignKey: 'typeId', as: 'aircrafts' });
Aircraft.belongsTo(AircraftType, { foreignKey: 'typeId', as: 'type' });


Aircraft.hasMany(Flight, { foreignKey: 'aircraftId', as: 'flights' });
Flight.belongsTo(Aircraft, { foreignKey: 'aircraftId', as: 'aircraft' });

export { Aircraft, AircraftType, Flight };