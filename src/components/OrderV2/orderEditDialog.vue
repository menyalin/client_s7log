<template>
  <v-dialog v-model="showOrderDialog" max-width="1024px" persistent>
    <order-edit-form
      v-model="editedOrder"
      @cancelEdit="cancelFormHandler"
      @createOrder="createOrderHandler"
      @updateOrder="updateOrderHandler"
    />
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import orderEditForm from './allOrders/orderEditForm'
export default {
  computed: {
    ...mapGetters(['showOrderDialog', 'editedOrder'])
  },
  components: {
    orderEditForm
  },
  methods: {
    cancelFormHandler() {
      this.$store.commit('cancelOrderEdit')
    },
    createOrderHandler() {
      this.$store.dispatch('createNewOrder')
    },
    updateOrderHandler() {
      this.$store.dispatch('updateOrder')
    }
  }
}
</script>

<style></style>
