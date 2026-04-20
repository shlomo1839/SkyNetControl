import { useState } from 'react';
import AircraftForm from '../components/AircraftForm';
import AircraftTable from '../components/AircraftTable';

const FleetManagement = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className='page-container'>
            <div className='page-heafer'>
                <h1>Fleet Asset Management</h1>
                <button className="btn-primary toggle-btn" onClick={() => setIsFormOpen(!isFormOpen)}>
                    {isFormOpen ? 'Close Form' : 'Add Aircrft To Fleet'}
                </button>
            </div>

            <div className='grid layout'>
                {isFormOpen && (
                    <section className='form-section'>
                        <AircraftForm />
                    </section>
                )}
                <section className='list-section'>
                    <AircraftTable />
                </section>
            </div>
        </div>
    );
};

export default FleetManagement;