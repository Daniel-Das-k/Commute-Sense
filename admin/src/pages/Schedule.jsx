// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const BusTracker = () => {
//   const [busData, setBusData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [displayedData, setDisplayedData] = useState([]); // Data to be displayed with delay
//   const [currentIndex, setCurrentIndex] = useState(0); // Track the current index for the sentence rendering

//   useEffect(() => {
//     // Fetch data from the Flask server
//     axios.get('http://127.0.0.1:5000/track_buses')
//       .then(response => {
//         setBusData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (busData.length > 0) {
//       // Start rendering sentences with a delay
//       let index = 0;
//       const interval = setInterval(() => {
//         if (index < busData.length) {
//           setDisplayedData((prev) => [...prev, busData[index]]);
//           index += 1;
//         } else {
//           clearInterval(interval); // Stop when all sentences are displayed
//         }
//       }, 1500); // Change the timeout as needed (1500ms = 1.5 seconds)
      
//       return () => clearInterval(interval); // Cleanup on unmount
//     }
//   }, [busData]);

//   return (
//     <div className="p-6">
//       <h2 className="text-4xl font-bold text-center text-red-600 mb-6 animate__animated animate__fadeIn">
//         Bus Tracking Information
//       </h2>
      
//       {loading ? (
//         <div className="flex justify-center items-center">
//           <div className="animate-spin h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full"></div>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {displayedData.map((item, index) => (
//             <div 
//               key={index} 
//               className={`p-4 shadow-lg rounded-lg hover:scale-105 transform transition-all duration-300 ${item.includes('passenger') ? 'bg-green-300' : 'bg-red-400'}`}
//             >
//               <p className="text-ls font-semibold text-gray-800">{item}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// function Scheduling() {
//   return (
//     <div className="App min-h-screen">
//       <BusTracker />
//     </div>
//   );
// }

// export default Scheduling;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BusTracker = () => {
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedData, setDisplayedData] = useState([]); // Data to be displayed with delay
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index for the sentence rendering

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

  useEffect(() => {
    if (busData.length > 0) {
      // Start rendering sentences with a delay
      let index = 0;
      const interval = setInterval(() => {
        if (index < busData.length) {
          setDisplayedData((prev) => [...prev, busData[index]]);
          
          // If the item has a red background, narrate immediately
          if (!busData[index].includes('passenger')) {
            narrate(busData[index]); // Narrate immediately for red-colored items
          }

          index += 1;
        } else {
          clearInterval(interval); // Stop when all sentences are displayed
        }
      }, 2500); // Change the timeout as needed (3500ms = 3.5 seconds for display delay)
      
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [busData]);

  // Function to handle text-to-speech narration
  const narrate = (text) => {
    const utterance = new SpeechSynthesisUtterance(text); // Create a new speech utterance
    utterance.lang = 'en-US'; // Set the language (can be changed as needed)
    speechSynthesis.speak(utterance); // Speak the utterance
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-center text-red-600 mb-6 animate__animated animate__fadeIn">
        Bus Tracking Information
      </h2>
      
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {displayedData.map((item, index) => (
            <div 
              key={index} 
              className={`p-4 shadow-lg rounded-lg hover:scale-105 transform transition-all duration-300 ${item.includes('passenger') ? 'bg-green-300' : 'bg-red-400'}`}
            >
              <p className="text-ls font-semibold text-gray-800">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function Scheduling() {
  return (
    <div className="App min-h-screen">
      <BusTracker />
    </div>
  );
}

export default Scheduling;
