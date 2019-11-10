<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters>
      <v-col cols="12" sm="2" md="2" lg="1">
        <app-side-bar />
      </v-col>
      <v-col>
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import appSideBar from './sideBar'

export default {
  components: {
    appSideBar
  }
}
</script>
<style scoped></style>
