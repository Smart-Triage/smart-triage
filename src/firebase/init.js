import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyADna4e8M91dsfiaxw8Ybx6751GD2-jhQM',
  authDomain: 'triage-app-8e193.firebaseapp.com',
  databaseURL: 'https://triage-app-8e193.firebaseio.com',
  projectId: 'triage-app-8e193',
  storageBucket: 'triage-app-8e193.appspot.com',
  messagingSenderId: '997557645558',
  appId: '1:997557645558:web:abc6cc84ab2fdd2a597cd7',
  measurementId: 'G-2RVT4MY4HY'
}

firebase.initializeApp(config)
firebase.analytics()
