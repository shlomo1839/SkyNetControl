import { create } from "zustand";
import api from "../api/axios.js";

const useAircraftStore = create((set) => ({
  aircrafts: [],
  types: [],
  loading: false,
  error: null,

  fetchTypes: async () => {
    set({ loading: true });
    try {
      const response = await api.get("/aircraft-types");
      set({ types: response.data, loading: false });
    } catch (error) {
      set({ error: "Error in Loading Types", loading: false });
    }
  },

  fetchAircrafts: async () => {
    set({ loading: true });
    try {
      const response = await api.get("/aircraft");
      set({ aircrafts: response.data, loading: false });
    } catch (err) {
      set({ error: "Error in Loading aircrafts", loading: false });
    }
  },

  addType: async (typeData) => {
    set({ loading: true });
    try {
      const response = await api.post("/aircraft-types", typeData);
      const newAircraft = response.data;
      set((state) => ({
        types: [...state.types, newAircraft],
        loading: false,
      }));
      return response.data;
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "Error in adding a new aircraft type",
        loading: false,
      });
      throw err;
    }
  },

  addAircraft: async (aircraftData) => {
    try {
      const response = await api.post("/aircraft", aircraftData);
      set((state) => ({
        aircrafts: [...state.aircrafts, response.data],
      }));
      return response.data;
    } catch (err) {
      console.error("Store addAircraft error:", err);
      throw err;
    }
  },

  deleteAircraft: async (id) => {
    try {
      await api.delete(`/aircraft/${id}`);
      set((state) => ({
        aircrafts: state.aircrafts.filter((ac) => ac.id !== id),
      }));
    } catch (err) {
      set({ error: "Error in Deleting Aircraft" });
      console.error("Error deleting aircraft");
    }
  },

  toggleStatus: async (id, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "available" ? "maintenance" : "available";
      await api.put(`/aircraft/${id}`, { status: newStatus });

      set((state) => ({
        aircrafts: state.aircrafts.map((ac) =>
          ac.id === id ? { ...ac, status: newStatus } : ac,
        ),
      }));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  },

  deleteType: async (id) => {
    try {
      await api.delete(`/aircraft-types/${id}`);
      set((state) => ({
        types: state.types.filter((t) => t.id !== id),
      }));
      alert("Type deleted successfully");
    } catch (err) {
      console.error("Error deleting type:", err);
      alert(
        err.response?.data?.message ||
          "Cannot delete type while aircraft are assigned to it",
      );
    }
  },

  updateType: async (id, name) => {
    try {
      const response = await api.put(`/aircraft-types/${id}`, { name });
      set((state) => ({
        types: state.types.map((t) => (t.id === id ? response.data : t)),
      }));
    } catch (err) {
      console.error("Error updating type:", err);
    }
  },
}));

export default useAircraftStore;
