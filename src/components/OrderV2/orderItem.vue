<template>
  <div
    class="order-container"
    :draggable="true"
    @dragstart="dragStartHandler($event, JSON.stringify(order))"
    @dblclick="dblClickHandler"
    :class="classes"
  >
    <v-dialog v-model="dialog" max-width="1024px" persistent>
      <order-edit-form
        v-model="editedOrder"
        @cancelEdit="cancelFormHandler"
        @updateOrder="updateOrderHandler"
      />
    </v-dialog>

    <order-item-row
      :partnerId="order.shipperId"
      :time="order.shippingTime"
      :date="order.shippingDate"
    />
    <order-item-row
      :partnerId="order.consigneeId"
      :time="order.deliveryTime"
      :date="order.deliveryDate"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import orderEditForm from './allOrders/orderEditForm.vue'
import orderItemRow from './orderItemRow'
import { updateOrderMutation } from './gql'

export default {
  name: 'orderItem',
  props: ['order'],
  components: {
    orderEditForm,
    orderItemRow
  },
  data: () => ({
    dialog: false,
    editedOrder: {}
  }),
  computed: {
    ...mapGetters(['addressById', 'isAddressesUpload']),
    classes() {
      let resArr = []
      switch (this.order.status) {
        case 'Проблема': {
          resArr.push('problems')
          break
        }
        case 'На погрузке': {
          resArr.push('in-process')
          break
        }
        case 'Выполнен': {
          resArr.push('finished')
          break
        }
      }
      return resArr
    }
  },
  methods: {
    dragStartHandler(event, item) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('order', item)
    },
    cancelFormHandler() {
      this.dialog = false
      this.editedOrder = Object.assign({})
    },
    updateOrderHandler() {
      this.$apollo.mutate({
        mutation: updateOrderMutation,
        variables: {
          id: this.editedOrder.id,
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
      })
      this.$nextTick(() => {
        this.dialog = false
        this.editedOrder = Object.assign({})
      })
    },
    dblClickHandler() {
      this.dialog = true
      this.$nextTick(() => {
        this.editedOrder = Object.assign({}, this.order)
      })
    }
  }
}
</script>

<style scoped>
.order-container {
  background-color: white;
  font-size: 0.58rem;
  color: black;
  width: 100%;
  max-width: 9em;
  height: 2rem;
  border-radius: 0.2em;
  display: flex;
  flex-direction: column;
  border: 1px grey solid;
  overflow: hidden;
  z-index: 4;
}
.order-container:hover {
  box-shadow: 1px 1px 1px 1px rgba(5, 5, 5, 0.3);
}
.problems {
  background-color: rgba(248, 93, 21, 0.452);
}
.in-process {
  background-color: rgba(8, 153, 8, 0.596);
}
.finished {
  background-color: rgba(169, 169, 169, 0.349);
}
.tooltip-information {
  display: flex;
  font-size: 1.5em;
  flex-direction: column;
}
</style>
