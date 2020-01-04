<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
        cols="12"
        class="not-confirmed-orders-container"
        @drop="dropHandler($event)"
        @dragover="dragOver"
      >
        <div v-if="notConfirmedOrders.length" class="order-item-wrapper">
          <div
            v-for="item in notConfirmedOrders"
            :key="item.id"
            :style="{width: (cellLength(item)/totalCount*100)+ '%' }"
          >
            <app-order-item :order="item" />
          </div>
        </div>
        <div v-else class="empty-container">
          <small>Заказы не найдены</small>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import appOrderItem from '../orderItem'

export default {
  computed: {
    notConfirmedOrders() {
      return this.$store.getters.notConfirmedOrders(this.carType)
    },
    totalCount() {
      return this.dates.length * 4
    }
  },
  props: ['carType', 'dates'],
  components: {
    appOrderItem
  },
  methods: {
    cellLength(order) {
      if (order.length) return order.length
      // let length = 0
      // let startPos = moment(order.startDate)
      // while (startPos.isSameOrAfter(order.endDate)) {
      //   length++
      //   startPos.add(6, 'h')
      // }
      return 2
    },
    dropHandler(event) {
      event.preventDefault()
      const order = JSON.parse(event.dataTransfer.getData('order'))
      this.$store.dispatch('resetCarInOrder', order.id)
      event.preventDefault()
    },
    dragOver(event) {
      event.preventDefault()
      return false
    }
  }
}
</script>

<style>
.not-confirmed-orders-container {
  justify-content: flex-start;
  flex-wrap: nowrap;
  border: 3px grey dotted;
  border-radius: 0.3em;
}

.order-item-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.empty-container {
  height: 2rem;
}
</style>
