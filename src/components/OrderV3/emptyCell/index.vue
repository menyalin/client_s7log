<template>
  <div
    @click="newOrder"
    @drop.exact="dropHandler($event)"
    @drop.ctrl="dropHandler($event, 'new')"
    @dragover="dragOver"
    class="empty--zone"
    :class="classes"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'emptyCell',
  props: ['cell'],
  computed: {
    ...mapGetters(['carUnitFieldsForCell', 'carById']),
    classes() {
      const carUnit = this.carUnitFieldsForCell(this.cell.id, this.cell.carId)
      let pltCount = 0
      if (carUnit.trailerId) {
        pltCount = this.carById(carUnit.trailerId).maxPltCount
      }
      return {
        notConfirmed: !carUnit.driver1Id,
        plt66: +pltCount >= 50,
        tmpslot: this.carById(this.cell.carId).isTempSlot
      }
    }
  },
  methods: {
    newOrder() {
      const carUnitFields = this.carUnitFieldsForCell(
        this.cell.id,
        this.cell.carId
      )
      this.$store.commit('openEditOrderForm', {
        lengthCell: 1,
        carType: this.cell.carType,
        plannedCarType: this.cell.carType,
        dateRange: this.getDateRange(moment(this.cell.id), 1),
        carId: this.cell.carId,
        plannedShippingDate: this.cell.id,
        ...carUnitFields
      })
    },

    async dropHandler(event, arg) {
      event.preventDefault()
      const order = JSON.parse(event.dataTransfer.getData('order'))
      if (arg === 'new') {
        this.$store
          .dispatch('getCarUnitFields', {
            truckId: this.cell.carId,
            date: this.cell.id
          })
          .then(carUnitFields => {
            this.$store.dispatch('createNewOrder', {
              status: '10',
              carType: this.cell.carType,
              carId: this.cell.carId,
              dateRange: this.getDateRange(
                moment(this.cell.id),
                order.lengthCell
              ),
              lengthCell: order.lengthCell,
              shipperId: order.shipperId,
              consigneeId: order.consigneeId,
              plannedShippingDate: this.cell.id,
              plannedCarType: order.plannedCarType,
              weight: order.weight,
              pltCount: order.pltCount,
              price: order.price,
              ...carUnitFields
            })
          })
      } else {
        if (order.isDriverNotified || order.isClientNotified) {
          this.$store.dispatch('setError', 'Водитель и/или клиент оповещены')
        } else {
          this.$store.dispatch('confirmOrder', {
            id: order.id,
            carId: this.cell.carId,
            carType: this.cell.carType,
            dateRange: this.getDateRange(moment(this.cell.id), order.lengthCell)
          })
        }
      }

      return false
    },
    getDateRange(startDate, length) {
      const dateF = 'YYYY-MM-DD HH:mmZ'
      let endDate = moment(startDate.format(dateF))
      let i = 1
      while (i < length) {
        endDate.add(6, 'h')
        i++
      }
      return `[${startDate.format(dateF)},${endDate.format(dateF)}]`
    },
    dragOver(event) {
      event.preventDefault()
      return false
    }
  }
}
</script>

<style scoped>
.empty--zone {
  width: 100%;
  height: 100%;
  height: 1.7rem;
}
.empty--zone:hover {
  box-shadow: 0px 0px 3px rgba(5, 5, 5, 0.3);
}
.notConfirmed {
  background-color: rgba(100, 99, 99, 0.07);
}
.plt66 {
  border-bottom: 3px solid lightgreen;
}
.tmpslot {
  background-color: unset;
}
</style>
