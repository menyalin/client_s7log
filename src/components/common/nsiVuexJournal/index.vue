<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          class="elevation-1"
          :items="items"
          :items-per-page="limit"
          :headers="headers"
          dense
          align="center"
          @click:row="clickRowHandler"
          :footer-props="{
            'items-per-page-options': [50, 100, -1]
          }"
        >
          <template v-slot:top>
            <v-container fluid>
              <v-row align="center">
                <v-col cols="auto">
                  <v-btn color="secondary" dark @click="newItemHandler">
                    <v-icon>mdi-plus</v-icon>Добавить
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NSIJournal',
  data: () => ({
    limit: 50
  }),
  props: {
    clickRowHandler: {
      type: Function
    },
    newItemHandler: {
      type: Function,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    }
  }
}
</script>

<style></style>
