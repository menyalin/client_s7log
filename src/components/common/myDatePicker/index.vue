<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="true"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :label="label"
        :value="textFielValue"
        readonly
        :clearable="isClearable"
        @click:clear="reset"
        hide-details
        v-on="on"
        append-icon="mdi-calendar-text-outline"
      ></v-text-field>
    </template>
    <v-date-picker
      no-title
      :max="max"
      :min="min"
      :value="propDate"
      scrollable
      @click:date="clickDateHandler"
      first-day-of-week="1"
      color="primary"
    ></v-date-picker>
  </v-menu>
</template>
<script>
export default {
  model: {
    prop: 'propDate',
    event: 'change'
  },
  props: {
    propDate: String,
    isClearable: {
      type: Boolean,
      default: true
    },
    label: String,
    max: String,
    min: String
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false
  }),
  methods: {
    clickDateHandler(date) {
      this.$emit('change', date)
      this.menu = false
    },
    reset() {
      this.$emit('change', '')
    }
  },
  computed: {
    textFielValue() {
      if (this.propDate) {
        let tmpDate = new Date(this.propDate).toLocaleDateString()
        return tmpDate
      } else return ''
    }
  }
}
</script>
