<template>
  <v-container fluid class="pa-0 ma-0" fill-height>
    <v-row no-gutters>
      <v-col cols="12">
        <app-not-confirmed-orders />
        <app-car-row :header="true" :dates="dates" />
        <div class="car-row-wrapper">
          <app-car-row v-for="car in cars" :car="car" :key="car.id" :header="false" :dates="dates" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import appNotConfirmedOrders from './notConfirmedOrders'
import moment from 'moment'
import appCarRow from './carRow'
import { mapGetters } from 'vuex'
export default {
  created() {
    this.$store.commit('setCurrentDate', moment().format('YYYY-MM-DD'))
  },
  components: {
    appCarRow,
    appNotConfirmedOrders
  },
  computed: {
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
                .format('YYYY-MM-DD')
            ]
          case 'xl':
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
                .format('YYYY-MM-DD')
            ]
        }
      } else {
        return null
      }
    },
    ...mapGetters(['currentDate', 'cars'])
  }
}
</script>

<style scoped>
.car-row-wrapper {
  overflow: auto;
  max-height: 65vh;
}
.car-row-wrapper div:nth-child(2n-1) {
  background-color: rgba(189, 236, 255, 0.2);
}
</style>
