<template>
  <v-container v-if="isLoggedIn">
    <v-row wrap>
      <v-col cols="4">
        <app-personal-info />
        <app-user-phones />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import appUserPhones from './userPhones'
import appPersonalInfo from './personalInfo'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  components: {
    appUserPhones,
    appPersonalInfo
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
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
