<template>
  <v-container fluid>
    <v-row>
      <v-col class="nav-list" cols="12" sm="12" md="3" lg="2" xl="2">
        <app-side-bar />
      </v-col>
      <v-col class="orders-content">
        <router-view></router-view>
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
