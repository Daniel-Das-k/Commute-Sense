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

new_bus_times = [
    time_to_datetime('06:10 AM'), time_to_datetime('06:40 AM'), time_to_datetime('07:20 AM'),
    time_to_datetime('07:30 AM'), time_to_datetime('07:40 AM'), time_to_datetime('07:50 AM')
]

arrival_time_columns = ['Arrival Time'] + [f'Arrival Time Bus {i}' for i in range(2, 8)]
for col in arrival_time_columns:
    df[col] = df[col].apply(time_to_datetime)

def track_bus(df, start_time, bus_id, arrival_time_column):
    output = []
    bus_capacity = 0
    max_capacity = 50  


    for i, row in df.iterrows():
        current_arrival_time = row[arrival_time_column]

        passengers_getting_off = random.randint(0, min(bus_capacity, 10))
        bus_capacity -= passengers_getting_off

        new_passengers = random.randint(1, 10)

        if bus_capacity + new_passengers > max_capacity:
            new_passengers = max_capacity - bus_capacity 
        
        bus_capacity += new_passengers
        
        output.append(f"Bus {bus_id} reached {row['Stop Name']} at {current_arrival_time.strftime('%I:%M %p')}.")
        output.append(f"{passengers_getting_off} passengers got off, {new_passengers} new passengers got on.")
        output.append(f"Total passengers: {bus_capacity}")

        if current_arrival_time == start_time:
            if bus_capacity > 10: 
                output.append("-------------------------------")
                output.append(f"New bus {bus_id} allotted at {current_arrival_time.strftime('%I:%M %p')} due to sufficient passengers in the existing bus.")
                output.append("-------------------------------")
                return output, True 
            else:
                output.append("-------------------------------")
                output.append(f"New bus {bus_id} skipped at {current_arrival_time.strftime('%I:%M %p')} due to low passenger count.")
                output.append("-------------------------------")
                return output, False  

    return output, False 

@app.route('/track_buses', methods=['GET'])
def track_buses():
    output = []
    bus_id = 1
    for start_time, arrival_time_column in zip(new_bus_times, arrival_time_columns):
        output.append(f"Tracking Bus {bus_id} from starting point...")
        bus_output, new_bus_allotted = track_bus(df, start_time, bus_id, arrival_time_column)
        output.extend(bus_output)
        if new_bus_allotted:
            bus_id += 1  
    output.append("All buses tracked.")
    
    return jsonify(output) 

if __name__ == '__main__':
    app.run(debug=True)
