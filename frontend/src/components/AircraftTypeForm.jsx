import { useState } from "react";
import useAircraftStore from "../store/useAircraftStore";

const AircraftTypeForm = () => {
    const { addType } = useAircraftStore();
    const [formData, setFormData] = useState({ name: '', maxSpeed: '', fuelCapacity: ''});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addType(formData);
            setFormData({ name: '', maxSpeed: '', fuelCapacity: ''});
            alert("Type Of Aircraft Added Succsessfuly")
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="card admin-card">
            <h3>Adding new aircraft type</h3>
            <form onSubmit={handleSubmit} className="military-form">
                <input 
                    type="text" placeholder="type"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                    type="number" placeholder="kph"
                    value={formData.maxSpeed}
                    onChange={(e) => setFormData({...formData, maxSpeed: e.target.value})}
                />
                <input 
                    type="number" placeholder="fuelCapacity"
                    value={formData.fuelCapacity}
                    onChange={(e) => setFormData({...formData, fuelCapacity: e.target.value})}
                />
                <button type="submit" className="btn-primary">Add to fleet</button>
            </form>
        </div>
    );
};

export default AircraftTypeForm;