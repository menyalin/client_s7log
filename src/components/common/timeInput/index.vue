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
    isInvalidTime(val) {
      let tmpArr = val.split(':')
      return (
        tmpArr.length !== 2 ||
        val.length !== 5 ||
        +tmpArr[0] > 23 ||
        +tmpArr[1] > 59
      )
    },
    onInput(e) {
      if (!this.isInvalidTime(e)) {
        // this.$emit('change', e)
      }
    },
    onChange(e) {
      let tmpArr = e.split(':')
      if (this.isInvalidTime(e)) {
        this.$emit('change', '00:00')
      } else this.$emit('change', e)
    }
  }
}
</script>

<style></style>
