<template>
  <div class="date-header-column-wrapper">
    <div v-if="date===currentDate">
      <v-icon @click="prevDate">mdi-arrow-left-circle</v-icon>
      <span class="current-date">
        <strong>{{ date }}</strong>
      </span>
      <v-icon @click="nextDate">mdi-arrow-right-circle</v-icon>
    </div>
    <div v-else>{{ date }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  props: ['date', 'header'],
  computed: {
    ...mapGetters(['currentDate'])
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
  height: 100%;
}
.current-date {
  padding-left: 1em;
  padding-right: 1em;
}
</style>>
