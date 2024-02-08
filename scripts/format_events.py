import json
from datetime import datetime, timedelta, timezone
from prompt_toolkit import prompt
from prompt_toolkit.completion import WordCompleter
# Function to add minutes to a Unix timestamp
def add_minutes_to_timestamp(timestamp, minutes):
    original_time = datetime.fromtimestamp(int(timestamp), tz=timezone.utc)
    new_time = original_time + timedelta(minutes=minutes)
    return int(new_time.timestamp())


# Function to convert Unix timestamp to Eastern Standard Time
def convert_to_est(timestamp):
    original_time = datetime.fromtimestamp(int(timestamp), tz=timezone.utc)
    est_time = original_time.astimezone(timezone(timedelta(hours=-5)))
    return est_time.strftime('%Y-%m-%d %I:%M:%S %p')


# Shift all events
def shift_all_events(minutes, file_path):
    # Load the JSON data from the file
    with open(file_path, 'r') as file:
        data = json.load(file)
    # Iterate over the events and update the timestamps
    for event_id, event in data["schedule-uh9"]["events"].items():
        event['startTime'] = str(add_minutes_to_timestamp(event['startTime'], minutes))
        event['endTime'] = str(add_minutes_to_timestamp(event['endTime'], minutes))
    # Save the updated JSON data back to the file
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)
    print("All events shifted successfully.")


# Function to handle user interaction
def interact_with_user():
    # Prompt for the file path
    file_path = prompt('Please enter the file path: ')
    # Load the JSON data from the file
    with open(file_path, 'r') as file:
        data = json.load(file)
    # Iterate over the events
    for event_id, event in data["schedule-uh9"]["events"].items():
        print(f"Event {event_id}: {event['name']}")
        print(f"Start Time (EST): {convert_to_est(event['startTime'])}")
        print(f"End Time (EST): {convert_to_est(event['endTime'])}")
        # Prompt for action
        action = prompt('Choose an action (c: change time, A: change all, s: skip, e: exit): ', 
                        completer=WordCompleter(['c', 's', 'e', 'A']))
        if action == 'c':
            # Prompt for new start time
            minutes = int(prompt('Enter minutes to shift start time (positive to shift forward, negative to shift backward): '))
            event['startTime'] = str(add_minutes_to_timestamp(event['startTime'], minutes))
            # Prompt for new end time
            minutes = int(prompt('Enter minutes to shift end time (positive to shift forward, negative to shift backward): '))
            event['endTime'] = str(add_minutes_to_timestamp(event['endTime'], minutes))
            # Save the updated JSON data back to the file
            with open(file_path, 'w') as file:
                json.dump(data, file, indent=4)
            print("Time updated successfully.")
        elif action == 'A':
            minutes = int(prompt('Enter minutes to shift start and end time (positive to shift forward, negative to shift backward): '))
            shift_all_events(minutes,file_path)
        elif action == 's':
            continue
        elif action == 'e':
            break
        else:
            print("Invalid action. Please enter 'c', 's', or 'e'.")


# Run the interactive tool
interact_with_user()

