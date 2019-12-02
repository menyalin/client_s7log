<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters class="car--row">
      <v-col class="title-car-col" cols="auto">
        <app-car-title-header v-if="header" class="row--header" />
        <div v-else class="car-title">{{ car.title }}</div>
      </v-col>
      <v-col class="day-car-cols">
        <v-container fluid class="pa-0 ma-0" fill-height>
          <v-row no-gutters justify="center">
            <v-col v-for="date in dates" :cols="12/dates.lenght" :key="date" class="car-column">
              <app-car-dates-header v-if="header" :date="date" class="row--header" />
              <app-car-date v-else :date="date" :car="car" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import appCarTitleHeader from './carTitleHeader'
import appCarDatesHeader from './carDatesHeader'
import appCarDate from './carDate'

export default {
  name: 'carRow',
  props: ['header', 'dates', 'car'],
  components: {
    appCarTitleHeader,
    appCarDatesHeader,
    appCarDate
  }
}
</script>

<style scoped>
.title-car-col {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4em;
}
.day-car-cols {
  height: 100%;
}
.car--row {
  align-items: center;
}
</style>