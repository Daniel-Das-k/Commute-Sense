import pandas as pd
import random
from datetime import datetime

# Convert the arrival times to datetime objects
def time_to_datetime(time_str):
    return datetime.strptime(time_str, '%I:%M %p')

# Load the existing bus route data from the CSV file
df = pd.read_csv('03STL_updated.csv')

# New bus allotment times
new_bus_times = [time_to_datetime('06:10 AM'), time_to_datetime('06:40 AM'), time_to_datetime('07:20 AM'),
                 time_to_datetime('07:30 AM'), time_to_datetime('07:40 AM'), time_to_datetime('07:50 AM')]

# Convert the relevant arrival time columns to datetime
arrival_time_columns = ['Arrival Time'] + [f'Arrival Time Bus {i}' for i in range(2, 8)]
for col in arrival_time_columns:
    df[col] = df[col].apply(time_to_datetime)

# Function to track the bus along the route
def track_bus(df, start_time, bus_id, arrival_time_column):
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
        
        print(f"Bus {bus_id} reached {row['Stop Name']} at {current_arrival_time.strftime('%I:%M %p')}.")
        print(f"{passengers_getting_off} passengers got off, {new_passengers} new passengers got on.")
        print(f"Total passengers: {bus_capacity}")
        
        # Check if the current time matches a new bus allotment time
        if current_arrival_time == start_time:
            if bus_capacity > 10:  # Threshold for deciding if a new bus is needed
                print("-------------------------------")
                print(f"New bus {bus_id} allotted at {current_arrival_time.strftime('%I:%M %p')} due to sufficient passengers in the existing bus.")
                print("-------------------------------")
                return True  # Return True if a new bus is allotted
            else:
                print("-------------------------------")
                print(f"New bus {bus_id} skipped at {current_arrival_time.strftime('%I:%M %p')} due to low passenger count.")
                print("-------------------------------")
                return False  # Return False if no new bus is needed

    return False  # Return False if no new bus is needed throughout the route

# Iterate over the new bus allotment times and track each bus using their specific arrival time column
bus_id = 1
for start_time, arrival_time_column in zip(new_bus_times, arrival_time_columns):
    print(f"Tracking Bus {bus_id} from starting point...")
    if track_bus(df, start_time, bus_id, arrival_time_column):
        bus_id += 1  # Increment bus ID for the next bus

print("All buses tracked.")