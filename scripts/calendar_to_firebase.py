import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
# Use a service account
cred = credentials.Certificate('../firebase-adminsdk.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
# Read JSON events
with open('events.json') as f:
    events = json.load(f)
# Add events to Firestore
for event in events:
    event_ref = db.collection('events').document(event['id'])
    event_ref.set(event)
# Add event IDs to schedule
schedule_ref = db.collection('schedule-uh9').document('events')
schedule_ref.set({
    'events': [event['id'] for event in events]
})
