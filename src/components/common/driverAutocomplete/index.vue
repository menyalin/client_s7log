<template>
  <div>
    <v-autocomplete
      @change="onChangeHandler"
      :value="propValue"
      :clearable="!readonly"
      :disabled="disabled"
      hide-details
      :readonly="readonly"
      @click:clear="resetHandler"
      :items="itemsForSelect"
      color="primary"
      :label="label"
      :search-input.sync="search"
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
      if (this.driverList) return this.driverList.map(driverTransform)
      else return this.$store.getters.drivers.map(driverTransform)
    }
  },
  data: () => ({
    search: ''
  }),
  watch: {
    propValue(val) {
      if (!val) {
        this.search = ''
      }
    }
  },
  methods: {
    resetHandler() {
      this.$emit('change', null)
    },
    onChangeHandler(val) {
      this.$emit('change', val)
    }
  },
  // props: ['label', 'propValue', 'types', 'noType']
  props: {
    label: String,
    propValue: String,
    disabled: Boolean,
    driverList: Array, // Список водителей, если нужны не все записи из VUEX
    readonly: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
