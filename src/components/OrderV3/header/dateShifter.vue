<template>
  <div class="icons-container" :class="{ reverse: direction === 'right' }">
    <v-menu v-model="menu" :close-on-content-click="false" max-width="290">
      <template v-slot:activator="{ on }">
        <v-icon color="red" v-on="on" small>
          mdi-arrow-collapse-{{ direction }}
        </v-icon>
        <v-icon color="red" @click="clickHandler">
          mdi-arrow-{{ direction }}
        </v-icon>
      </template>
      <v-date-picker
        @change="changeCurrentDate"
        first-day-of-week="1"
        color="primary"
        no-title
      />
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'dateShifter',
  props: ['direction', 'clickHandler', 'changeCurrentDate'],
  data: () => ({
    menu: false
  })
}
</script>

<style scoped>
.icons-container {
  display: flex;
  flex-direction: row;
}
.reverse {
  flex-direction: row-reverse;
}
</style>
