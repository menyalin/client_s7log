<template>
  <v-select
    hide-details
    :items="timeZones"
    :value="propTime"
    :disabled="disabled"
    append-icon="mdi-clock-outline"
    @change="changeHandler"
    item-value="startTime"
    item-text="title"
  />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'timeZoneSelect',
  model: {
    prop: 'propTime',
    event: 'change'
  },
  props: {
    propTime: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['timeZones'])
  },
  methods: {
    changeHandler(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style></style>
