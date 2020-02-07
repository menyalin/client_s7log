<template>
  <v-dialog v-model="showOrderDialog_v2" max-width="1480px">
    <order-edit-form v-model="editedOrder_v2" />
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import orderEditForm from './orderEditForm'
export default {
  computed: {
    ...mapGetters(['showOrderDialog_v2', 'editedOrder_v2'])
  },
  components: {
    orderEditForm
  },
  methods: {
    // cancelFormHandler() {
    //   this.$store.commit('cancelOrderEdit')
    // },
    // createOrderHandler() {
    //   this.$store.dispatch('createNewOrder')
    // },
    // updateOrderHandler() {
    //   this.$store.dispatch('updateOrder')
    // }
  }
}
</script>

<style></style>
