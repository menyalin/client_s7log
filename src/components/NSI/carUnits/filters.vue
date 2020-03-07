<template>
  <div class="filter-wrapper">
    <date-time-control label="Дата и время" v-model="filters.date" fixedTimeZones />
    <drivers v-model="filters.driver" label="Водитель" />
    <cars
      label="Грузовик"
      :types="['20tn', '10tn']"
      v-model="filters.truckId"
    />
    <cars label="Прицеп" :types="['trailer']" v-model="filters.trailerId" />
  </div>
</template>

<script>
import drivers from '@/components/common/driverAutocomplete'
import dateTimeControl from '@/components/common/dateTimeControl'
import cars from '@/components/common/carAutocomplete'
export default {
  model: {
    prop: 'filters',
    event: 'change'
  },
  props: ['filters'],
  components: {
    drivers,
    cars,
    dateTimeControl
  }
}
</script>

<style scoped>
.filter-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}
</style>
