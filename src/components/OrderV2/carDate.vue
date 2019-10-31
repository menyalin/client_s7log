<template>
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
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import appOrderItem from './orderItem'

export default {
  props: ['car', 'date'],
  components: {
    appOrderItem
  },
  computed: {
    ...mapGetters({
      filteredOrders: 'ordersByCarAndConfirmDateZone',
      timeZones: 'timeZones'
    })
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
      return false
    },
    dragOver(event) {
      event.preventDefault()
      return false
    }
  }
}
</script>

<style scoped>
.time--zone {
  width: 25%;
  height: 100%;
  font-size: 0.7em;
  color: grey;
}
.empty--zone {
  width: 100%;
  height: 100%;
  height: 2.4em;
}
.car-day {
  display: flex;
  height: 100%;
  flex-direction: row;
  border-right: 1px dotted grey;
  border-left: 1px dotted grey;
}
</style>