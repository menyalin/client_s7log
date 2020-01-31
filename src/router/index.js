import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from '@/components/home'
import Profile from '@/components/Auth/Profile/index.vue'
import SignIn from '@/components/Auth/SignIn'
import SignUp from '@/components/Auth/SignUp'
import SignOut from '@/components/Auth/SignOut'
import Admin from '@/components/Admin'
import Company from '@/components/Company'
import CompanyInfo from '@/components/Company/companyInfo'
import orderLayout from '@/components/OrderV3/layout.vue'
import orderRoutes from './orderRoutes'
import nsiLayout from '@/components/NSI/index'
import nsiRoutes from './nsi'

Vue.use(Router)

const router = new Router({
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
      component: CompanyInfo
    },
    {
      path: '/orders',
      component: orderLayout,
      children: orderRoutes,
      meta: {
        forActiveUsers: true
      }
    },
    {
      path: '/nsi',
      component: nsiLayout,
      children: nsiRoutes,
      meta: {
        forActiveUsers: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(item => item.meta.forActiveUsers)) {
    if (!!localStorage.getItem('token')) next()
    else next('/')
  } else next()
})


export default router