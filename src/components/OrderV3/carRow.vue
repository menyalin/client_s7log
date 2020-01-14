<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters justify="center">
      <v-col cols="auto" class="car--title">
        <div v-if="header"></div>
        <div v-else>{{ car.title }}</div>
      </v-col>
      <v-col>
        <div v-if="header" class="header--container">
          <car-dates-header
            v-for="date of dates"
            :date="date"
            :key="date"
            :style="{ width: 100 / dates.length + '%' }"
          />
        </div>
        <div v-else class="items--container">
          <div
            v-for="cell in itemsRow"
            :key="cell.id"
            class="item--cell"
            :class="{ lastCell: cell.isLastZone }"
            :style="{ width: (cell.length / colCount) * 100 + '%' }"
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

const getCellLengthInRange = (cell, startPosition, endPosition) => {
  if (cell.lengthCell) return cell.lengthCell
  let length = 0
  // const startConf = moment(cell.startDate)
  const endConf = moment(+cell.dateRange[1].value)
  while (
    startPosition.isSameOrBefore(endConf) &&
    startPosition.isSameOrBefore(endPosition)
  ) {
    length++
    startPosition.add(6, 'h')
  }
  return length
}

const getCellLength = (cell, startPosition, endPosition) => {
  if (cell.lengthCell) return cell.lengthCell
  let length = 0
  // const startConf = moment(cell.startDate)
  const endConf = moment(cell.endDate)
  while (
    startPosition.isSameOrBefore(endConf) &&
    startPosition.isSameOrBefore(endPosition)
  ) {
    length++
    startPosition.add(6, 'h')
  }
  return length
}
const isLastZone = endDate => {
  return moment(endDate).hours() == 18
}
const getItem = (array, startPosition) => {
  return array.find(
    item =>
      startPosition.isSameOrAfter(item.startDate) &&
      startPosition.isSameOrBefore(item.endDate)
  )
}
const getItemInRange = (array, startPosition) => {
  return array.find(
    item =>
      startPosition.isSameOrAfter(+item.dateRange[0].value) &&
      startPosition.isSameOrBefore(+item.dateRange[1].value)
  )
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
      let carSchedule = this.$store.getters.carWorkSchedule.filter(
        item => item.carId === this.car.id
      )
      let res = []
      let startPos = moment(this.dates[0] + ' 00:00')
      const endPos = moment(this.dates[this.dates.length - 1]).add(18, 'h')
      while (startPos.isSameOrBefore(endPos)) {
        let tmpOrder = getItem(orders, startPos)
        let tmpCarWorkSchedule = getItemInRange(carSchedule, startPos)
        if (tmpOrder && false) {
          res.push({
            ...tmpOrder,
            itemType: 'order',
            isLastZone: isLastZone(tmpOrder.endDate),
            length: getCellLength(tmpOrder, startPos, endPos)
          })
          startPos = moment(tmpOrder.endDate).add(6, 'h')
        } else if (tmpCarWorkSchedule) {
          res.push({
            ...tmpCarWorkSchedule,
            itemType: 'carSchedule',
            isLastZone: isLastZone(+tmpCarWorkSchedule.dateRange[1].value),
            length: getCellLengthInRange(tmpCarWorkSchedule, startPos, endPos)
          })
          startPos = moment(+tmpCarWorkSchedule.dateRange[1].value).add(6, 'h')
        } else {
          res.push({
            id: startPos.format('YYYY-MM-DD HH:mm'),
            startPos,
            isLastZone: isLastZone(startPos),
            itemType: 'empty',
            carType: this.carType,
            length: 1
          })
          startPos.add(6, 'H')
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
