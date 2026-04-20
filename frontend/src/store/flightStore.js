import { create } from 'zustand';
import axios from 'axios';

const useFlightStore = create((set, get) => ({
    flights: [],
    loading: false,
    error: null,

    fetchFlights: async () => {
        set({ loading: true });
        try {
            const response = await axios.get('http://localhost:3000/api/flights')
            set({ flights: response.data, loading: false })
        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },

    addFlight: async (flightData) => {
        try {
            const response = await axios.post('http://localhost:3000/api/flights', flightData);
            set((state) => ({ 
                flights: [response.data, ...state.flights],
                loading: false
            }));
        } catch (error) {
            set({error: error.response?.data?.message || 'Error in flight', loading: false});
            throw error;
        } 
    },

    setLanding: async (id) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/flights/${id}/land`);
            const updatedFlight = response.data;

            set((state) => ({
                flights: state.flights.map((f) =>
                    f.id == id ? updatedFlight : f)
            }));
        } catch (error) {
            set({ error: 'Error in Update Landing', loading: false })
        }
    }
}));

export default useFlightStore;