from firebase import firebase
fb_app = firebase.FirebaseApplication(
    'https://dsa3101-project-default-rtdb.asia-southeast1.firebasedatabase.app', None)
new_user_data = {
    'Name': 'CHARLIE',
    'DOB': '27 May 1980'
}

#result = fb_app.post('/users', new_user_data, {'print': 'pretty'})
#print(result)
result = fb_app.get('/', 'users')
print(result)