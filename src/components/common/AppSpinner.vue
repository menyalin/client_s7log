<template>
  <v-container class="spinner__container align-content-center pa-10">
    <v-layout row wrap>
      <v-flex xs12 class="text-center">
        <v-progress-circular
          :size="90"
          :width="7"
          color="primary"
          indeterminate
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: true
    }
  }
}
</script>

<style scoped>
.spinner__container {
  height: 100vh;
}
</style>
