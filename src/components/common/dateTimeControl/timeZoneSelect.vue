<template>
  <v-select
    hide-details
    :disabled="disabled"
    :items="timeZones"
    :value="propTime"
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
    disabled: Boolean
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
