<template>
  <div>
    <v-autocomplete
      color="primary"
      :label="label"
      :items="items"
      @change="onChange"
      :value="propValue"
    />
  </div>
</template>

<script>
export default {
  model: {
    prop: 'propValue',
    event: 'change'
  },
  methods: {
    onChange(val) {
      this.$emit('change', val)
    }
  },
  props: ['label', 'items', 'item-text', 'item-value', 'propValue'],
  data: () => ({})
}
</script>

<style></style>
