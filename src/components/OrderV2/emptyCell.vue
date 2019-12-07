<template>
  <div
    @click="openMenu"
    @drop="dropHandler($event, carId, date, zoneId)"
    @dragover="dragOver"
    class="empty--zone"
  >
    <v-menu v-model="dialog" :position-x="x" :position-y="y" absolute offset-y>
      <v-list dense>
        <v-list-item @click="newOrder">
          <v-list-item-title>Новый заказ</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="template in orderTemplates(carType)"
          :key="template.id"
          @click="newOrder(template)"
        >
          <v-list-item-title>{{ template.templateName }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog v-model="orderFormModal" max-width="1024px" persistent>
      <order-edit-form
        v-model="editedOrder"
        @cancelEdit="cancelFormHandler"
        @createOrder="createOrderHandler"
      />
    </v-dialog>
  </div>
</template>

<script>
import orderEditForm from './allOrders/orderEditForm'
import { createOrderMutation } from './gql'
import { mapGetters } from 'vuex'
export default {
  name: 'emptyCell',
  props: ['carId', 'date', 'zoneId', 'carType'],
  data: () => ({
    editedOrder: {},
    dialog: false,
    orderFormModal: false,
    x: 0,
    y: 0
  }),
  methods: {
    newOrder(template) {
      let dataFromTemplate = {}
      if (template) {
        dataFromTemplate = {
          status: template.status || null,
          note: template.note || null,
          shipperId: template.shipperId || null,
          consigneeId: template.consigneeId || null
        }
      }
      this.editedOrder = Object.assign(dataFromTemplate, {
        carType: this.carType,
        confirmDate: this.date,
        confirmTime: this.zoneId,
        confirmedCarId: this.carId
      })
      this.$nextTick(() => {
        this.orderFormModal = true
      })
    },
    createOrderHandler() {
      this.$apollo
        .mutate({
          mutation: createOrderMutation,
          variables: this.mutationVariables
        })
        .then(({ data: { createOrder } }) => {
          this.editedOrder = Object.assign({}, {})
          this.$nextTick(() => {
            this.orderFormModal = false
          })
        })
        .catch(e => {
          this.$store.commit('setError', e.message)
        })
    },
    cancelFormHandler() {
      this.$nextTick(() => {
        this.orderFormModal = false
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
    },
    openMenu(e) {
      e.preventDefault()
      this.dialog = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.dialog = true
      })
    }
  },
  components: {
    orderEditForm
  },
  computed: {
    mutationVariables() {
      return {
        status: this.editedOrder.status || null,
        carType: this.editedOrder.carType,
        confirmDate: this.editedOrder.confirmDate || null,
        confirmTime: this.editedOrder.confirmTime || null,
        shipperId: this.editedOrder.shipperId || null,
        consigneeId: this.editedOrder.consigneeId || null,
        note: this.editedOrder.note || null,
        shippingDate: this.editedOrder.shippingDate || null,
        shippingTime: this.editedOrder.shippingTime || null,
        deliveryDate: this.editedOrder.deliveryDate || null,
        deliveryTime: this.editedOrder.deliveryTime || null,
        confirmedCarId: this.editedOrder.confirmedCarId || null,
        isDriverNotified: this.editedOrder.isDriverNotified || null,
        isClientNotified: this.editedOrder.isClientNotified || null
      }
    },
    ...mapGetters(['orderTemplates'])
  }
}
</script>

<style scoped>
.empty--zone {
  width: 100%;
  height: 100%;
  height: 2.4em;
}
.empty--zone:hover {
  box-shadow: 1px 1px 1px 1px rgba(5, 5, 5, 0.1);
}
</style>
