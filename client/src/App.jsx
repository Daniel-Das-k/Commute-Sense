import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BusTracker = () => {
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the Flask server
    axios.get('http://127.0.0.1:5000/track_buses')
      .then(response => {
        setBusData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Bus Tracking Information</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {busData.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BusTracker />
    </div>
  );
}

export default App;
