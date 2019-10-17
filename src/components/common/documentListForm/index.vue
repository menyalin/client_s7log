<template>
  <v-container>
    <v-row wrap no-gutters class="list-form-header">
      <v-col>
        <h3>header</h3>
        <v-divider />
      </v-col>
    </v-row>
    <v-row wrap no-gutters class="list-form-body">
      <v-col class="table-elements">
        <app-row-item :fields="fields" :header="true" />
        <app-row-item
          v-for="item of items"
          :key="item.id"
          :header="false"
          :fields="fields"
          :item="item"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import appRowItem from './rowItem'

export default {
  props: ['items', 'fields'],
  components: {
    appRowItem
  }
}
</script>
<style scoped>
.table-elements {
  background-color: white;
}
.item-row {
  width: 100%;
  display: grid;
  grid-auto-flow: column;
}
</style>