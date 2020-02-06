<template>
  <div
    class="order-container"
    :draggable="true"
    @dragstart="dragStartHandler($event, JSON.stringify(order))"
    @click="clickHandler"
    :class="classes"
  >
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
import orderItemRow from './orderItemRow'

export default {
  name: 'orderItem',
  props: ['order'],
  components: {
    orderItemRow
  },
  computed: {
    ...mapGetters(['addressById', 'isAddressesUpload']),
    classes() {
      return {
        'status--10': this.order.status == 10,
        'status--20': this.order.status == 20,
        'status--30': this.order.status == 30,
        isDriverNotified: this.order.isDriverNotified,
        isClientNotified: this.order.isClientNotified,
        'status--40': this.order.status == 40,
        'status--50': this.order.status == 50,
        'status--60': this.order.status == 60,
        'status--98': this.order.status == 98,
        'status--99': this.order.status == 99,
        attention: this.order.attention
      }
    }
  },
  methods: {
    dragStartHandler(event, item) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('order', item)
    },
    clickHandler() {
      this.$store.commit('openEditOrderForm', this.order)
    }
  }
}
</script>

<style>
.order-container {
  background-color: white;
  font-size: 0.625em;
  line-height: 1.35em;
  letter-spacing: -0.05em;
  font-weight: 400;
  color: black;
  width: 100%;
  height: 1.8rem;
  display: flex;
  flex-direction: column;
  border: 1px black solid;
  overflow: hidden;
  margin: 0px;
  z-index: 4;
}
.order-container:hover {
  box-shadow: inset 0px 0px 3px rgba(5, 5, 5, 0.7);
}
.status--10 {
  color: rgb(95, 95, 95);
  border: 1px gray solid;
}
.status--20 {
  color: red;
  border: 1px gray solid;
}
.status--30 {
  color: black;
  font-weight: 400;
}
.isDriverNotified {
  color: blue;
  font-weight: 400;
}
.isClientNotified {
  background-color: rgb(176, 226, 255);
}
.status--40 {
  background-color: lightgreen;
  color: inherit;
}
.status--40 > div:nth-child(1) {
  color: red;
}
.status--50 {
  background-color: lightgreen;
  color: inherit;
}
.status--60 {
  background-color: rgb(196, 241, 196);
  color: inherit;
}
.status--50 > div:nth-child(4) {
  color: red;
}
.status--98 {
  color: red;
  background-color: black;
}
.status--99 {
  color: black;
  background-color: red;
}
.attention {
  border: 1px solid red;
}
.tooltip-information {
  display: flex;
  font-size: 1.4em;
  flex-direction: column;
}
</style>
