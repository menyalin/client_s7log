<template>
  <v-container fluid class="pa-0 ma-0" fill-height>
    <v-row no-gutters>
      <v-col>
        <car-row :header="true" :dates="dates" />
        <div class="car-row-wrapper">
          <car-row
            v-for="(car, i) in carsByType('10tn')"
            :car="car"
            :num="i"
            :key="car.id"
            :header="false"
            :dates="dates"
            carType="10tn"
          />
        </div>
        <v-divider class="ma-2" />
        <div class="car-row-wrapper">
          <car-row
            v-for="(car, i) in carSlotsByType(carType)"
            :car="car"
            :num="i"
            :key="car.id"
            :header="false"
            :dates="dates"
            :carType="carType"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import carRow from './carRow'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'orderV3Component',
  props: {
    carType: {
      type: String,
      default: '10tn'
    }
  },
  components: {
    carRow
  },
  computed: {
    ...mapGetters(['carsByType', 'carSlotsByType', 'currentDate']),
    // eslint-disable-next-line vue/return-in-computed-property
    dates() {
      if (this.currentDate) {
        let tmpDate = this.currentDate
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return [tmpDate]
          case 'sm':
            return [
              moment(tmpDate)
                .add(-1, 'd')
                .format('YYYY-MM-DD'),
              tmpDate
            ]
          case 'md':
            return [
              moment(tmpDate)
                .add(-1, 'd')
                .format('YYYY-MM-DD'),
              tmpDate,
              moment(tmpDate)
                .add(1, 'd')
                .format('YYYY-MM-DD')
            ]
          case 'lg':
            return [
              moment(tmpDate)
                .add(-2, 'd')
                .format('YYYY-MM-DD'),
              moment(tmpDate)
                .add(-1, 'd')
                .format('YYYY-MM-DD'),
              tmpDate,
              moment(tmpDate)
                .add(1, 'd')
                .format('YYYY-MM-DD'),
              moment(tmpDate)
                .add(2, 'd')
                .format('YYYY-MM-DD')
            ]
          case 'xl':
            return [
              moment(tmpDate)
                .add(-3, 'd')
                .format('YYYY-MM-DD'),
              moment(tmpDate)
                .add(-2, 'd')
                .format('YYYY-MM-DD'),
              moment(tmpDate)
                .add(-1, 'd')
                .format('YYYY-MM-DD'),
              tmpDate,
              moment(tmpDate)
                .add(1, 'd')
                .format('YYYY-MM-DD'),
              moment(tmpDate)
                .add(2, 'd')
                .format('YYYY-MM-DD'),
              moment(tmpDate)
                .add(3, 'd')
                .format('YYYY-MM-DD')
            ]
        }
      } else return null
    }
  }
}
</script>

<style scoped>
.car-row-wrapper {
  overflow: auto;
  max-height: 40vh;
}
.car-row-wrapper div:nth-child(2n-1) {
  background-color: rgba(189, 236, 255, 0.15);
}
</style>
