<template>
  <v-container fluid class="pt-0 pb-0 mt-0 mb-0">
    <v-row>
      <v-col :cols="renderedCols[0]" :sm="renderedCols[1]">
        <date-picker
          :label="startLabel"
          v-model="res._startDate"
          :isClearable="false"
          :max="null"
          @change="changeHandler($event, '_startDate')"
        />
      </v-col>
      <v-col :cols="renderedCols[0] / 2" :sm="renderedCols[1] / 2">
        <time-zone-select
          v-model="res._startTime"
          :disabled="!res._startDate"
          @change="changeHandler($event, '_startTime')"
        />
      </v-col>
      <v-col cols="8" sm="4" v-if="lengthCell === 0">
        <date-picker
          :label="endLabel"
          :isClearable="isOpenRange"
          :min="res._startDate"
          v-model="res._endDate"
          @change="changeHandler($event, '_endDate')"
        />
      </v-col>
      <v-col cols="4" sm="2" v-if="lengthCell === 0">
        <time-zone-select
          :disabled="!res._endDate"
          v-model="res._endTime"
          @change="changeHandler($event, '_endTime')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import datePicker from '@/components/common/myDatePicker'
import timeZoneSelect from './timeZoneSelect'
import moment from 'moment'

export default {
  name: 'dateTimeRangeComponent',
  model: {
    prop: 'propDate',
    event: 'change'
  },
  props: {
    propDate: {
      type: [Array, String],
      default: null
    },
    startLabel: {
      type: String,
      default: 'Начало'
    },
    endLabel: {
      type: String,
      default: 'Конец'
    },
    lengthCell: {
      type: Number,
      default: 0
    },
    isOpenRange: {
      type: Boolean,
      default: false
    }
  },
  components: {
    datePicker,
    timeZoneSelect
  },
  data: () => ({
    res: {
      _startDate: null,
      _startTime: null,
      _endDate: null,
      _endTime: null
    }
  }),
  mounted() {
    this.initDateRange(this.propDate)
  },
  watch: {
    propDate: function(val) {
      this.initDateRange(val)
    },
    lengthCell: function(val) {
      if (val > 0 && this.res._startDate && this.res._startTime) {
        this.updateEndDate(val)
        if (this.isValidStrDate(this.resultStr)) {
          this.$emit('change', this.resultStr)
        }
      }
    }
  },
  computed: {
    renderedCols() {
      if (this.lengthCell === 0) return ['8', '4']
      else return ['8', '8']
    },
    startTime() {
      if (this.res._startTime) {
        return `${this.res._startTime}+03:00`
      } else return '00:00+03:00'
    },
    endTime() {
      if (this.res._endDate) {
        if (this.res._endTime) {
          return `${this.res._endTime}+03:00`
        } else return '00:00+03:00'
      } else return null
    },
    resultStr() {
      if (this.res._startDate && this.isOpenRange && !this.res._endDate) {
        return `[${this.res._startDate} ${this.startTime},]`
      } else if (this.res._startDate && this.res._endDate) {
        return `[${this.res._startDate} ${this.startTime},${this.res._endDate ||
          ''} ${this.endTime || ''}]`
      } else return ''
    }
  },
  methods: {
    initDateRange(val) {
      const dateF = 'YYYY-MM-DD'
      const timeF = 'HH:mm'
      if (Array.isArray(val) && this.isValidArrayDates(val)) {
        this.res._startDate = moment(+val[0].value).format(dateF)
        this.res._startTime = moment(+val[0].value).format(timeF)
        if (val[1].value) {
          this.res._endDate = moment(+val[1].value).format(dateF)
          this.res._endTime = moment(+val[1].value).format(timeF)
        } else if (!this.isOpenRange) {
          this.res._endDate = this.res._startDate
          this.res._endTime = this.res._startTime
        } else {
          this.res._endDate = null
          this.res._endTime = null
        }
        this.$emit('change', this.resultStr)
      } else if (typeof val === 'string' && this.isValidStrDate(val)) {
        const dates = this.parsedDates(val)
        this.res._startDate = moment(dates[1]).format(dateF)
        this.res._startTime = moment(dates[1]).format(timeF)
        if (dates[2]) {
          this.res._endDate = moment(dates[2]).format(dateF)
          this.res._endTime = moment(dates[2]).format(timeF)
        } else if (!this.isOpenRange) {
          this.res._endDate = this.res._startDate
          this.res._endTime = this.res._startTime
        } else {
          this.res._endDate = ''
          this.res._endTime = ''
        }
        this.$emit('change', this.resultStr)
      } else {
        this.res._startDate = ''
        this.res._endDate = ''
        this.res._startTime = ''
        this.res._endTime = ''
        this.$emit('change', this.resultStr)
      }
    },
    isValidStrDate(str) {
      const res = this.parsedDates(str)
      return !!res && res.length === 3
    },
    isValidArrayDates(arr) {
      return true
    },
    parsedDates(str) {
      const regExp = /^\[(2[\d\s-:\+]+),([\d\s-:\+]*)\]$/
      return str.match(regExp)
    },
    updateEndDate(lengthCellVal) {
      let date = moment(this.res._startDate + ' ' + this.res._startTime)
      let i = 1
      while (i < lengthCellVal) {
        date.add(6, 'h')
        i++
      }
      this.res._endDate = date.format('YYYY-MM-DD')
      this.res._endTime = date.format('HH:mm')
    },
    changeHandler(e, label) {
      this.res[label] = e
      if (
        this.res._startDate &&
        this.res._endDate &&
        this.res._endTime &&
        this.res._startTime &&
        this.res._startDate === this.res._endDate &&
        moment(this.res._endTime).isBefore(this.res._startTime)
      ) {
        this.res._endTime = this.res._startTime
      }
      if (
        !this.isOpenRange &&
        this.res._startDate &&
        this.res._startTime &&
        !this.res._endDate
      ) {
        this.updateEndDate(this.lengthCell)
      } else if (
        this.isOpenRange &&
        this.res._endDate &&
        this.res._startDate === this.res._endDate &&
        !this.res._endTime
      ) {
        this.res._endTime = this.res._startTime
      }
      if (this.isValidStrDate(this.resultStr)) {
        this.$emit('change', this.resultStr)
      }
    }
  }
}
</script>
