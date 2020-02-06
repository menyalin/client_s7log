<template>
  <div class="wrapper">
    <div class="date">
      <v-text-field :label="label" hide-details />
    </div>
    <div class="time">
      <v-text-field hide-details />
    </div>
  </div>
</template>

<script>
export default {
  name: 'dateTimeControl',
  props: {
    label: {
      type: String
    },
    dense: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.time {
  padding-left: 1em;
  max-width: 4rem;
}
.date {
  width: 100%;
}
</style>
