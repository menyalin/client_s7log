import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client'

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
const AUTH_TOKEN = 'token'

// Http endpoint
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:3000/graphql'

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  wsEndpoint: null,
  // wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:3000/graphql',
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  // link: myLink

  // Override the way the Authorization header is set
  // getAuth: (tokenName) => ...

}
// eslint-disable-next-line
const { apolloClient, wsClient } = createApolloClient({
  ...defaultOptions
})
// apolloClient.wsClient = wsClient

function createProvider () {
  // Create apollo client

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      }
    }
  })
  return apolloProvider
}

// Manually call this when user log in
async function onLogin (apolloClient, token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  }
}

// Manually call this when user log out
async function onLogout (apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(AUTH_TOKEN, '')
  }
  if (apolloClient.wsClient) {
    restartWebsockets(apolloClient.wsClient)
  }
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  }
}
export {
  onLogin,
  onLogout,
  createProvider,
  apolloClient
}
