<template>
  <v-app>
    <template v-if="loadingApp">
      <AppSpinner />
    </template>
    <template v-else>
      <v-navigation-drawer app temporary fixed v-model="drawer">
        <v-card class="mx-auto" max-width="300" tile>
          <v-list class="mt-3">
            <v-list-item-group color="primary">
              <v-list-item ripple v-for="item in itemsForRender" :key="item.id">
                <v-list-item-icon>
                  <v-icon v-text="item.icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title" />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-navigation-drawer>
      <v-app-bar app color="primary" dark dense>
        <v-app-bar-nav-icon @click="toggleDrawer" class="hidden-md-and-up" />
        <v-toolbar-title class="hidden-sm-and-down">
          <router-link to="/" tag="span" class="main__title">Vue Share</router-link>
        </v-toolbar-title>
        <v-spacer />
        <v-text-field
          dark
          prepend-icon="mdi-magnify"
          single-line
          hide-details
          placeholder="Search post"
        />
        <v-spacer />
        <v-toolbar-items class="hidden-xs-only">
          <v-btn v-for="item in itemsForRender" text :key="item.id" :to="item.url">
            <v-icon left class="hidden-sm-only">{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
      <v-content>
        <v-container fluid>
          <transition name="fade">
            <router-view />
          </transition>
        </v-container>
      </v-content>
      <v-footer app></v-footer>
    </template>
    <template v-if="error">
      <ErrorSnackbar />
    </template>
  </v-app>
</template>
<script>
import ErrorSnackbar from './components/common/ErrorSnackbar'
import { mapGetters } from 'vuex'
import AppSpinner from './components/common/AppSpinner'

export default {
  name: 'App',
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  },
  components: {
    AppSpinner,
    ErrorSnackbar
  },
  computed: {
    ...mapGetters(['user', 'isLoggedIn', 'loadingApp', 'error']),
    itemsForRender() {
      let visibleItems = []
      if (this.isLoggedIn) {
        visibleItems = [1, 2, 5, 6]
      } else {
        visibleItems = [3, 4]
      }
      return this.items.filter(item => visibleItems.indexOf(item.id) !== -1)
    }
  },
  data: () => ({
    drawer: false,
    items: [
      { id: 6, title: 'Orders', icon: 'mdi-dump-truck', url: '/orders' },
      { id: 1, title: 'Company', icon: 'mdi-domain', url: '/company' },
      { id: 2, title: 'Profile', icon: 'mdi-account-details', url: '/profile' },
      { id: 3, title: 'Sign In', icon: 'mdi-account', url: '/signin' },
      { id: 4, title: 'Sign Up', icon: 'mdi-account-plus', url: '/signup' },
      { id: 5, title: 'Sign Out', icon: 'mdi-logout', url: '/signOut' },
      { id: 7, title: 'Admin', icon: 'mdi-alien', url: '/admin' }
    ]
  })
}
</script>

<style>
.main__title {
  cursor: pointer;
  font-size: 1.2em;
  color: darkgray;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.3s;
}

.fade-enter-active {
  transition-delay: 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
