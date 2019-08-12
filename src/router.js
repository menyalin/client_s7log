import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/home'
import Profile from './components/Auth/Profile'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import SignOut from './components/Auth/SignOut'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
