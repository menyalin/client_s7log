<template>
  <div>
    <v-autocomplete :loading="$apollo.loading" :search-input.sync="search" hide-no-data />
    <p>{{ filteredAddresses }}</p>
  </div>
</template>

<script>
import gql from 'graphql-tag'
const query = gql`
  query filteredAddresses($filter: String) {
    filteredAddresses(filter: $filter) {
      _id
      shortName
      address
      partner
    }
  }
`
export default {
  data: () => ({
    filteredAddresses: [],
    filter: '',
    search: null
  }),
  watch: {
    search: function(val) {
      this.filter = val
      console.log(this.filter)
    }
  },
  apollo: {
    filteredAddresses: {
      query,
      variables() {
        return {
          filter: this.filter
        }
      },
      skip() {
        return this.filter.length < 2
      }
    }
  }
}
</script>
