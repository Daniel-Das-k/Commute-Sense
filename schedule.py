from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)  

def time_to_datetime(time_str):
    return datetime.strptime(time_str, '%I:%M %p')

df = pd.read_csv('03STL_updated.csv')

# New bus allotment times
new_bus_times = [
    time_to_datetime('06:10 AM'), time_to_datetime('06:40 AM'), time_to_datetime('07:20 AM'),
    time_to_datetime('07:30 AM'), time_to_datetime('07:40 AM'), time_to_datetime('07:50 AM')
]

# Convert the relevant arrival time columns to datetime
arrival_time_columns = ['Arrival Time'] + [f'Arrival Time Bus {i}' for i in range(2, 8)]
for col in arrival_time_columns:
    df[col] = df[col].apply(time_to_datetime)

# Function to track the bus along the route
def track_bus(df, start_time, bus_id, arrival_time_column):
    output = []
    bus_capacity = 0
    max_capacity = 50  # Maximum bus capacity

    # Start tracking the bus from the first stop
    for i, row in df.iterrows():
        current_arrival_time = row[arrival_time_column]

        # Determine the number of passengers getting off at this stop
        passengers_getting_off = random.randint(0, min(bus_capacity, 10))
        bus_capacity -= passengers_getting_off

        # Determine the number of passengers getting on at this stop
        new_passengers = random.randint(1, 10)
        
        # Ensure total passengers do not exceed bus capacity
        if bus_capacity + new_passengers > max_capacity:
            new_passengers = max_capacity - bus_capacity  # Only allow as many passengers as the bus can hold
        
        bus_capacity += new_passengers
        
        output.append(f"Bus {bus_id} reached {row['Stop Name']} at {current_arrival_time.strftime('%I:%M %p')}.")
        output.append(f"{passengers_getting_off} passengers got off, {new_passengers} new passengers got on.")
        output.append(f"Total passengers: {bus_capacity}")
        
        # Check if the current time matches a new bus allotment time
        if current_arrival_time == start_time:
            if bus_capacity > 10:  # Threshold for deciding if a new bus is needed
                output.append("-------------------------------")
                output.append(f"New bus {bus_id} allotted at {current_arrival_time.strftime('%I:%M %p')} due to sufficient passengers in the existing bus.")
                output.append("-------------------------------")
                return output, True  # Return output and True if a new bus is allotted
            else:
                output.append("-------------------------------")
                output.append(f"New bus {bus_id} skipped at {current_arrival_time.strftime('%I:%M %p')} due to low passenger count.")
                output.append("-------------------------------")
                return output, False  # Return output and False if no new bus is needed

    return output, False  # Return output and False if no new bus is needed throughout the route

@app.route('/track_buses', methods=['GET'])
def track_buses():
    output = []
    bus_id = 1
    for start_time, arrival_time_column in zip(new_bus_times, arrival_time_columns):
        output.append(f"Tracking Bus {bus_id} from starting point...")
        bus_output, new_bus_allotted = track_bus(df, start_time, bus_id, arrival_time_column)
        output.extend(bus_output)
        if new_bus_allotted:
            bus_id += 1  # Increment bus ID for the next bus
    output.append("All buses tracked.")
    
    return jsonify(output)  # Return the output as JSON

if __name__ == '__main__':
    app.run(debug=True)
