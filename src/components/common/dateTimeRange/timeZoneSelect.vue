<template>
  <v-select
    hide-details
    class="mt-0 pt-0"
    :items="timeZones"
    :value="propTime"
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
    propTime: String
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
