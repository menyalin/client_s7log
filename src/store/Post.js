import { apolloClient } from '../vue-apollo'
import { GET_POSTS } from './queries'

export default {
  state: {
    posts: null
  },
  mutations: {
    setPosts: (state, posts) => {
      state.posts = posts
    }

  },
  actions: {
    getPosts: async ({ commit }) => {
      commit('setLoading', true)
      const { data } = await apolloClient.query({
        query: GET_POSTS
      })
      commit('setLoading', false)
      commit('setPosts', data.getPosts)
    }
  },
  getters: {
    posts (state) {
      return state.posts
    }
  }
}
