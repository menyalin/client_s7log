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
      :search-input.sync="search"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  model: {
    prop: 'propValue',
    event: 'change'
  },
  computed: {
    ...mapGetters(['allVehicleTypes']),
    itemsForSelect() {
      if (this.carList)
        return this.carList
          .filter(item => this.types.indexOf(item.type) !== -1)
          .map(this.carTransform)
      else
        return this.$store.getters
          .carsForAutocomplete_v2(this.types)
          .map(this.carTransform)
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
    carTransform(item) {
      let typeText = this.allVehicleTypes.find(i => item.type === i.value).text
      return {
        text: `${item.title} (${typeText})`,
        value: item.id
      }
    },
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
