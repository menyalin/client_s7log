<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog" max-width="650" persistent @keydown.esc="cancelHandler">
          <car-unit-form
            v-model="editedItem"
            @cancel_edit="cancelHandler"
            @createCarUnit="createNewCarUnit"
            @updateCarUnit="updateCarUnit"
            @deleteCarUnit="deleteCarUnit"
          />
        </v-dialog>
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
            'items-per-page-options': [50, 100]
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
                <v-col>
                  <filters v-model="filterObject" />
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:item.dateRange="{ item }">
            {{
            item.dateRange | dateRangeToStr
            }}
          </template>
          <template v-slot:item.truckId="{ item }">
            {{
            carById(item.truckId) ? carById(item.truckId).title : null
            }}
          </template>
          <template v-slot:item.trailerId="{ item }">
            {{
            carById(item.trailerId) ? carById(item.trailerId).title : null
            }}
          </template>
          <template v-slot:item.driver1Id="{ item }">
            {{
            driverById(item.driver1Id)
            ? driverById(item.driver1Id).shortName
            : null
            }}
          </template>
          <template v-slot:item.driver2Id="{ item }">
            {{
            driverById(item.driver2Id)
            ? driverById(item.driver2Id).shortName
            : null
            }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import carUnitForm from './carUnitForm'
import filters from './filters'
import {
  carUnitsPageQuery,
  createCarUnitMutation,
  updateCarUnitMutation,
  deleteCarUnitMutation
} from '@/gql/cars'
import { mapGetters } from 'vuex'

export default {
  name: 'CarUnitList',
  components: {
    carUnitForm,
    filters
  },
  computed: {
    ...mapGetters(['carById', 'driverById']),
    variablesForQuery() {
      return {
        limit: this.options.itemsPerPage || this.limit,
        offset: this.options.itemsPerPage * (this.options.page - 1) || 0,
        driver: this.filterObject.driver || null,
        truckId: this.filterObject.truckId || null,
        trailerId: this.filterObject.trailerId || null,
        date: this.filterObject.date || null
      }
    }
  },
  data: () => ({
    dialog: false,
    filterObject: {},
    editedItem: {},
    limit: 50,
    carUnitsPage: {
      carUnits: [],
      count: 0
    },
    options: {},
    headers: [
      { text: 'Дата', value: 'dateRange', sortable: false },
      { text: 'Машина', value: 'truckId', sortable: false },
      { text: 'Прицеп', value: 'trailerId', sortable: false },
      { text: 'Водитель 1', value: 'driver1Id', sortable: false },
      { text: 'Водитель 2', value: 'driver2Id', sortable: false },
      { text: 'Примечание', value: 'note', sortable: false }
    ]
  }),
  methods: {
    cancelHandler() {
      this.editedItem = Object.assign({}, {})
      this.$nextTick(() => {
        this.dialog = false
      })
    },
    newItemHandler() {
      this.editedItem = Object.assign(
        {},
        {
          truckId: '',
          driver1Id: ''
        }
      )
      this.$nextTick(() => {
        this.dialog = true
      })
    },
    clickRowHandler(item) {
      this.editedItem = Object.assign({}, item)
      this.$nextTick(() => {
        this.dialog = true
      })
    },
    createNewCarUnit() {
      this.$apollo
        .mutate({
          mutation: createCarUnitMutation,
          variables: this.editedItem,
          update: (store, { data: { createCarUnit } }) => {
            const data = store.readQuery({
              query: carUnitsPageQuery,
              variables: this.variablesForQuery
            })
            data.carUnitsPage.carUnits.unshift(createCarUnit)
            data.carUnitsPage.count += 1
            store.writeQuery({ query: carUnitsPageQuery, data })
          }
        })
        .then(this.cancelHandler())
        .catch(e => {
          this.$store.dispatch('setError', e.message)
        })
    },
    updateCarUnit() {
      this.$apollo
        .mutate({
          mutation: updateCarUnitMutation,
          variables: this.editedItem,
          update: (store, { data: { updateCarUnit } }) => {
            const data = store.readQuery({
              query: carUnitsPageQuery,
              variables: this.variablesForQuery
            })
            let updatedCarUnit = data.carUnitsPage.carUnits.find(
              item => item.id === updateCarUnit.id
            )
            updatedCarUnit = updateCarUnit
            store.writeQuery({ query: carUnitsPageQuery, data })
          }
        })
        .then(this.cancelHandler())
        .catch(e => {
          this.$store.dispatch('setError', e.message)
        })
    },
    deleteCarUnit() {
      this.$apollo
        .mutate({
          mutation: deleteCarUnitMutation,
          variables: this.editedItem,
          update: (store, { data: { deleteCarUnit } }) => {
            const data = store.readQuery({
              query: carUnitsPageQuery,
              variables: this.variablesForQuery
            })
            data.carUnitsPage.carUnits.splice(
              data.carUnitsPage.carUnits.findIndex(
                item => item.id === deleteCarUnit
              ),
              1
            )
            data.carUnitsPage.count -= 1
          }
        })
        .then(this.cancelHandler())
        .catch(e => {
          this.$store.dispatch('setError', e.message)
        })
    }
  },
  apollo: {
    carUnitsPage: {
      query: carUnitsPageQuery,
      variables() {
        return this.variablesForQuery
      }
    }
  }
}
</script>

<style></style>
