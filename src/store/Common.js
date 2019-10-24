export default {
  state: {
    loading: false,
    loadingApp: false,
    error: null,
    phoneTypes: ['Личный', 'Рабочий']
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setLoadingApp(state, payload) {
      state.loadingApp = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {},
  getters: {
    loading: state => state.loading,
    loadingApp: state => state.loadingApp,
    error: state => state.error,
    phoneTypes: state => state.phoneTypes
  }
}
