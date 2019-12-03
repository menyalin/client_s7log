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
        v-model="order"
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
    dialog: false
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
    },
    updateOrderHandler() {
      this.$apollo.mutate({
        mutation: updateOrderMutation,
        variables: {
          id: this.order.id,
          status: this.order.status || null,
          carType: this.order.carType,
          confirmDate: this.order.confirmDate || null,
          confirmTime: this.order.confirmTime || null,
          shipperId: this.order.shipperId || null,
          consigneeId: this.order.consigneeId || null,
          note: this.order.note || null,
          shippingDate: this.order.shippingDate || null,
          shippingTime: this.order.shippingTime || null,
          deliveryDate: this.order.deliveryDate || null,
          deliveryTime: this.order.deliveryTime || null,
          confirmedCarId: this.order.confirmedCarId || null,
          isDriverNotified: this.order.isDriverNotified || null,
          isClientNotified: this.order.isClientNotified || null
        }
      })
      this.dialog = false
    },
    dblClickHandler() {
      this.dialog = true
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
