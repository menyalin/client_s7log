<template>
  <div class="wrapper">
    <div class="date">
      <date-picker
        :label="label"
        hide-details
        :dense="dense"
        v-model="res.date"
        @change="changeHandler($event, 'date')"
      />
    </div>
    <div class="time">
      <time-input
        hide-details
        :dense="dense"
        v-model="res.time"
        :disabled="!res.date"
        @change="changeHandler($event, 'time')"
      />
    </div>
  </div>
</template>

<script>
import datePicker from '@/components/common/myDatePicker'
import timeInput from '@/components/common/timeInput'
import moment from 'moment'

export default {
  name: 'dateTimeControl',
  model: {
    prop: 'inputDate',
    event: 'change'
  },
  components: {
    datePicker,
    timeInput
  },
  props: {
    inputDate: [String, null],
    label: {
      type: String
    },
    dense: {
      type: Boolean
    }
  },
  data: () => ({
    res: {
      date: '',
      time: ''
    }
  }),
  watch: {
    inputDate: function(val) {
      this.initDate(val)
    }
  },
  computed: {
    isValidDate() {
      if (!!this.res.date) {
        return moment(`${this.res.date}`)._isValid
      } else return false
    },
    resultStr() {
      if (this.res.date) {
        return moment(
          this.res.date +
            (this.res.time && this.res.time.length == 5
              ? ` ${this.res.time}`
              : '')
        ).format('YYYY-MM-DD HH:mm')
      } else return ''
    }
  },
  methods: {
    changeHandler(val, field) {
      this.res[field] = val
      this.$emit('change', this.resultStr)
    },
    resetValue() {
      this.res = Object.assign({}, { date: '', time: '' })
    },
    setDate(val) {
      // принимаем только moment объект
      this.res = Object.assign(
        {},
        { date: val.format('YYYY-MM-DD'), time: val.format('HH:mm') }
      )
    },
    initDate(input) {
      if (!input) {
        this.resetValue()
      } else if (!!+input) {
        this.setDate(moment(+input))
      } else if (moment(input)._isValid) {
        this.setDate(moment(input))
      } else this.resetValue()
    }
  },
  mounted() {
    this.initDate(this.inputDate)
  }
}
</script>

<style scoped>
.wrapper {
  padding-top: 0.7em;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.time {
  padding-left: 1em;
  max-width: 5rem;
}
.date {
  width: 100%;
}
</style>
