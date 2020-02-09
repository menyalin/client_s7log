<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          class="elevation-1"
          :items="carUnitsPage.carUnits"
          :items-per-page="limit"
          :headers="headers"
          :options.sync="options"
          :server-items-length="carUnitsPage.count"
          :loading="$apollo.loading"
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
import { carUnitsPageQuery } from '@/gql/cars'

export default {
  name: 'CarUnitList',
  data: () => ({
    dialog: false,
    limit: 50,
    carUnitsPage: {
      carUnits: [],
      count: 0
    },
    options: {},
    headers: [
      { text: 'Дата', value: 'startDate' },
      { text: 'Машина', value: 'truckId' },
      { text: 'Прицеп', value: 'trailerId' },
      { text: 'Водитель 1', value: 'driverId1' },
      { text: 'Водитель 2', value: 'driverId2' },
      { text: 'Примечание', value: 'note' }
    ]
  }),
  methods: {
    newItemHandler() {
      console.log(this.options)
    },
    clickRowHandler(item) {
      console.log(item)
    }
  },
  apollo: {
    carUnitsPage: {
      query: carUnitsPageQuery,
      variables() {
        return {
          limit: this.options.itemsPerPage,
          offset: this.options.itemsPerPage * (this.options.page - 1)
        }
      }
    }
  }
}
</script>

<style></style>
