<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
        cols="12"
        class="not-confirmed-orders-container"
        @drop="dropHandler($event)"
        @dragover="dragOver"
      >
        <div class="order-item-wrapper" v-if="notConfirmedOrders.length">
          <app-order-item
            v-for="item of notConfirmedOrders"
            :order="item"
            :key="item._id"
          />
        </div>
        <div v-else><small>Заказы не найдены</small></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import appOrderItem from './orderItem'

export default {
  computed: {
    ...mapGetters(['notConfirmedOrders'])
  },
  components: {
    appOrderItem
  },
  methods: {
    dropHandler(event, num) {
      event.preventDefault()
      const order = JSON.parse(event.dataTransfer.getData('order'))
      this.$store.dispatch('resetCarInOrder', order._id)
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
  border: 2px grey dotted;
  border-radius: 0.5em;
}

.order-item-wrapper {
  display: flex;
  flex-direction: row;
}
</style>
