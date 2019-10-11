import { apolloClient, onLogin, onLogout } from '../vue-apollo'
import { SIGN_IN, SIGN_UP, GET_CURRENT_USER } from './authQueries'
import router from '../router'

export default {
  state: {
    user: null

  },
  mutations: {
    setCurrentUser ( state, payload )
    {
      state.user = payload
    }
  },
  actions: {
    async signOut ( { commit } )
    {
      commit( 'setLoadingApp', true )
      commit( 'setCurrentUser', null )
      await onLogout( apolloClient )
      router.push( '/' )
      commit( 'setLoadingApp', false )
    },
    getCurrentUser ( { commit } )
    {
      commit( 'clearError' )
      commit( 'setLoadingApp', true )
      apolloClient.query( {
        query: GET_CURRENT_USER
      } ).then( ( { data: { getCurrentUser } } ) =>
      {
        commit( 'setCurrentUser', getCurrentUser )
        commit( 'setLoadingApp', false )
      } )
        .catch( async ( err ) =>
        {
          commit( 'setLoadingApp', false )
          if ( err.message === 'GraphQL error: foul_token' )
          {
            commit( 'setCurrentUser', null )
            localStorage.setItem( 'token', '' )
            router.push( '/signin' )
          } else
          {
            commit( 'setError', err )
            console.log( err.message )
          }
        } )
    },
    signIn ( { commit, dispatch }, payload )
    {
      localStorage.setItem( 'token', '' )
      commit( 'clearError' )
      commit( 'setLoading', true )
      apolloClient.mutate( {
        mutation: SIGN_IN,
        variables: payload
      } )
        .then( async ( { data } ) =>
        {
          commit( 'setLoading', false )
          await onLogin( apolloClient, data.signinUser.token )
          dispatch( 'getCurrentUser' )
          router.push( '/' )
        } )
        .catch( err =>
        {
          commit( 'setLoading', false )
          commit( 'setError', err )
        } )
    },
    signUp ( { commit, dispatch }, payload )
    {
      localStorage.setItem( 'token', '' )
      commit( 'clearError' )
      commit( 'setLoading', true )
      apolloClient.mutate( {
        mutation: SIGN_UP,
        variables: payload
      } )
        .then( async ( { data } ) =>
        {
          commit( 'setLoading', false )
          await onLogin( apolloClient, data.signupUser.token )
          dispatch( 'getCurrentUser' )
          router.push( '/' )
        } )
        .catch( err =>
        {
          commit( 'setLoading', false )
          commit( 'setError', err )
        } )
    }
  },
  getters: {
    currentUser: state => state.user,
    isLoggedIn: ( state ) => !!state.user

  }
}
