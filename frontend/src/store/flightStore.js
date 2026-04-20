import { create } from 'zustand';
import api from '../api/axios.js';

const useFlightStore = create((set, get) => ({
    flights: [],
    loading: false,
    error: null,

    fetchFlights: async () => {
        set({ loading: true });
        try {
            const response = await api.get('/flights')
            set({ flights: response.data, loading: false })
        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },

    addFlight: async (flightData) => {
        try {
            const response = await api.post('/flights', flightData);
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
            const response = await api.patch(`/flights/${id}/land`);
            const updatedFlight = response.data;

            set((state) => ({
                flights: state.flights.map((f) =>
                    Number(f.id) == Number(id) ? updatedFlight : f)
            }));
        } catch (error) {
            set({ error: 'Error in Update Landing', loading: false })
        }
    }
}));

export default useFlightStore;