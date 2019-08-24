<template>
  <div>
    <h3>home page</h3>
    <v-btn @click="testHandler"> кнопка</v-btn>
  </div>

</template>

<script>
export default {
  methods: {
    testHandler () {
      this.$store.commit('setError', 'Ошибка')
    }
  }
}
</script>
