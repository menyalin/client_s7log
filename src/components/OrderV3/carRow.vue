<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters justify="center" fill class="car--row">
      <v-col cols="auto" class="car--title pa-0">
        <div v-if="header">
          <car-title-header />
        </div>
        <div v-else class="car-title-cell" :class="carTitleClasses">
          {{ car.title }}
        </div>
      </v-col>
      <v-col>
        <div v-if="header" class="header--container">
          <car-dates-header
            v-for="(date, i) of dates"
            :date="date"
            :isFirst="i === 0"
            :isLast="i === dates.length - 1"
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
            :style="{ width: (cell.lengthCell / colCount) * 100 + '%' }"
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
import carTitleHeader from './carTitleHeader'

const getCellLengthInRange = (cell, startPosition, endPosition) => {
  let length = 0
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
const isLastZone = endDate => {
  return moment(endDate).hours() == 18
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
    itemCell,
    carTitleHeader
  },
  computed: {
    itemsRow() {
      let orders = this.$store.getters.orders.filter(
        item => item.carId === this.car.id
      )
      let carSchedule = this.$store.getters.carWorkSchedule.filter(
        item => item.carId === this.car.id
      )
      let res = []
      let startPos = moment(this.dates[0] + ' 00:00')
      const endPos = moment(this.dates[this.dates.length - 1]).add(18, 'h')
      while (startPos.isSameOrBefore(endPos)) {
        let tmpOrder = getItemInRange(orders, startPos)
        let tmpCarWorkSchedule = getItemInRange(carSchedule, startPos)
        if (tmpOrder) {
          res.push({
            ...tmpOrder,
            itemType: 'order',
            isLastZone: isLastZone(+tmpOrder.dateRange[1].value),
            lengthCell: getCellLengthInRange(tmpOrder, startPos, endPos)
          })
          startPos = moment(+tmpOrder.dateRange[1].value).add(6, 'h')
        } else if (tmpCarWorkSchedule) {
          res.push({
            ...tmpCarWorkSchedule,
            itemType: 'carSchedule',
            isLastZone: isLastZone(+tmpCarWorkSchedule.dateRange[1].value),
            lengthCell: getCellLengthInRange(
              tmpCarWorkSchedule,
              startPos,
              endPos
            )
          })
          startPos = moment(+tmpCarWorkSchedule.dateRange[1].value).add(6, 'h')
        } else {
          res.push({
            id: startPos.format('YYYY-MM-DD HH:mm'),
            isLastZone: isLastZone(startPos),
            itemType: 'empty',
            carId: this.car.id,
            carType: this.carType,
            lengthCell: 1
          })
          startPos.add(6, 'H')
        }
      }
      return res
    },
    colCount() {
      return this.dates.length * 4
    },
    carTitleClasses() {
      return {
        'owned--car': this.car.isOwned,
        'two--tier': this.car.maxPltCount > 33,
        'alien--car': !this.car.isOwned,
        'slot--item': this.car.isTempSlot
      }
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
.car-title-cell {
  height: 100%;
  width: 100%;
  text-align: center;
}
.owned--car {
  background-color: rgba(135, 206, 250, 0.65);
}
.two--tier {
  color: rgb(202, 0, 0);
  font-weight: 500;
}
.alien--car {
  background-color: rgba(248, 162, 176, 0.55);
}
.slot--item {
  background-color: inherit;
  color: darkgray;
  font-size: 0.8em;
}
</style>
