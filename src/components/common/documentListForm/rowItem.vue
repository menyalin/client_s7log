<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row :class="rowClasses" dense no-gutters @click="clickHandler">
      <v-col :cols="field.cols" v-for="field of fields" :key="field.data">{{
        header ? field.title : item[field.data]
      }}</v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'ItemRow',
  props: ['fields', 'header', 'item'],
  computed: {
    rowClasses() {
      let classes = ['rowWrapper']
      if (this.header) {
        classes.push('header')
        classes.push('subtitle-2')
      } else {
        classes.push('body-2')
      }
      return classes
    }
  },
  methods: {
    clickHandler() {
      console.log('click handler')
    }
  }
}
</script>
<style scoped>
.rowWrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  border-bottom: 1px solid;
}
.column {
  padding: 3px;
  width: 150px;
  background-color: aliceblue;
}
.header {
  background-color: rgb(250, 250, 250);
  padding: 0px;
  margin: 0px;
}
</style>
