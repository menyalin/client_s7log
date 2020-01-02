<template>
  <div>
    <app-car-work v-if="isCarWork" :carWorkSchedule="item" />
    <app-order-item v-else-if="isOrder" :order="item" />
    <app-empty-cell v-else :cell="item" />
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
</style>