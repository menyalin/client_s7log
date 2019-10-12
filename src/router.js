import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/home'
import Profile from './components/Auth/Profile/index.vue'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import SignOut from './components/Auth/SignOut'
import Admin from './components/Admin'
import Company from './components/Company'
import CompanyInfo from './components/Company/companyInfo'
Vue.use( Router )

export default new Router( {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signOut',
      name: 'SignOut',
      component: SignOut
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/company',
      name: 'Company',
      component: Company
    },
    {
      path: '/company/:id',
      name: 'CompanyInfo',
      component: CompanyInfo
    }
  ]
} )
