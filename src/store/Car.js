import { apolloClient } from '../vue-apollo'
import moment from 'moment'
import store from './index'

export default {
  state: {
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
    setCarWorkSchedule: (state, payload) => {
      state.carWorkSchedule = payload
    },
    updateCarWorkSchedule: (state, payload) => {
      const carWorkScheduleItem = state.carWorkSchedule.find(item => item.id === payload.id)
      if (carWorkScheduleItem) Object.assign(carWorkScheduleItem, payload)
      else state.carWorkSchedule.push(payload)
    },
    deletedCarWorkSchedule: ({ carWorkSchedule }, id) => {
      carWorkSchedule.splice(carWorkSchedule.findIndex(item => item.id === id), 1)
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
    carsForAutocomplete: ({ cars }) => (type) => type ? cars.filter(item => item.type === type && !item.isTempSlot && item.type !== 'trailer') : cars,
    carsByType: ({ cars }) => (type) => cars
      .filter(item => (item.type === type && !item.isTempSlot && item.isActive))
      .sort((a, b) => a.listItem - b.listItem),
    carSlotsByType: (state) => (type) => state.cars
      .filter(item => (item.type === type && item.isTempSlot))
      .sort((a, b) => a.listItem - b.listItem),


    carWorkSchedule: ({ carWorkSchedule }) => carWorkSchedule,
    carWorkScheduleTypes: ({ carWorkScheduleTypes }) => carWorkScheduleTypes,
    carWorkScheduleTypeById: ({ carWorkScheduleTypes }) => (id) => carWorkScheduleTypes.find(item => item.id === id)
  }
}