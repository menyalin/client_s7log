<template>
  <div>
    <component
      :is="componentSelector"
      :order="item"
      :carWorkSchedule="item"
      :cell="item"
    />
  </div>
</template>

<script>
import carSchedule from './carWorkSchedule'
import order from './orderItem'
import empty from './emptyCell'

export default {
  props: ['item'],
  name: 'item-cell-component',
  components: {
    carSchedule,
    order,
    empty
  },
  computed: {
    componentSelector() {
      return this.item.itemType
    }
  }
}
</script>
