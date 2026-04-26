import Map from '../components/Map';


const MapPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ padding: '10px', background: '#595c64', color: 'white' }}>
        <h1>Live Flight Map</h1>
        <small>Click on the map to add a new flight</small>
      </header>
      
      <main style={{ flex: 1, position: 'relative', overflow: 'hidden'  }}>
        <Map />
      </main>
    </div>
  );
};

export default MapPage;