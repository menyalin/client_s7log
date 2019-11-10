<template>
  <div>
    <v-autocomplete
      :loading="$apollo.loading"
      :search-input.sync="filter"
      @change="onChangeHandler"
      :value="propValue"
      hide-no-data
      clearable
      hide-selected
      :items="items"
      color="primary"
      :label="label"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag'
const filteredAddressesQuery = gql`
  query filteredAddresses($filter: String, $type: String, $id: ID) {
    filteredAddresses(filter: $filter, type: $type, id: $id) {
      id
      shortName
      address
      partner
    }
  }
`
const addressByIdQuery = gql`
  query addressById($id: String) {
    addressById(id: $id) {
      id
      shortName
      address
      partner
    }
  }
`
function addressTransform(item) {
  return {
    text: `${item.shortName} - ${item.partner} - ${item.address}`,
    value: item.id
  }
}

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
    filter: ''
  }),
  computed: {
    items() {
      return this.filteredAddresses.map(addressTransform)
    }
  },
  watch: {
    filter(val, prev) {
      if (!val && prev && this.propValue) {
        this.$emit('change', null)
      }
    }
  },
  apollo: {
    filteredAddresses: {
      query() {
        if (this.propValue) return addressByIdQuery
        else return filteredAddressesQuery
      },
      variables() {
        return {
          id: this.propValue,
          filter: this.filter,
          type: this.placeType
        }
      },
      update: data => {
        if (data.addressById) {
          let arr = []
          arr.push(data.addressById)
          return arr
        } else return data.filteredAddresses
      },
      skip() {
        return !this.filter && !this.propValue
      }
    }
  }
}
</script>

<style></style>
