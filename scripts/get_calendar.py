import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
# Initialize Firebase Admin SDK
cred = credentials.Certificate('../firebase-adminsdk.json')
firebase_admin.initialize_app(cred)
# Get a Firestore client
db = firestore.client()
import csv

import csv
def download_collection_to_csv(collection_name):
    # Get all documents from the collection
    docs = db.collection(collection_name).stream()
    data = []
    for doc in docs:
        data.append(doc.to_dict())
    # Check if there is any data
    if data:
        # Open or create a CSV file and write the data into it
        with open(f'{collection_name}.csv', 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(data[0].keys())  # column headers
            for row in data:
                writer.writerow(row.values())  # data
        print(f"Data successfully written to {collection_name}.csv")
    else:
        print(f"No documents found in collection: {collection_name}")
# Usage
download_collection_to_csv('eSports9-user-registration-details')

def get_schedule():
    try:
        # Get the 'events' document from the 'schedule' collection
        schedule_ref = db.collection('schedule-uh9-stage').document('events')
        schedule_snap = schedule_ref.get()
        
        if not schedule_snap.exists:
            print("The 'events' document does not exist.")
            return []
        event_ids = schedule_snap.to_dict()
        print("EventIds:", event_ids)
        if not event_ids:
            print("No event IDs")
            return []
        # Fetch all events data
        schedule_data = []
        for event_id in event_ids:
            doc_snap = db.collection('events').document(event_id).get()
            event_data = doc_snap.to_dict()
            if event_data:
                schedule_data.append(event_data)
        # Sort the schedule by startTime
        sorted_schedule = sorted(schedule_data, key=lambda x: x['startTime'].seconds if 'seconds' in x['startTime'] else x['startTime'])
        # Print the sorted schedule
        for event in sorted_schedule:
            print(event)
        return sorted_schedule
    except Exception as error:
        print("Error fetching schedule:", error)
# Call the function and print the schedule

