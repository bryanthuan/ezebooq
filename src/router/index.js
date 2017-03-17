// import firebase from 'firebase'
// import firebaseui from 'firebaseui'
import Vue from 'vue'
import Router from 'vue-router'
import wizardCategory from '@/views/wizard/wizardCategory'
import wizardDetail from '@/views/wizard/wizardDetail'
import Calendar from '@/views/dashboard/calendar'
import Business from '@/views/dashboard/business'
import Dashboard from '@/views/dashboard/dashboard'
import BizDetail from '@/views/dashboard/business_detail'
import Login from '@/views/Login'
// import store from '../store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        // ...
        if (from.name === 'Wizard1' || from.name === 'Wizard2') {
          next(false)
        } else {
          next()
        }
      }
    },
    {
      path: '/',
      component: Business,
      beforeEnter: (to, from, next) => {
        // ...
        if (from.name === 'Wizard1' || from.name === 'Wizard2') {
          next(false)
        } else {
          next()
        }
      },
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'BusinessDashboard',
          component: Dashboard
        },
        {
          path: 'business/detail',
          name: 'BusinessDetail',
          component: BizDetail
        }
        // ,
        // {
        //   path: 'services',
        //   name: 'Services',
        //   component: ''
        // },
        // {
        //   path: 'staffs',
        //   name: 'Staffs',
        //   component: ''
        // },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/wizard/select-category',
      name: 'Wizard1',
      component: wizardCategory,
      meta: { requiresAuth: true }
    },
    {
      path: '/wizard/details',
      name: 'Wizard2',
      // beforeEnter: (to, from, next) => {
      //   console.log(to)
      //   next('/wizard/select-category')
      //   // ...
      // },
      component: wizardDetail,
      meta: { requiresAuth: true }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (!firebase.auth().currentUser) {
//       console.log(firebaseui.auth.storage)
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next() // make sure to always call next()!
//   }
// })

export default router
