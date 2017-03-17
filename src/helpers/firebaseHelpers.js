import firebase from 'firebase'

export function fireInit (func) {
    // !!!! Replace with your own Firebase settings !!!!!
  let config = {
    apiKey: 'AIzaSyBzZaFyN15RQTQpL_KWYPruUEera45EsBM',
    authDomain: 'quickstart-41946.firebaseapp.com',
    databaseURL: 'https://quickstart-41946.firebaseio.com',
    storageBucket: 'quickstart-41946.appspot.com',
    messagingSenderId: '776746405097'
  }
  firebase.initializeApp(config)
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      func(true, user)
    } else {
      func(false)
    }
  }, error => {
    console.log(error)
  }
 )
}
