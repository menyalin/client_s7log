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
const filteredCarsQuery = gql`
  query filteredCars($filter: String) {
    filteredCars(filter: $filter) {
      id
      isOwned
      title
      type
      maxPltCount
    }
  }
`
const carByIdQuery = gql`
  query carById($id: ID) {
    carById(id: $id) {
      id
      isOwned
      title
      type
      maxPltCount
    }
  }
`
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
  methods: {
    onChangeHandler(val) {
      this.$emit('change', val)
    }
  },
  props: ['label', 'propValue'],
  data: () => ({
    filteredCars: [],
    filter: ''
  }),
  computed: {
    items() {
      return this.filteredCars.map(carTransform)
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
    filteredCars: {
      query() {
        if (this.propValue) return carByIdQuery
        else return filteredCarsQuery
      },
      variables() {
        return {
          id: this.propValue,
          filter: this.filter
        }
      },
      update: data => {
        if (data.carById) {
          let arr = []
          arr.push(data.carById)
          return arr
        } else return data.filteredCars
      },
      skip() {
        return !this.filter && !this.propValue
      }
    }
  }
}
</script>

<style></style>
