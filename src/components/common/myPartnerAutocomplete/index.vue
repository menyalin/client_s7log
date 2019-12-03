<template>
  <div>
    <v-autocomplete
      @change="onChangeHandler"
      :value="propValue"
      hide-no-data
      clearable
      @click:clear="resetHandler"
      hide-selected
      :items="itemsForSelect"
      color="primary"
      :label="label"
    />
  </div>
</template>

<script>
function addressTransform(item) {
  return {
    text: `${item.shortName} - ${item.partner} - ${item.address ||
      'адрес не указан'}`,
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
        .addressesForAutocomplete(this.placeType)
        .map(addressTransform)
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
  props: ['label', 'propValue', 'placeType']
}
</script>
