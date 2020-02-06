<template>
  <div сlass="pb-3">
    <v-autocomplete
      @change="onChangeHandler"
      :value="propValue"
      hide-no-data
      :dense="dense"
      clearable
      @click:clear="resetHandler"
      :items="itemsForSelect"
      color="primary"
      :label="label"
      :messages="note"
      :hide-details="hide - details"
    />
  </div>
</template>

<script>
function addressTransform(item) {
  return {
    text: `${item.partner} - ${item.shortName} - ${item.address ||
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
    },
    note() {
      const res =
        this.$store.getters.isAddressesUpload &&
        !!this.propValue &&
        !!this.$store.getters.addressById(this.propValue)
      return res
        ? this.$store.getters.addressById(this.propValue).note || []
        : []
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
  props: ['label', 'propValue', 'placeType', 'dense', 'hide-details']
}
</script>
