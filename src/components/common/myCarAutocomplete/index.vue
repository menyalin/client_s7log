<template>
  <div>
    <v-autocomplete
      @change="onChangeHandler"
      :value="propValue"
      clearable
      :disabled="!noType && !type"
      @click:clear="resetHandler"
      :items="itemsForSelect"
      color="primary"
      :label="label"
    />
  </div>
</template>

<script>
function carTransform(item) {
  return {
    text: `${item.title} (${item.type} - ${item.maxPltCount || '_'}плт)`,
    value: item.id
  }
}

export default {
  model: {
    prop: 'propValue',
    event: 'change'
  },
  computed: {
    itemsForSelect() {
      return this.$store.getters
        .carsForAutocomplete(this.type)
        .map(carTransform)
    }
  },
  methods: {
    resetHandler() {
      this.$emit('change', '')
    },
    onChangeHandler(val) {
      this.$emit('change', val)
    }
  },
  props: ['label', 'propValue', 'type', 'noType', 'hide-details']
}
</script>

<style></style>
