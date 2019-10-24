<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" color="warning">
    {{ error || 'Неизвестная ошибка' }}
    <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    snackbar: true,
    timeout: 3000
  }),
  computed: {
    ...mapGetters(['error'])
  }
}
</script>

<style></style>
