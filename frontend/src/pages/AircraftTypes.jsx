import { useState } from "react";
import AircraftTypeForm from "../components/AircraftTypeForm";
import AircraftTypeList from "../components/AircraftTypeList";

const AircraftTypes = () => {
  const [isFormOpen, setIsFormOpen] = useState();

  return (
    <div className="page-container">
      <div className="page-header">
        <button
          className="btn-primary toggle-btn"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? "Close Form" : "Add New Type"}
        </button>
      </div>

      <div className="grid-layout">
        {isFormOpen && (
          <section className="form-section">
            <AircraftTypeForm />
          </section>
        )}

        <section className="list-section">
          <AircraftTypeList />
        </section>
      </div>
    </div>
  );
};

export default AircraftTypes;
