import React from 'react';
import FlightForm from '../components/FlightForm';
import FlightTable from '../components/FlightTable';

const FlightMonitor = () => {
    return (
        <div className="monitor-container">
            <header className="monitor-header">
                <h2>Flight Operations Monitor</h2>
            </header>
            
            <div className="monitor-grid">
    
                <aside className="form-section">
                    <FlightForm />
                </aside>
                
                <main className="table-section">
                    <FlightTable />
                </main>
            </div>
        </div>
    );
};

export default FlightMonitor;