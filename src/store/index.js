import Vue from 'vue'
import Vuex from 'vuex'

// store mutations and actions
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import business from './modules/business'

// import moment from 'moment'
import { uniqid } from '../helpers/handyFuncs'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    user: null,
    staffs: [],
    services: [],
    'opening_hours': [{
      'id': uniqid(),
      'dow': [1, 2, 3, 4, 5], // Monday, Tuesday, Wednesday
      'start': { label: '8:00', value: 28800000 }, // 8am
      'end': { label: '16:00', value: 57600000 } // 8am
    }]
  },
  modules: {
    business
  },
  getters,
  mutations,
  actions
})

export default store
