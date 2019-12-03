<template>
  <div v-if="false">test</div>
</template>

<script>
/* eslint-disable */
import gql from 'graphql-tag'
import store from './store/index'

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
const addressAddedSubscription = gql`
  subscription addressAdded {
    addressAdded {
      id
      shortName
      partner
      address
      note
      isActive
      isShippingPlace
      isDeliveryPlace
    }
  }
`
const addressUpdatedSubscription = gql`
  subscription addressUpdated {
    addressUpdated {
      id
      shortName
      partner
      address
      note
      isActive
      isShippingPlace
      isDeliveryPlace
    }
  }
`
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
const orderAddedSubscription = gql`
  subscription orderAdded {
    orderAdded {
      id
      number
      carType
      status
      shipperId
      consigneeId
      note
      confirmDate
      confirmTime
      managerId
      shippingDate
      shippingTime
      deliveryDate
      deliveryTime
      isDriverNotified
      isClientNotified
      confirmedCarId
    }
  }
`
const orderUpdatedSubscription = gql`
  subscription orderUpdated {
    orderUpdated {
      id
      number
      carType
      status
      shipperId
      consigneeId
      note
      confirmDate
      confirmTime
      managerId
      shippingDate
      shippingTime
      deliveryDate
      deliveryTime
      isDriverNotified
      isClientNotified
      confirmedCarId
    }
  }
`
const carsForVuexQuery = gql`
  query allCars {
    carsForVuex {
      id
      title
      reg
      pts
      isOwned
      type
      maxPltCount
      note
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
    $subscribe: {
      addressAdded: {
        query: addressAddedSubscription,
        result({ data: { addressAdded } }) {
          store.commit('addAddress', addressAdded)
        }
      },
      addressUpdated: {
        query: addressUpdatedSubscription,
        result({ data: { addressUpdated } }) {
          store.commit('updateAddress', addressUpdated)
        }
      },
      orderAdded: {
        query: orderAddedSubscription,
        result({ data: { orderAdded } }) {
          store.commit('addOrder', orderAdded)
        }
      },
      orderUpdated: {
        query: orderUpdatedSubscription,
        result({ data: { orderUpdated } }) {
          store.commit('updateOrder', orderUpdated)
        }
      }
    },
    carsForVuex: {
      query: carsForVuexQuery,
      fetchPolicy: 'no-cache',
      error(error) {
        store.commit('setError', error.message)
      },
      update: ({ carsForVuex }) => {
        store.commit('setCars', carsForVuex)
      }
    },
    ordersForVuex: {
      query: ordersForVuexQuery,
      variables: {
        startDate: '2019-10-01',
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
