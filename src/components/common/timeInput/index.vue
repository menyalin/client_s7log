<template>
  <div>
    <v-text-field
      hide-details
      :value="time"
      :disabled="disabled"
      v-mask="'##:##'"
      @input="onInput($event)"
      @change="onChange($event)"
    />
  </div>
</template>

<script>
export default {
  name: 'timeComponent',
  data: () => ({}),
  model: {
    prop: 'time',
    event: 'change'
  },
  props: ['time', 'disabled'],
  methods: {
    onInput(e) {
      if (e.length == 5) {
        this.$emit('change', e)
      }
    },
    onChange(e) {
      let tmpArr = e.split(':')
      if (e.length !== 5 || +tmpArr[0] > 23 || +tmpArr[1] > 59) {
        this.$emit('change', '00:00')
      }
    }
  }
}
</script>

<style></style>
