<template>
  <div class="date-wrapper">
    <div class="date-header-column-wrapper">
      <div class="arrow-wrapper">
        <date-shifter
          v-if="isFirst"
          direction="left"
          :clickHandler="prevDate"
          :changeCurrentDate="changeCurrentDate"
        />
      </div>
      <div :class="{ today: isToday }">
        {{ displayDate }}
      </div>
      <div class="arrow-wrapper">
        <date-shifter
          v-if="isLast"
          direction="right"
          :clickHandler="nextDate"
          :changeCurrentDate="changeCurrentDate"
        />
      </div>
    </div>
    <duty-dispatcher :date="date" />
    <div class="time--zone--container">
      <div v-for="zone of timeZones" :key="zone.title" class="time--zone">
        {{ zone.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import dutyDispatcher from './dutyDispatcher'
import dateShifter from './dateShifter'

export default {
  props: ['date', 'isFirst', 'isLast'],
  data: () => ({}),
  components: {
    dutyDispatcher,
    dateShifter
  },
  computed: {
    ...mapGetters(['currentDate', 'timeZones']),
    displayDate() {
      moment.locale('ru')
      return moment(this.date).format('DD MMM YYYY, ddd')
    },
    isToday() {
      return moment().isSame(this.date, 'date')
    }
  },
  methods: {
    changeCurrentDate(val) {
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
  border-bottom: 2px solid red;
}
.date-wrapper:last-of-type {
  border: 0px;
  border-bottom: 2px solid red;
}
.date-header-column-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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
.today {
  font-weight: 700;
  color: red;
}
.arrow-wrapper {
  width: 13%;
}
.personOnDuty {
  text-align: center;
}</style
>>
