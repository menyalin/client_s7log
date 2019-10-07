<template>
  <v-container>
    <h2>Profile</h2>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  computed: {
    ...mapGetters(['error'])
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
