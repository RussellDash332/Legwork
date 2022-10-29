import json, os, datetime
from firebase import firebase

fb_app = firebase.FirebaseApplication(
    'https://dsa3101-project-default-rtdb.asia-southeast1.firebasedatabase.app', None)

JSON_FILEPATH = os.path.join(os.getcwd().replace('/firebase', ''), 'tensorflow', 'output', 'camera_log.json')
camera_log = json.loads(open(JSON_FILEPATH, 'r').read())

for log in camera_log.values():
    result = fb_app.post(f"/camera_log/{datetime.datetime.now().strftime('%Y%m%d')}", log, {'print': 'pretty'})
    print(f"Successfully uploaded to Firebase with log ID {result['name']}")