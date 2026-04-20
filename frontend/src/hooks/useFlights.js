import { useEffect } from 'react';
import useFlightStore from '../store/flightStore';

export const useFlights = () => {
  const { flights, fetchFlights, loading, error } = useFlightStore();

  useEffect(() => {
    if (flights.length === 0) {
      fetchFlights();
    }
  }, []);


  
  return {
    flights,
    isLoading: loading,
    hasError: error,
    totalFlights: flights.length
  };
};