<template>
  <div>
    <v-autocomplete
      @change="onChangeHandler"
      :value="propValue"
      :clearable="!readonly && clearable"
      hide-details
      :disabled="disabled"
      @click:clear="resetHandler"
      :items="itemsForSelect"
      color="primary"
      :label="label"
      :readonly="readonly"
    />
  </div>
</template>

<script>
function carTransform(item) {
  return {
    text: `${item.title} (${item.type})`,
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
      if (this.carList)
        return this.carList
          .filter(item => this.types.indexOf(item.type) !== -1)
          .map(carTransform)
      else
        return this.$store.getters
          .carsForAutocomplete_v2(this.types)
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
  props: {
    label: String,
    types: {
      type: Array,
      required: true
    },
    propValue: String,
    disabled: Boolean,
    carList: Array,
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style></style>
