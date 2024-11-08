import React from 'react'; // Import React for JSX syntax
import { Doughnut } from 'react-chartjs-2'; // Import Doughnut component from react-chartjs-2

const Chart = ({ active, inactive }) => { // Functional component with destructured props
    const data = {
        labels: ['Red', 'Yellow', 'Green'], // Labels for the chart
        datasets: [
            {
                label: 'buses status', // Dataset label
                data: [3, inactive + 1, active], // Data points
                backgroundColor: [ // Background colors for each data point
                    'rgba(255, 99, 132, 0.2)', // Red
                    'rgba(255, 206, 86, 0.2)', // Yellow
                    'rgba(75, 192, 192, 0.2)', // Green
                ],
                borderColor: [ // Border colors for each data point
                    'rgba(255, 99, 132, 1)', // Red
                    'rgba(255, 206, 86, 1)', // Yellow
                    'rgba(75, 192, 192, 1)', // Green
                ],
                borderWidth: 1, // Border width
            },
        ],
    };

    return <Doughnut data={data} />; // Render the Doughnut chart with the data
}

export default Chart; // Export the Chart component
