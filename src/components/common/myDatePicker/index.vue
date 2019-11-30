<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="true"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :label="label"
        :value="textFielValue"
        readonly
        clearable
        @click:clear="reset"
        hide-details
        v-on="on"
        class="mt-0 pt-0"
        append-icon="mdi-calendar-text-outline"
      ></v-text-field>
    </template>
    <v-date-picker
      no-title
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
  props: ['label', 'propDate'],
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
      this.$emit('change', undefined)
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
