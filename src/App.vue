<template>
  <v-app>
    <template v-if="loadingApp">
      <AppSpinner class="mt-6" />
    </template>
    <template v-else>
      <v-navigation-drawer app temporary fixed v-model="drawer">
        <v-card class="mx-auto" max-width="300" tile>
          <v-list class="mt-3">
            <v-list-item-group color="primary">
              <v-list-item
                ripple
                v-for="item in itemsForRender"
                :key="item.id"
                :to="item.url"
              >
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
          <router-link to="/" tag="span" class="main__title"
            >Vue Share</router-link
          >
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
            v-for="item in itemsForRender"
            text
            :key="item.id"
            :to="item.url"
          >
            <v-icon left class="hidden-sm-only">{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
      <v-content>
        <v-container fluid>
          <transition name="scale">
            <router-view />
          </transition>
        </v-container>
        <app-data />
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
import appData from './data'

export default {
  name: 'App',
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  },
  components: {
    AppSpinner,
    ErrorSnackbar,
    appData
  },
  computed: {
    ...mapGetters(['user', 'isLoggedIn', 'loadingApp', 'error', 'isAdmin']),
    itemsForRender() {
      let visibleItems = []
      if (this.isLoggedIn) {
        visibleItems = [5, 6, 8, 9, 10]
        if (this.isAdmin) visibleItems.push(7)
      } else {
        visibleItems = [3, 4, 6, 8]
      }
      return this.items.filter(item => visibleItems.indexOf(item.id) !== -1)
    }
  },
  data: () => ({
    drawer: false,
    items: [
      { id: 10, title: 'Заказы', icon: 'mdi-view-list', url: '/orders/list' },
      { id: 9, title: 'НСИ', icon: 'mdi-book-open-page-variant', url: '/nsi' },
      { id: 6, title: '10_tn', icon: 'mdi-dump-truck', url: '/orders/10tn' },
      { id: 8, title: '20_tn', icon: 'mdi-dump-truck', url: '/orders/20tn' },
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
