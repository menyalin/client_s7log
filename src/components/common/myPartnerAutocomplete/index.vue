<template>
  <div>
    <v-autocomplete
      :loading="$apollo.loading"
      :search-input.sync="filter"
      @change="onChangeHandler"
      :value="propValue"
      hide-no-data
      hide-selected
      :items="items"
      color="primary"
      :label="label"
      return-object
    />
  </div>
</template>

<script>
import gql from 'graphql-tag'
const query = gql`
  query filteredAddresses($filter: String, $type: String) {
    filteredAddresses(filter: $filter, type: $type) {
      id
      shortName
      address
      partner
    }
  }
`

export default {
  model: {
    prop: 'propValue',
    event: 'change'
  },
  methods: {
    onChangeHandler(val) {
      this.$emit('change', val)
    }
  },
  props: ['label', 'propValue', 'placeType'],
  data: () => ({
    filteredAddresses: [],
    filter: '',
    model: null
  }),
  computed: {
    items() {
      return this.filteredAddresses.map(item => ({
        text: `${item.shortName} - ${item.partner} - ${item.address}`,
        value: item.id
      }))
    }
  },
  // watch: {
  //   filter: function(val) {
  //     this.filter = val
  //   }
  // },
  apollo: {
    filteredAddresses: {
      query,
      variables() {
        return {
          filter: this.filter,
          type: this.placeType
        }
      },
      skip() {
        return !this.filter
      }
    }
  }
}
</script>

<style></style>
