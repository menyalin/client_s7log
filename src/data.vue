<template>
  <div v-if="false">test</div>
</template>

<script>
/* eslint-disable */
import moment from 'moment'
import gql from 'graphql-tag'
import store from './store/index'

import { mapGetters } from 'vuex'

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
const staffQuery = gql`
  query staff {
    staff {
      userId
      role
      user {
        name
        email
      }
    }
  }
`
const scheduleForVuexQuery = gql`
  query scheduleForVuex($startDate: String, $endDate: String) {
    scheduleForVuex(startDate: $startDate, endDate: $endDate) {
      id
      type
      date
      user {
        id
        name
      }
    }
  }
`
const scheduleUpdatedSubscription = gql`
  subscription scheduleUpdated {
    scheduleUpdated {
      id
      type
      date
      user {
        id
        name
      }
    }
  }
`

export default {
  name: 'dataComponent',
  computed: {
    ...mapGetters(['dateRange'])
  },
  created() {
    this.$store.commit('setCurrentDate', moment().format('YYYY-MM-DD'))
  },
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
      },
      scheduleUpdatedSubscription: {
        query: scheduleUpdatedSubscription,
        result({ data: { scheduleUpdated } }) {
          store.commit('scheduleUpdated', scheduleUpdated)
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
      variables: () => store.getters.dateRange,
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
    },
    staff: {
      query: staffQuery,
      fetchPolicy: 'no-cache',
      update: ({ staff }) => {
        store.commit('setStaff', staff)
      }
    },
    scheduleForVuex: {
      query: scheduleForVuexQuery,
      variables: () => store.getters.dateRange,
      fetchPolicy: 'no-cache',
      error(error) {
        store.commit('setError', error.message)
      },
      update: ({ scheduleForVuex }) => {
        store.commit('setSchedule', scheduleForVuex)
      }
    }
  }
}
</script>

<style></style>
