<template>
  <div v-if="false">test</div>
</template>

<script>
/* eslint-disable */
import moment from 'moment'
import gql from 'graphql-tag'
import store from './store/index'
import {
  orderAddedSubscription,
  orderUpdatedSubscription,
  orderDeletedSubscription,
  orderTemplateUpdatedSubscription,
  orderTemplateDeletedSubscription
} from './gql/orders'
import { queryFilterLess, queryDatesFilter } from './gql/queryForVuex'
import {
  driverUpdatedSubscription,
  driverDeletedSubscription
} from './gql/drivers'
import {
  carsForVuexQuery,
  updatedCarWorkScheduleSubscription,
  deletedCarWorkScheduleSubscription,
  carUpdatedSubscription,
  carUnitUpdatedSubscription,
  carUnitDeletedSubscription
} from './gql/cars'

import {
  deletedScheduleSubscription,
  scheduleUpdatedSubscription,
  deletedUserRolesSubscription
} from '@/gql/users'
import { mapGetters } from 'vuex'

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

const updatedUserRolesSubscription = gql`
  subscription updatedUserRoles {
    updatedUserRoles {
      id
      userId
      role
      isActive
      user {
        id
        name
        email
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
  apollo: {
    $subscribe: {
      orderTemplateDeleted: {
        query: orderTemplateDeletedSubscription,
        result({ data: { orderTemplateDeleted } }) {
          store.commit('orderTemplateDeleted', orderTemplateDeleted)
        }
      },
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
      driverUpdated: {
        query: driverUpdatedSubscription,
        result({ data: { driverUpdated } }) {
          store.commit('driverUpdated', driverUpdated)
        }
      },
      driverDeleted: {
        query: driverDeletedSubscription,
        result({ data: { driverDeleted } }) {
          store.commit('driverDeleted', driverDeleted.id)
        }
      },
      orderAdded: {
        query: orderAddedSubscription,
        result({ data: { orderAdded } }) {
          store.commit('addOrder', orderAdded)
        }
      },
      orderDeleted: {
        query: orderDeletedSubscription,
        result({ data: { orderDeleted } }) {
          store.commit('orderDeleted', orderDeleted)
        }
      },
      orderUpdated: {
        query: orderUpdatedSubscription,
        result({ data: { orderUpdated } }) {
          console.log(orderUpdated)
          store.commit('updateOrder', orderUpdated)
        }
      },
      deletedSchedule: {
        query: deletedScheduleSubscription,
        result({ data: { deletedSchedule } }) {
          store.commit('deletedSchedule', deletedSchedule)
        }
      },
      scheduleUpdated: {
        query: scheduleUpdatedSubscription,
        result({ data: { scheduleUpdated } }) {
          store.commit('scheduleUpdated', scheduleUpdated)
        }
      },
      deletedUserRoles: {
        query: deletedUserRolesSubscription,
        result({ data: { deletedUserRoles } }) {
          store.commit('deleteUserRoles', deletedUserRoles)
        }
      },
      updatedUserRoles: {
        query: updatedUserRolesSubscription,
        result({ data: { updatedUserRoles } }) {
          store.commit('updateUserRoles', updatedUserRoles)
        }
      },
      orderTemplateUpdated: {
        query: orderTemplateUpdatedSubscription,
        result({ data: { orderTemplateUpdated } }) {
          store.commit('updateOrderTemplate', orderTemplateUpdated)
        }
      },
      updatedCarWorkSchedule: {
        query: updatedCarWorkScheduleSubscription,
        result({ data: { updatedCarWorkSchedule } }) {
          store.commit('updateCarWorkSchedule', updatedCarWorkSchedule)
        }
      },
      deletedCarWorkSchedule: {
        query: deletedCarWorkScheduleSubscription,
        result({ data: { deletedCarWorkSchedule } }) {
          store.commit('deletedCarWorkSchedule', deletedCarWorkSchedule)
        }
      },
      carUpdated: {
        query: carUpdatedSubscription,
        result({ data: { carUpdated } }) {
          store.commit('carUpdated', carUpdated)
        }
      },
      carUnitUpdated: {
        query: carUnitUpdatedSubscription,
        result({ data: { carUnitUpdated } }) {
          store.commit('carUnitUpdated', carUnitUpdated)
        }
      },
      carUnitDeleted: {
        query: carUnitDeletedSubscription,
        result({ data: { carUnitDeleted } }) {
          store.commit('carUnitDeleted', carUnitDeleted)
        }
      }
    },
    queryDatesFilter: {
      query: queryDatesFilter,
      variables: () => store.getters.dateRange,
      fetchPolicy: 'no-cache',
      error(error) {
        store.dispatch('setError', error.message)
      },
      update: ({
        carWorkScheduleForVuex,
        ordersForVuex,
        scheduleForVuex,
        carUnitForVuex
      }) => {
        store.commit('setCarWorkSchedule', carWorkScheduleForVuex)
        store.commit('setOrders', ordersForVuex)
        store.commit('setSchedule', scheduleForVuex)
        store.commit('setCarUnits', carUnitForVuex)
      },
      throttle: 1500,
      skip() {
        return !store.getters.currentDate
      }
    },
    queryFilterLess: {
      query: queryFilterLess,
      fetchPolicy: 'no-cache',
      error(error) {
        store.dispatch('setError', error.message)
      },
      update: ({
        driversForVuex,
        carsForVuex,
        addressesForVuex,
        userRoles,
        orderTemplates
      }) => {
        store.commit('setDrivers', driversForVuex)
        store.commit('setCars', carsForVuex)
        store.commit('setAddresses', addressesForVuex)
        store.commit('setUserRoles', userRoles)
        store.commit('setOrderTemplates', orderTemplates)
      }
    }
  }
}
</script>

<style></style>
