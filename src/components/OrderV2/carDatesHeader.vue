<template>
  <div>
    <div class="date-header-column-wrapper">
      <div v-if="date===currentDate">
        <v-icon @click="prevDate">mdi-arrow-left-circle</v-icon>
        <span class="current-date">
          <strong>{{ displayDate }}</strong>
        </span>
        <v-icon @click="nextDate">mdi-arrow-right-circle</v-icon>
      </div>
      <div v-else>{{ displayDate }}</div>
    </div>
    <div class="personOnDuty">
      <small>{{ personOnDuty(date).manager || 'не задан' }}</small>
    </div>
    <div class="time--zone--container">
      <div v-for="zone of timeZones" :key="zone.title" class="time--zone">{{ zone.title }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  props: ['date', 'header'],
  computed: {
    ...mapGetters(['currentDate', 'timeZones', 'personOnDuty']),
    displayDate() {
      moment.locale('ru')
      return moment(this.date).format('DD MMM YYYY, ddd')
    }
  },
  methods: {
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
.date-header-column-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 150%;
}
.current-date {
  padding-left: 1em;
  padding-right: 1em;
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
</style>>
