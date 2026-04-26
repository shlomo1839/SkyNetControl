import Map from '../components/Map';


const MapPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ padding: '10px', background: '#282c34', color: 'white' }}>
        <h1>Maps</h1>
      </header>
      
      <main style={{ flex: 1, position: 'relative' }}>
        <Map />
      </main>
    </div>
  );
};

export default MapPage;