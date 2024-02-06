import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
# Initialize Firebase Admin SDK
cred = credentials.Certificate('../firebase-adminsdk.json')
firebase_admin.initialize_app(cred)
# Get a Firestore client
db = firestore.client()
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
schedule = get_schedule()

