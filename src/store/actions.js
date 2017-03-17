import firebase from 'firebase'
import moment from 'moment'
// const database = firebase.database()

// function updateBusinessName (value) {
//   return new Promise((resolve, reject) => {
//     let businessPath = 'businesses'
//   })
// }

export default {
  onAuthStateChanged: ({ commit }, user) => {
    commit('onAuthStateChanged', { user })
  },

  addService: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      const initSv = {
        'price': 0,
        'name': '',
        'created_time': moment(),
        'updated_time': moment(),
        's_touched': false,
        'duration': {
          'label': '1h',
          'value': 3600000
        },
        'description': ''
      }
      const parsedSv = JSON.parse(JSON.stringify(initSv))
      firebase.database().ref(`services/${state.user.uid}`).push(parsedSv)
        .then(val => {
          const serviceWithKey = Object.assign(initSv, { id: val.key })
          // console.log(val.key)
          commit('addService', serviceWithKey)
          resolve(serviceWithKey)
        })
    })
  },

  addStaff: ({ commit, state }, services) => {
    return new Promise((resolve, reject) => {
      // let serviceObject = services
      // console.log(services)
      const initSt = {
        'created_time': moment(),
        'updated_time': moment(),
        'name': '',
        'short_bio': ''
      }
      const parsedSt = JSON.parse(JSON.stringify(initSt))
      firebase.database().ref(`staffs/${state.user.uid}`).push(parsedSt)
        .then(val => {
          // We save initial assigned services when adding new staff
          services.forEach(service => {
            firebase.database().ref(`staffs/${state.user.uid}`).child(val.key).child('services').child(service.value).set(true)
          })
          const staffWithKey = Object.assign(initSt, { id: val.key, services })
          commit('addStaff', staffWithKey)
          resolve()
        })
    })
  },

  removeService: ({ commit, state }, key) => {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`services/${state.user.uid}`).child(key).remove()
        .then(() => {
          commit('removeService', key)
          firebase.database().ref(`staffs/${state.user.uid}`).once('value', snapshot => {
            const staffs = snapshot.val()
            Object.keys(staffs).forEach(item => {
              firebase.database().ref(`staffs/${state.user.uid}`).child(item).child('services').child(key).remove()
            })
          })
          resolve()
        })
    })
  },
  removeStaff: ({ commit, state }, key) => {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`staffs/${state.user.uid}`).child(key).remove()
        .then(() => {
          commit('removeStaff', key)
          resolve()
        })
    })
  },
  updateStaffAssign: ({ commit, state }, value) => {
    firebase.database().ref(`staffs/${state.user.uid}`).child(value.key).child('services').remove()
      .then(() => {
        value.services.forEach(service => {
          firebase.database().ref(`staffs/${state.user.uid}`).child(value.key).child('services').child(service.value).set(true)
        })
        commit('updateStaffAssign', value)
      })
  }
}
