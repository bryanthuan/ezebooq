import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import jQuery from 'jquery'
import Firebase from './firebase'
import moment from 'moment'
window.$ = window.jQuery = jQuery
window.moment = moment

import router from './router'
import { sync } from 'vuex-router-sync'
import App from './App'

Vue.use(Vuex)
import store from './store'

sync(store, router)
Firebase.initFirebase()

Vue.use(Vuetify)
const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

global._App = app
