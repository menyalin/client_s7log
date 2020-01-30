<template>
  <v-container fluid class="pa-0">
    <v-row align="center" no-gutters>
      <v-col cols="8" class="pr-2">
        <slot name="date"></slot>
      </v-col>
      <v-col cols="4">
        <slot name="time"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {}
</script>

<style></style>
