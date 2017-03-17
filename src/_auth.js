// import firebaseUi from '../vendors/firebase-ui-auth.js'
import firebaseui from 'firebaseui'
import firebase from 'firebase'

const user = {
  displayName: '',
  email: '',
  emailVerified: false,
  photoURL: '',
  uid: ''
}

const initAuthUI = function initAuthUI () {
  // firebaseui is imported by script tag
//   const firebaseui = window.firebaseui
  // FirebaseUI config.
  const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '/'
  }

  // Initialize the FirebaseUI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(firebase.auth())
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig)
}

const init = function init () {
  firebase.auth().onAuthStateChanged((theUser) => {
    if (theUser) {
      user.displayName = theUser.displayName
      user.email = theUser.email
      user.emailVerified = theUser.emailVerified
      user.photoURL = theUser.photoURL
      user.uid = theUser.uid
      // Save user state to store
      _App.$store.dispatch('onAuthStateChanged', user)
      // Checking for the first set up, there are some case as following
      const userPath = `businesses/${user.uid}`
      firebase.database().ref(userPath).once('value', (snapshot) => {
        const biz = snapshot.val()
        // Check if biz name is first set up, that's mean, name has not defined
        // if name as been set, then all set up page must not avaialbe
        if ((biz.is_finished === undefined || biz.is_finished === '') && (window.location.pathname !== '/wizard/details' && window.location.pathname !== '/wizard/select-category')) {
          window.location.pathname = '/wizard/select-category'
        } else if ((biz.is_finished !== undefined && biz.is_finished !== '') && (window.location.pathname === '/wizard/details' || window.location.pathname === '/wizard/select-category')) {
          window.location.pathname = '/'
        } else {}
      })
    } else {
      // User is signed out.
      // console.log('signed out')
      user.displayName = ''
      user.email = ''
      user.emailVerified = false
      user.photoURL = ''
      user.uid = ''
      _App.$store.dispatch('onAuthStateChanged', user)
      if (window.location.pathname !== '/login') {
        window.location.pathname = '/login'
      }
      initAuthUI()
    }
  }, (error) => {
    console.log(error)
  })
}

const getUser = function getUser () {
  return user
}

const logout = function logout () {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.reload()
  }, (error) => {
    // An error happened.
    console.log(error)
    window.location.reload()
  })
}

export default { init, getUser, logout }
