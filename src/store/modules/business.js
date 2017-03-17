import firebase from 'firebase'
export default {
  state: {
    category: {},
    subcategory: {},
    name: '',
    address: '',
    city: '',
    country: '',
    postcode: '',
    phone: ''
  },
  mutations: {
    // Update Business Name
    updateBusinessName: (state, value) => {
      state.name = value
    },
    // Update Business Name
    updateBusinessCity: (state, value) => {
      state.city = value
    },
    // Update Business Name
    updateBusinessAddress: (state, value) => {
      state.address = value
    },
    // Update Business Name
    updateBusinessCountry: (state, value) => {
      state.country = value
    },
    // this commited when user click to choose one category
    updateBusinessCat: (state, value) => {
      state.category = value.category
      state.subcategory = value.subcategory
    },
    // update all business info in one place
    updateBusinessInfo: (state, val) => {
      state.name = val.name
      state.country = val.country
      state.city = val.city
      state.address = val.address
      state.category = val.category
      state.subcategory = val.subcategory
    }
  },
  actions: {
    updateBusinessName ({ commit, rootState }, value) {
      const bizPath = `businesses/${rootState.user.uid}`
      firebase.database().ref(bizPath).child('name').set(value)
      commit('updateBusinessName', value)
    },
    updateBusinessInfo ({commit}, val) {
      commit('updateBusinessInfo', val)
    },
    updateBusinessCat ({commit, rootState}, val) {
      firebase.database().ref(`businesses/${rootState.user.uid}`).child('category').set(val.category)
      firebase.database().ref(`businesses/${rootState.user.uid}`).child('subcategory').set(val.subcategory)
      commit('updateBusinessCat', val)
    }
  }
}
