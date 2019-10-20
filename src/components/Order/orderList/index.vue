<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row wrap>
      <v-col cols="12">
        <draggable v-model="items" @change="onChange" class="newOrderContainer">
          <div class="block1" v-for="(item, i) in items" :key="i">{{ item }}</div>
        </draggable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  methods: {
    onChange(e) {
      // console.log(e)
    }
  },
  data: () => ({
    items: [
      'item1',
      'item2',
      'item3',
      'item4',
      'item5',
      'item6',
      'item7',
      'item8'
    ]
  }),
  components: {
    draggable
  }
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