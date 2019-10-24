<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row wrap>
      <v-col cols="12" class="pa-0 ma-0">
        <app-not-confirmed-orders />
        <app-car-row />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import appCarRow from './carRow'
import appNotConfirmedOrders from './notConfirmedOrders'

export default {
  methods: {},

  components: {
    appCarRow,
    appNotConfirmedOrders
  },
  data: () => ({})
}
</script>

<style>
.newOrderContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.block1 {
  height: 100px;
  width: 100px;
  padding: 5px;
  margin: 5px;
  border: 1px slateblue solid;
}
</style>
