import { useState, useEffect } from "react";
import useAircraftStore from "../store/useAircraftStore";

const AircraftTypeList = () => {
const { types, fetchTypes, deleteType, updateType, loading } = useAircraftStore();

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");

    useEffect(() => {
        fetchTypes();
    }, [fetchTypes]);

const handleEditStart = (type) => {
        setEditId(type.id);
        setEditName(type.name);
    };
     const handleSave = async (id) => {
        await updateType(id, editName);
        setEditId(null);
     }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            deleteType(id);
        }  
    };
    if (loading) return <p>Loading types...</p>

    return (
        <div className="card table-card">
            <h3>Aircrafts Types List</h3>
            <table className="military-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>MODEL</th>
                        <th>maxSpeed</th>
                        <th>Fuel Capacity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map((type) => (
                        <tr key={type.id}>
                            <td>{type.id}</td>
                            <td className="bold-text">
                                {editId === type.id ? (
                                    <input 
                                        className="edit-input"
                                        value={editName} 
                                        onChange={(e) => setEditName(e.target.value)} 
                                        autoFocus
                                    />
                                ) : (
                                    type.name
                                )}
                            </td>
                            <td>{type.maxSpeed}</td>
                            <td>{type.fuelCapacity}</td>
                            <td>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {editId === type.id ? (
                                        <button className="btn-save" onClick={() => handleSave(type.id)}>Save</button>
                                    ) : (
                                        <button className="btn-edit" onClick={() => handleEditStart(type)}>Edit</button>
                                    )}
                                    
                                    <button 
                                        className="btn-delete" 
                                        onClick={() => handleDelete(type.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AircraftTypeList;