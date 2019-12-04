<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
        cols="12"
        class="not-confirmed-orders-container"
        @drop="dropHandler($event)"
        @dragover="dragOver"
      >
        <div v-if="notConfirmedOrders.length > 0">
          <div class="order-item-wrapper">
            <app-order-item
              v-for="item in notConfirmedOrders"
              :order="item"
              :key="item.id"
            />
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
import appOrderItem from './orderItem'

export default {
  computed: {
    notConfirmedOrders() {
      return this.$store.getters.notConfirmedOrders(this.carType)
    }
  },
  props: ['carType'],
  components: {
    appOrderItem
  },
  methods: {
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
  border: 3px grey dotted;
  border-radius: 0.3em;
}

.order-item-wrapper {
  display: flex;
  flex-direction: row;
}
.empty-container {
  height: 2rem;
}
</style>
