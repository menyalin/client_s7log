<template>
  <div>
    <transition name="fade">
      <app-car-work v-if="isCarWork" :carWorkSchedule="item" />
      <app-order-item v-else-if="isOrder" :order="item" />
      <app-empty-cell v-else :cell="item" />
    </transition>
  </div>
</template>

<script>
import appCarWork from './carWorkSchedule'
import appOrderItem from './orderItem'
import appEmptyCell from './emptyCell'

export default {
  props: ['item'],
  name: 'item-cell-component',
  components: {
    appCarWork,
    appOrderItem,
    appEmptyCell
  },
  computed: {
    isCarWork() {
      return this.item.itemType === 'carSchedule'
    },
    isOrder() {
      return this.item.itemType === 'order'
    }
  }
}
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
