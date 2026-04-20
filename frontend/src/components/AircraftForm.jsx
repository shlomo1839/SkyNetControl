import { useState, useEffect } from "react";
import useAircraftStore from "../store/useAircraftStore";

const AircraftForm = () => {
  const { types, fetchTypes, addAircraft } = useAircraftStore();
  const [formData, setFormData] = useState({
    tailNumber: "",
    typeId: "",
    status: "available",
  });

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const aircraftToSave = {
        tailNumber: formData.tailNumber,
        typeId: formData.typeId,
        status: formData.status
    };

    try {
      await addAircraft(aircraftToSave);
      setFormData({ tailNumber: "", typeId: "", status: "available" });
      alert("Aircraft Added Succsseful");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card admin-card">
      <h3>Register New Aircraft</h3>
      <form onSubmit={handleSubmit} className="military-form">

        <input
          type="text"
          placeholder="Tail Number"
          value={formData.tailNumber}
          onChange={(e) =>
            setFormData({ ...formData, tailNumber: e.target.value })
          }
          required
        />

        <select
          value={formData.typeId}
          onChange={(e) => {
            setFormData({ ...formData, typeId: e.target.value });
          }}
          required
        >
        <option value=""> Select Aircraft Type </option>
        {types && types.map((type) => (
            <option key={type.id} value={type.id}>
                {type.name}
            </option>
        ))}
        </select>

        <select
            value={formData.status}
            onChange={(e) =>
                setFormData({...formData, status: e.target.value })
            }
            required
        >
          <option value="available">available</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <button type="submit" className="btn-primary">Add To Fleet</button>

      </form>
    </div>
  );
};

export default AircraftForm;

