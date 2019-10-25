<template>
  <div>
    <v-card
      class="order-container ma-1"
      :draggable="true"
      @dragstart="dragStartHandler($event, JSON.stringify(order))"
    >
      <div>
        {{ order.shipper }}
        <small>{{ '15' }}</small>
      </div>
      <v-divider />
      <div>
        {{ order.consignee }}
        <small>{{ '23' }}</small>
      </div>
    </v-card>
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
    },
    dragOver(event) {
      event.preventDefault()
      return false
    }
  }
}
</script>

<style>
.order-container {
  background-color: white;
  font-size: 0.7rem;
  width: 6rem;
  height: 2.6rem;
  border-radius: 0.5em;
  display: flex;
  flex-direction: row;
}
.order-container:hover {
  box-shadow: 1px 1px 1px 1px rgba(5, 5, 5, 0.2);
}
</style>
