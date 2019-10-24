<template>
  <div>
    <v-autocomplete
      :label="label"
      :items="clock"
      auto-select-first
      color="primary"
      :value="propTime"
      @change="inputHandler"
      append-icon="mdi-clock"
      class="pt-0 mt-0"
    />
  </div>
</template>
<script>
export default {
  methods: {
    inputHandler(str) {
      this.$emit('change', str)
    }
  },
  data: () => ({}),
  model: {
    prop: 'propTime',
    event: 'change'
  },
  computed: {
    clock() {
      let arr = []
      for (let i = 0; i < 24; i++) {
        if (i < 10) {
          arr.push(`0${i}:00`)
          arr.push(`0${i}:30`)
        } else {
          arr.push(`${i}:00`)
          arr.push(`${i}:30`)
        }
      }
      return arr
    }
  },
  props: ['label', 'propTime']
}
</script>
