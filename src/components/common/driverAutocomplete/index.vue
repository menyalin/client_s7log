<template>
  <div>
    <v-autocomplete
      @change="onChangeHandler"
      :value="propValue"
      clearable
      :disabled="disabled"
      class="pa-0"
      hide-details
      @click:clear="resetHandler"
      :items="itemsForSelect"
      color="primary"
      :label="label"
    />
  </div>
</template>

<script>
function driverTransform(item) {
  return {
    text: item.shortName,
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
      return this.$store.getters.drivers.map(driverTransform)
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
  // props: ['label', 'propValue', 'types', 'noType']
  props: {
    label: String,
    propValue: String,
    disabled: Boolean
  }
}
</script>

<style></style>
