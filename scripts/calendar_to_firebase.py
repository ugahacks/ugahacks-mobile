from prompt_toolkit import prompt
from prompt_toolkit.completion import WordCompleter
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
# Use a service account
cred = credentials.Certificate('../firebase-adminsdk.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

def import_file():
    filename = prompt('Enter filename: ')
    with open(filename) as f:
        data = json.load(f)
    events = data.get('schedule-uh9', {}).get('events', {})
    print(f"{len(events)} events loaded from {filename}")
    return events

def upload_file(events):
    # Add events to Firestore
    events_ref = db.collection('schedule-uh9-stage').document('events')
    for event_id, event in events.items():
        events_ref.update({str(event_id): event})
    print(f"Uploaded {len(events)} events to Firestore")

def view_collection():
    collection_name = prompt('Enter collection name: ')
    docs = db.collection(collection_name).stream()
    doc_ids = [doc.id for doc in docs]
    if not doc_ids:
        print("No documents in collection.")
        return
    doc_completer = WordCompleter(doc_ids, ignore_case=True)
    doc_id = prompt('Select a document: ', completer=doc_completer)
    doc = db.collection(collection_name).document(doc_id).get()
    if doc.exists:
        print("First 3 items in document:")
        for i, (key, value) in enumerate(doc.to_dict().items()):
            if i >= 3:
                break
            print(f"{key}: {value}")
    else:
        print("Document does not exist.")

def main():
    while True:
        action = prompt('Enter action (import, upload, view, exit): ')
        if action == 'import':
            events = import_file()
        elif action == 'upload':
            if 'events' in locals():
                upload_file(events)
            else:
                print("No events to upload. Import a file first.")
        elif action == 'view':
            view_collection()
        elif action == 'exit':
            break
        else:
            print("Invalid action. Try again.")
if __name__ == '__main__':
    main()

