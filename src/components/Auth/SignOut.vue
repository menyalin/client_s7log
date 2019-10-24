<template>
  <h4>sign out</h4>
</template>

<script>
// import AppSpinner from '../common/AppSpinner'
export default {
  components: {
    // AppSpinner
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('signOut')
    })
  }
}
</script>

<style></style>
