<template>
  <div class="date-wrapper">
    <div class="date-header-column-wrapper">
      <div v-if="date === currentDate">
        <v-icon @click="prevDate">mdi-arrow-left-circle</v-icon>
        <v-menu v-model="menu" :close-on-content-click="false" max-width="290">
          <template v-slot:activator="{ on }">
            <span class="current-date" v-on="on">
              <strong>{{ displayDate }}</strong>
            </span>
          </template>
          <v-date-picker
            :value="date"
            @change="changeCurrentDate"
            first-day-of-week="1"
            color="primary"
            no-title
          ></v-date-picker>
        </v-menu>

        <v-icon @click="nextDate">mdi-arrow-right-circle</v-icon>
      </div>
      <div v-else>{{ displayDate }}</div>
    </div>
    <duty-dispatcher :date="date" />
    <div class="time--zone--container">
      <div v-for="zone of timeZones" :key="zone.title" class="time--zone">{{ zone.title }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import dutyDispatcher from './dutyDispatcher'

export default {
  props: ['date'],
  data: () => ({
    menu: false
  }),
  components: {
    dutyDispatcher
  },
  computed: {
    ...mapGetters(['currentDate', 'timeZones']),
    displayDate() {
      moment.locale('ru')
      return moment(this.date).format('DD MMM YYYY, ddd')
    }
  },
  methods: {
    changeCurrentDate(val) {
      // this.menu = false
      this.$store.commit('setCurrentDate', val)
    },
    prevDate() {
      this.$store.commit(
        'setCurrentDate',
        moment(this.currentDate)
          .add(-1, 'd')
          .format('YYYY-MM-DD')
      )
    },
    nextDate() {
      this.$store.commit(
        'setCurrentDate',
        moment(this.currentDate)
          .add(1, 'd')
          .format('YYYY-MM-DD')
      )
    }
  }
}
</script>

<style scoped>
.date-wrapper {
  border-right: 2px solid red;
}
.date-wrapper:last-of-type {
  border: 0px;
}
.date-header-column-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.current-date {
  padding-left: 1em;
  padding-right: 1em;
  cursor: pointer;
}
.time--zone--container {
  display: flex;
  flex-direction: row;
}
.time--zone {
  width: 25%;
  text-align: center;
  height: 100%;
  font-size: 0.7em;
  color: grey;
}
.personOnDuty {
  text-align: center;
}
</style
>>
