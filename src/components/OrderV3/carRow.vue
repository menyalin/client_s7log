<template>
  <v-container fluid class="pa-0 ma-0" fill-height>
    <v-row no-gutters justify="center">
      {{ itemsRow }}
    </v-row>
  </v-container>
</template>

<script>
/*
    <v-col v-for="date in dates" :cols="12 / dates.lenght" :key="date">
        <div>1</div>
      </v-col>

*/
import moment from 'moment'
const getItemLength = (endConfirmDate, startPosition, endPos) => {
  let length = 0
  while (
    startPosition.isBefore(endConfirmDate) &&
    startPosition.isBefore(endPos)
  ) {
    length++
    startPosition.add(6, 'h')
  }
  return length
}

export default {
  props: ['car', 'header', 'dates', 'carType'],
  computed: {
    itemsRow() {
      let orders = this.$store.getters.ordersV2.filter(
        item => item.carId === this.car.id
      )
      let res = []
      if (orders.length) {
        let startPos = moment(this.dates[0] + ' 00:00')
        const endPos = moment(this.dates[this.dates.length - 1] + ' 23:59:59')
        while (startPos.isBefore(endPos)) {
          let tmp = orders.find(item => startPos.isSame(item.startConfirmDate))
          if (tmp) {
            res.push({
              ...tmp,
              itemLength: getItemLength(
                moment(tmp.endConfirmDate),
                startPos,
                endPos
              )
            })
            startPos = moment(tmp.endConfirmDate)
          } else {
            res.push(null)
            startPos.add(6, 'h')
          }
        }
      }
      console.log(res)
      return res
    }
  }
}
</script>

<style></style>
