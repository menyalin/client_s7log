<template>
  <div
    class="order-container"
    :draggable="true"
    @dragstart="dragStartHandler($event, JSON.stringify(order))"
  >
    <div class="row-wrapper">
      <div class="col-title">
        {{ order.shipper }}
      </div>
      <div class="col-time">
        <small>{{ order.shippingTime.slice(0, 2) }}</small>
      </div>
    </div>
    <div>
      <div class="row-wrapper">
        <div class="col-title">{{ order.consignee }}</div>
        <div class="col-time">
          <small>{{ order.deliveryTime.slice(0, 2) }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderItem',
  props: ['order'],
  methods: {
    dragStartHandler(event, item) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('order', item)
    },
    dropHandler(event, num) {
      const order = JSON.parse(event.dataTransfer.getData('order'))
      event.preventDefault()
    }
  }
}
</script>

<style>
.order-container {
  background-color: white;
  font-size: 0.7rem;
  color: black;
  width: 5.5rem;
  height: 2.1rem;
  border-radius: 0.2em;
  display: flex;
  flex-direction: column;
  border: 1px grey solid;
  overflow: hidden;
}
.col-title {
  flex: 6;
  padding-left: 2px;
  overflow: hidden;
}
.col-time {
  flex: 1;
}
.order-container:hover {
  box-shadow: 1px 1px 1px 1px rgba(5, 5, 5, 0.2);
}
.row-wrapper {
  display: flex;
  justify-content: space-around;
  justify-items: center;
}
</style>
