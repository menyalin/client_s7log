<template>
    <v-container>
        <v-layout row>
            <h3>Admin component</h3>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'Admin',
  created () {
    this.$store.dispatch('getActiveUsers')
  }
}
</script>

<style scoped>

</style>
