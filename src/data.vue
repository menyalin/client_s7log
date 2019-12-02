<template>
  <div v-if="false">test</div>
</template>

<script>
/* eslint-disable */
import gql from 'graphql-tag'
import store from './store/index'

const ordersForVuexQuery = gql`
  query ordersForVuex($startDate: String, $endDate: String) {
    ordersForVuex(startDate: $startDate, endDate: $endDate) {
      id
      carType
      number
      status
      confirmDate
      shipperId
      consigneeId
      confirmedCarId
      managerId
      note
      confirmDate
      confirmTime
      shippingDate
      shippingTime
      deliveryDate
      deliveryTime
      isDriverNotified
      isClientNotified
    }
  }
`
const addressesForVuexQuery = gql`
  query addressesForVuex {
    addressesForVuex {
      id
      partner
      address
      shortName
      note
      isShippingPlace
      isDeliveryPlace
      isActive
    }
  }
`

export default {
  name: 'dataComponent',
  data: () => ({
    ordersForVuex: [],
    addressesForVuex: []
  }),
  apollo: {
    ordersForVuex: {
      query: ordersForVuexQuery,
      variables: {
        startDate: '2019-11-30',
        endDate: '2019-12-31'
      },
      fetchPolicy: 'no-cache',
      error(error) {
        store.commit('setError', error.message)
      },
      update: ({ ordersForVuex }) => {
        store.commit('setOrders', ordersForVuex)
      }
    },
    addressesForVuex: {
      query: addressesForVuexQuery,
      fetchPolicy: 'no-cache',
      error(error) {
        store.commit('setError', error.message)
      },
      update: ({ addressesForVuex }) => {
        store.commit('setAddresses', addressesForVuex)
      }
    }
  }
}
</script>

<style></style>
