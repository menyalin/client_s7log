<template>
  <div
    @click="newOrder"
    @drop="dropHandler($event)"
    @dragover="dragOver"
    class="empty--zone"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
/*
  props: ['carId', 'date', 'zoneId', 'carType']
*/

export default {
  name: 'emptyCell',
  props: ['cell'],
  methods: {
    newOrder() {
      this.$store.commit('openEditOrderForm', {
        lengthCell: 1,
        carType: this.cell.carType,
        dateRange: this.getDateRange(moment(this.cell.id), 1),
        carId: this.cell.carId
      })
    },

    dropHandler(event) {
      const order = JSON.parse(event.dataTransfer.getData('order'))
      this.$store.dispatch('confirmOrder', {
        id: order.id,
        carId: this.cell.carId,
        carType: this.cell.carType,
        dateRange: this.getDateRange(moment(this.cell.id), order.lengthCell)
      })
      event.preventDefault()
      return false
    },
    getDateRange(startDate, length) {
      const dateF = 'YYYY-MM-DD HH:mmZ'
      let endDate = moment(startDate.format(dateF))
      let i = 1
      while (i < length) {
        endDate.add(6, 'h')
        i++
      }
      return `[${startDate.format(dateF)},${endDate.format(dateF)}]`
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
  box-shadow: 0px 0px 3px rgba(5, 5, 5, 0.3);
}
</style>
