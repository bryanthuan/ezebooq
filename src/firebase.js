import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { firebaseConfig } from './configs'
// initialize Firebase
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const database = firebase.database()

// variable
let _businessInfo = {}
let _userInfo = {}
// const _memos = {}
let _businessRef = null
// let _publicMemosRef = null
// let _myMemosRef = null
// let _fetchedPublicCount = 0
// let _fetchedMyselfCount = 0

const initAuthUI = function initAuthUI () {
  // firebaseui is imported by script tag
//   const firebaseui = window.firebaseui
  // FirebaseUI config.
  const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your businesses.
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

export default {

  // Sets up shortcuts to Firebase features and initiate firebase auth.
  initFirebase () {
    // Initiates Firebase auth and listen to auth state changes.
    auth.onAuthStateChanged(this.onAuthStateChanged.bind(this))
  },

  getAuth () {
    return auth.currentUser || {}
  },

  // Signs-in
  signIn () {
    // // Sign in Firebase using popup auth and Google as the identity provider.
    // var provider = new firebase.auth.GoogleAuthProvider()
    // auth.signInWithPopup(provider)
    initAuthUI()
  },
  // Signs-out
  signOut () {
    // Sign out of Firebase.
    auth.signOut()
  },
  // Triggers when the auth state change for instance when the user signs-in or signs-out.
  onAuthStateChanged (user) {
    if (user) { // User is signed in!
      this.fetchBusinessInfo(user.uid)
        .then(val => {
          _userInfo = {
            loggedIn: true,
            uid: user.uid,
            name: user.displayName
          }
          _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))

          _businessInfo = {
            name: val.name || '',
            country: val.country || {},
            city: val.city || '',
            address: val.address || '',
            category: val.category || {},
            subcategory: val.subcategory || {},
            postcode: val.postcode || '',
            phone: val.phone || ''
          }
          _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
          _App.$store.dispatch('updateBusinessInfo', Object.assign({}, _businessInfo))
        }).catch(() => {
          _userInfo = {
            loggedIn: true,
            uid: user.uid,
            name: user.displayName
          }
          _businessInfo = {
            category: {},
            subcategory: {},
            name: '',
            address: '',
            city: '',
            country: {},
            postcode: '',
            phone: ''
          }
          // Init business information from here
          if (_App.$router.name !== 'Wizard1') {
            _App.$router.push('/wizard/select-category')
          }
          _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
          _App.$store.dispatch('updateBusinessInfo', Object.assign({}, _businessInfo))
        })
    } else {
      _userInfo = {
        loggedIn: false,
        uid: '',
        name: 'guest'
      }
      _businessInfo = {
        category: {},
        subcategory: {},
        name: '',
        address: '',
        city: '',
        country: {},
        postcode: '',
        phone: ''
      }
      _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
      _App.$store.dispatch('updateBusinessInfo', Object.assign({}, _businessInfo))

      if (_App.$router.name !== 'Login') {
        _App.$router.push('/login')
      }
      this.signIn()
    }
  },

  fetchBusinessInfo (uid) {
    return new Promise((resolve, reject) => {
      _businessRef = database.ref('businesses')
      _businessRef.child(uid).once('value')
        .then(snapshot => {
          const user = snapshot.val()
          resolve(user)
        }).catch(reject)
    })
  },

  setBusinessInfo (key, val) {
    return new Promise((resolve, reject) => {
      if (key && val && this.checkSignedInWithMessage()) {
        _businessRef = database.ref('businesses').child(_businessInfo.uid).child(key)
        _businessRef.set(val)
          .then(() => {
            _businessInfo[key] = val
            resolve()
          }).catch(reject)
      }
    })
  },

  checkSignedInWithMessage () {
    if (auth.currentUser) return true
    return false
  }
}
