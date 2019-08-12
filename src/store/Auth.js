import { apolloClient } from '../vue-apollo'
import { SIGN_IN, GET_CURRENT_USER } from './queries'
import router from '../router'

export default {
  state: {
    user: null
  },
  mutations: {
    setCurrentUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async signOut ({ commit }) {
      commit('setLoadingApp', true)
      commit('setCurrentUser', null)
      localStorage.setItem('token', '')
      router.push('/')
      await apolloClient.resetStore()
      commit('setLoadingApp', false)
    },
    getCurrentUser ({ commit }) {
      commit('clearError')
      if (localStorage.getItem('token')) {
        commit('setLoadingApp', true)
        apolloClient.query({
          query: GET_CURRENT_USER
        }).then(({ data }) => {
          commit('setCurrentUser', data.getCurrentUser)
          commit('setLoadingApp', false)
        })
          .catch((err) => {
            commit('setLoadingApp', false)
            commit('setError', err)
          })
      }
    },
    signIn ({ commit, dispatch }, payload) {
      localStorage.setItem('token', '')
      commit('clearError')
      commit('setLoading', true)
      apolloClient.mutate({
        mutation: SIGN_IN,
        variables: payload
      })
        .then(({ data }) => {
          commit('setLoading', false)
          localStorage.setItem('token', data.signinUser.token)
          dispatch('getCurrentUser')
          router.push('/')
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err.message)
        })
    }
  },
  getters: {
    currentUser: state => state.user,
    isLoggedIn: (state) => !!state.user

  }
}
