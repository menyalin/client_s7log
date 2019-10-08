<template>
  <v-container>
    <v-row>
      <v-col>
        <app-personal-info />
        <app-user-phones />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import appUserPhones from './userPhones'
import appPersonalInfo from './personalInfo'

export default {
  name: 'Profile',

  components: {
    appUserPhones,
    appPersonalInfo
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.getters.isLoggedIn) {
        vm.$router.push('/signin')
      }
    })
  }
}
</script>

<style>
</style>
