<template>
  <div
    class="order-container"
    :draggable="true"
    @dragstart="dragStartHandler($event, JSON.stringify(order))"
    @dblclick="dblClickHandler"
    :class="classes"
  >
    <div class="row-wrapper">
      <div class="col-title">{{ partnersById(order.shipper).shortName }}</div>
      <div class="col-time">
        <small>{{ order.shippingTime.slice(0, 2) }}</small>
      </div>
    </div>
    <div>
      <div class="row-wrapper">
        <div class="col-title">{{ partnersById(order.consignee).shortName }}</div>
        <div class="col-time">
          <small>{{ order.deliveryTime.slice(0, 2) }}</small>
        </div>
      </div>
      <app-order-item-modal v-model="dialog" :order="order" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import appOrderItemModal from './orderItemModal'

export default {
  name: 'orderItem',
  props: ['order'],
  components: {
    appOrderItemModal
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapGetters(['partnersById']),
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
    dropHandler(event, num) {
      const order = JSON.parse(event.dataTransfer.getData('order'))
      event.preventDefault()
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
  font-size: 0.7rem;
  color: black;
  width: 5.5rem;
  height: 2.1rem;
  border-radius: 0.2em;
  display: flex;
  flex-direction: column;
  border: 1px grey solid;
  overflow: hidden;
  z-index: 4;
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
  box-shadow: 2px 2px 2px 2px rgba(5, 5, 5, 0.3);
}
.row-wrapper {
  display: flex;
  justify-content: space-around;
  justify-items: center;
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
</style>
