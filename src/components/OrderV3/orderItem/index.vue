<template>
  <div
    class="order-container"
    :draggable="true"
    @dragstart.exact="dragStartHandler($event, JSON.stringify(order))"
    @dragstart.meta="dragStartHandler($event, JSON.stringify(order), 'test')"
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
    dragStartHandler(event, item, arg3) {
      if (arg3) console.log('Огонь :)')
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

<style scoped>
.order-container {
  background-color: white;
  font-size: 0.58rem;
  color: black;
  width: 100%;
  height: 2rem;
  border-radius: 0.2em;
  display: flex;
  flex-direction: column;
  border: 1px black solid;
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
