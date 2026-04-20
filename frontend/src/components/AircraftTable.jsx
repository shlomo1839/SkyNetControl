import { useEffect } from 'react';
import useAircraftStore from '../store/useAircraftStore';

const AircraftTable = () => {
    const { aircrafts, types, fetchAircrafts, deleteAircraft, toggleStatus, loading } = useAircraftStore();

    useEffect(() => {
        fetchAircrafts();
    }, []);

    // const getTypeName = (typeId) => {
    //     const type = types.find(t => t.id === parseInt(typeId));
    //     return type ? type.name : "Unknown Type"
    // };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this aircraft?")) {
            try {
                await deleteAircraft(id);
            } catch (error) {
                alert("Error deleting aircraft");
            }
        }
    };

    if (loading) return <p>Loading Fleet...</p>


    return (
        <div className='card table-card'>
            <h3>Operational Fleet</h3>
            <table className='military-table'>
                <thead>
                    <tr>
                        <th>Tail Number</th>
                        <th>Model Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {aircrafts?.map((ac) => (
                        <tr key={ac.id}>
                        <td className='bold-text'>{ac.name}</td>
                        <td>{ac.type?.name || "Unknown Type"}</td>
                        <td>
                            <span className={`status-badge ${ac.status}`}>
                                {ac.status === 'available' ? 'OPERATIONAL' : 'MAINTENANCE'}
                            </span>
                        </td>
                        <td>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                <button
                                    className='btn-status'
                                    onClick={() => toggleStatus(ac.id, ac.status)}
                                    title="Change Status"
                                >
                                    {ac.status === 'available' ? 'Mark as Maintenance' : 'Mark as Available'}
                                </button>

                                <button
                                    className='btn-delete'
                                    onClick={() => handleDelete(ac.id)}
                                    title='Delete Aircraft'
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

export default AircraftTable;