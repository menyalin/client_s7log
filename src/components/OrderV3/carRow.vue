<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters justify="center">
      <v-col cols="auto" class="car--title">
        <div v-if="header"></div>
        <div v-else>
          <small>{{ num+1 }}</small>
          {{ car.title }}
        </div>
      </v-col>
      <v-col>
        <div v-if="header" class="header--container">
          <car-dates-header
            v-for="date of dates"
            :date="date"
            :key="date"
            :style="{width: (100/dates.length)+'%'}"
          />
        </div>
        <div v-else class="items--container">
          <div
            v-for="cell in itemsRow"
            :key="cell.id"
            class="item--cell"
            :class="{lastCell: cell.isLastZone}"
            :style="{width: (cell.length/colCount*100)+ '%' }"
          >
            <item-cell :item="cell" />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import itemCell from './itemCell'
import carDatesHeader from './header/carDatesHeader'

const getOrderLength = (order, startPosition, endPos) => {
  let length = 0
  const startConf = moment(order.startConfirmDate)
  const endConf = moment(order.endConfirmDate)
  while (startPosition.isBefore(endConf) && startPosition.isBefore(endPos)) {
    length++
    startPosition.add(6, 'h')
  }
  return length
}

export default {
  props: ['car', 'header', 'dates', 'carType', 'num'],
  components: {
    carDatesHeader,
    itemCell
  },
  computed: {
    itemsRow() {
      let orders = this.$store.getters.ordersV2.filter(
        item => item.carId === this.car.id
      )
      let carSchedule = this.$store.getters.carWorkScheduleV2.filter(
        item => item.carId === this.car.id
      )
      let res = []
      let startPos = moment(this.dates[0] + ' 00:00')
      const endPos = moment(this.dates[this.dates.length - 1] + ' 23:59:59')
      while (startPos.isBefore(endPos)) {
        let tmpOrder = orders.find(
          item =>
            startPos.isSameOrAfter(item.startConfirmDate) &&
            startPos.isBefore(item.endConfirmDate)
        )
        let tmpCarWorkSchedule = carSchedule.find(
          item =>
            startPos.isSameOrAfter(item.startDate) &&
            startPos.isBefore(item.endDate)
        )
        if (tmpOrder) {
          res.push({
            itemType: 'order',
            isLastZone: moment(tmpOrder.endConfirmDate).hours() === 0,
            ...tmpOrder,
            length: getOrderLength(tmpOrder, startPos, endPos)
          })
          startPos = moment(tmpOrder.endConfirmDate)
        } else if (tmpCarWorkSchedule) {
          res.push({
            itemType: 'carSchedule',
            isLastZone: moment(tmpCarWorkSchedule.endDate).hours() === 0,
            ...tmpCarWorkSchedule,
            length: 3 // <-------------
          })
          startPos = moment(tmpCarWorkSchedule.endDate)
        } else {
          res.push({
            id: startPos.format('YYYY-MM-DD HH:mm'),
            startPos,
            isLastZone: startPos.hours() === 18,
            itemType: 'empty',
            carType: this.carType,
            length: 1
          })
          startPos.add(6, 'h')
        }
      }
      return res
    },
    colCount() {
      return this.dates.length * 4
    }
  }
}
</script>

<style scoped>
.car--title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
}
.item--cell {
  min-height: 2rem;
  min-width: 3rem;
}
.item--cell:first-of-type {
  border-left: 2px solid red;
}
.lastCell {
  border-right: 2px solid red;
}
.items--container {
  display: flex;
  flex-direction: row;
}
.header--container {
  display: flex;
  flex-direction: row;
}
</style>
