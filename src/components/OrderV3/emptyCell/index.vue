<template>
  <div
    @click="newOrder"
    @drop="dropHandler($event, carId, date, zoneId)"
    @dragover="dragOver"
    class="empty--zone"
  />
</template>

<script>
import { mapGetters } from 'vuex'
/* 
  props: ['carId', 'date', 'zoneId', 'carType']
*/

export default {
  name: 'emptyCell',
  props: ['cell'],
  methods: {
    newOrder() {
      this.$store.commit('openEditOrderForm', {
        carType: this.carType,
        confirmTime: this.zoneId,
        confirmDate: this.date,
        confirmedCarId: this.carId,
        templateId: null
      })
    },

    dropHandler(event, carId, date, zoneId) {
      const order = JSON.parse(event.dataTransfer.getData('order'))
      this.$store.dispatch('confirmOrder', {
        id: order.id,
        confirmedCarId: carId,
        confirmDate: date,
        confirmTime: zoneId
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
.empty--zone {
  width: 100%;
  height: 100%;
  height: 2rem;
}
.empty--zone:hover {
  box-shadow: 1px 1px 1px 1px rgba(5, 5, 5, 0.1);
}
</style>
