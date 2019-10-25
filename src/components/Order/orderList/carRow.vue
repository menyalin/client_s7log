<template>
  <v-container>
    <v-row no-gutters class="car-row">
      <v-col cols="auto" class="row-car-title">{{ car.number }}</v-col>
      <v-col cols="3">
        <div class="car-day">
          <div class="time--zone" v-for="zone in timeZones" :key="zone.id">
            <div v-if="filteredOrders(car.id, date, zone.id)">
              <app-order-item :order="filteredOrders(car.id, date, zone.id)" />
            </div>
            <div
              v-else
              @drop="dropHandler($event, car.id, date, zone.id)"
              @dragover="dragOver"
              class="empty--zone"
            >
              <small>{{ zone.title }} </small>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/*

 @drop="dropHandler($event, '567')"
 @dragover="dragOver"

*/

import { mapGetters } from 'vuex'
import appOrderItem from './orderItem'

export default {
  props: ['car'],
  components: {
    appOrderItem
  },
  methods: {
    dropHandler(event, carId, date, zoneId) {
      const order = JSON.parse(event.dataTransfer.getData('order'))
      this.$store.dispatch('confirmOrder', {
        orderId: order._id,
        carId,
        date,
        zoneId
      })
      event.preventDefault()
    },
    dragOver(event) {
      event.preventDefault()
      return false
    }
  },
  computed: {
    ...mapGetters({
      filteredOrders: 'ordersByCarAndConfirmDateZone',
      timeZones: 'timeZones'
    }),
    date: () => '2019-10-22'
  }
}
</script>

<style scoped>
.car-row {
  background-color: white;
  height: 2.6rem;
}
.row-car-title {
  padding-left: 2em;
  padding-right: 2em;
  width: 5em;
}
.car-day {
  display: flex;
  height: 100%;
  flex-direction: row;
  border-right: 2px solid black;
  border-left: 2px solid black;
}
.time--zone {
  width: 25%;
  font-size: 0.7em;
  color: grey;
}
.empty--zone {
  width: 100%;
  height: 100%;
}
</style>
