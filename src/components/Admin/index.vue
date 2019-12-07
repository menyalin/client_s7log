<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <user-management />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userManagement from './userManagement'
export default {
  name: 'Admin',
  components: {
    userManagement
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.getters.isAdmin) {
        vm.$router.push('/signin')
      }
    })
  }
}
</script>

<style scoped></style>
