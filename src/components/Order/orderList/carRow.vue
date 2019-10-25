<template>
  <v-container fluid class="pa-0 ma-0 pb-1">
    <v-row no-gutters class="car-row">
      <!-- <v-col cols="auto" class="row-car-title">{{ car.number }}</v-col> -->
      <v-col
        cols="4"
        style="{ height: 100%; }"
        v-for="(date, i) in dates"
        :key="i"
      >
        <div class="car-day">
          <div class="time--zone" v-for="zone in timeZones" :key="zone.id">
            <app-order-item
              v-if="filteredOrders(car.id, date, zone.id)"
              :order="filteredOrders(car.id, date, zone.id)"
            />
            <div
              v-else
              @drop="dropHandler($event, car.id, date, zone.id)"
              @dragover="dragOver"
              class="empty--zone"
            >
              <small>{{ zone.title }}</small>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
    dates: () => ['2019-10-22', '2019-10-23', '2019-10-24']
  }
}
</script>

<style scoped>
.car-row {
  background-color: white;
  height: 2.6rem;
  align-items: center;
}
.row-car-title {
  padding-left: 2em;
  padding-right: 2em;
  width: 4em;
}
.car-day {
  display: flex;
  height: 100%;
  flex-direction: row;
  border-right: 1px dotted grey;
  border-left: 1px dotted grey;
}
.time--zone {
  width: 25%;
  height: 100%;
  font-size: 0.7em;
  color: grey;
}
.empty--zone {
  width: 100%;
  height: 100%;
}
</style>
