import { apolloClient } from '../vue-apollo'
import moment from 'moment'
import store from './index'
import { carUnitQuery } from '../gql/cars'

const dateInRange = (range, dateStr) => {
  try {
    const date = moment(dateStr)
    if (range[1].value) {
      // закрытый диапозон
      const startRange = moment(+range[0].value)
      const endRange = moment(+range[1].value)
      return startRange.isSameOrBefore(date) && date.isSameOrBefore(endRange)
    } else {
      // открытый диапазон
      const startRange = moment(+range[0].value)
      return startRange.isSameOrBefore(date)
    }
  } catch (e) {
    store.dispatch('setError', e)
  }
}

export default {
  state: {
    carUnits: [],
    cars: [],
    carWorkSchedule: [],
    carWorkScheduleTypes: [
      { id: 'service', title: 'Сервис' },
      { id: 'holiday', title: 'Выходной' }
    ],
    vehicleType: [
      { value: '10tn', text: '10тн' },
      { value: '20tn', text: '20тн' },
      { value: 'trailer', text: 'Прицеп' }
    ],
  },
  mutations: {
    setCarUnits: (state, payload) => {
      state.carUnits = payload
    },
    carUnitUpdated: (state, carUnit) => {
      const updatedItem = state.carUnits.find(item => item.id === carUnit.id)
      if (updatedItem) Object.assign(updatedItem, carUnit)
      else state.carUnits.push(carUnit)
    },
    carUnitDeleted: ({ carUnits }, id) => {
      let idx = carUnits.findIndex(item => item.id === id)
      if (idx !== -1) carUnits.splice(idx, 1)
    },
    setCarWorkSchedule: (state, payload) => {
      state.carWorkSchedule = payload
    },
    updateCarWorkSchedule: (state, payload) => {
      const carWorkScheduleItem = state.carWorkSchedule.find(item => item.id === payload.id)
      if (carWorkScheduleItem) Object.assign(carWorkScheduleItem, payload)
      else state.carWorkSchedule.push(payload)
    },
    deletedCarWorkSchedule: ({ carWorkSchedule }, id) => {
      const idx = carWorkSchedule.findIndex(item => item.id === id)
      if (idx !== -1) carWorkSchedule.splice(idx, 1)
    },
    setCars: (state, payload) => {
      state.cars = payload
    },
    carUpdated: ({ cars }, payload) => {
      const car = cars.find(item => item.id === payload.id)
      if (car) Object.assign(car, payload)
      else cars.push(payload)
    },
  },
  actions: {
    getCarUnitFields: ({ dispatch }, payload) => {
      return new Promise((resolve, reject) => {
        apolloClient.query({
          query: carUnitQuery,
          variables: payload,
          fetchPolicy: 'no-cache'
        }).then(({ data: { carUnit } }) => {
          let carUnitFields = {
            driver1Id: carUnit.driver1Id,
            driver2Id: carUnit.driver2Id,
            trailerId: carUnit.trailerId
          }
          resolve(carUnitFields)
        }).catch(e => dispatch('setError', e.message))
      })

    }
  },
  getters: {
    vehicleType: state => state.vehicleType.filter(item => item.value !== 'trailer'),
    allVehicleTypes: state => state.vehicleType,
    trailers: ({ cars }) => cars.filter(item => item.type === 'trailer' && !item.isTempSlot),
    cars: state => state.cars.filter(item => !item.isTempSlot && item.type !== 'trailer'),
    carsForJournal: ({ cars }) => cars.filter(item => !item.isTempSlot),
    carById: ({ cars }) => (id) => {
      if (cars.length && id) return cars.find(item => item.id === id)
      else return null
    },
    carsForAutocomplete: ({ cars }) => (type) => type ? cars.filter(item => item.type === type && !item.isTempSlot) : cars,
    carsForAutocomplete_v2: ({ cars }) => (types) => cars.filter(item => types.indexOf(item.type) !== -1 && !item.isTempSlot && item.isActive),
    carsByType: ({ cars }) => (type) => cars
      .filter(item => (item.type === type && !item.isTempSlot && item.isActive))
      .sort((a, b) => a.listItem - b.listItem),
    carSlotsByType: (state) => (type) => state.cars
      .filter(item => (item.type === type && item.isTempSlot))
      .sort((a, b) => a.listItem - b.listItem),


    carWorkSchedule: ({ carWorkSchedule }) => carWorkSchedule,
    carWorkScheduleTypes: ({ carWorkScheduleTypes }) => carWorkScheduleTypes,
    carWorkScheduleTypeById: ({ carWorkScheduleTypes }) => (id) => carWorkScheduleTypes.find(item => item.id === id),
    carUnitFieldsForCell: ({ carUnits }) => (dateStr, truckId) => {
      const carUnit = carUnits.find(item => item.truckId === truckId && dateInRange(item.dateRange, dateStr))
      if (carUnit) {
        return {
          trailerId: carUnit.trailerId,
          driver1Id: carUnit.driver1Id,
          driver2Id: carUnit.driver2Id
        }
      } else {
        return {}
      }

    }
  }
}