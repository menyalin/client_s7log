<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          class="elevation-1"
          :loading="$apollo.loading"
          :options.sync="options"
          :items="carWorkSchedulePage.carWorkSchedule"
          :server-items-length="carWorkSchedulePage.count"
          :items-per-page="limit"
          :headers="headers"
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
                  <v-btn color="secondary" dark @click="newCarWorkSchedule">
                    <v-icon>mdi-plus</v-icon>Добавить
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:item.car="{ item }">
            {{ carById(item.carId) ? carById(item.carId).title : '' }}
          </template>
          <template v-slot:item.trailer="{ item }">
            {{ carById(item.trailerId) ? carById(item.trailerId).title : '' }}
          </template>
          <template v-slot:item.driver="{ item }">
            {{
              driverById(item.driverId)
                ? driverById(item.driverId).shortName
                : ''
            }}
          </template>
          <template v-slot:item.startDate="{ item }">{{
            dateRender(item.dateRange, 0)
          }}</template>
          <template v-slot:item.endDate="{ item }">{{
            dateRender(item.dateRange, 1)
          }}</template>
          <template v-slot:item.type="{ item }">{{
            carWorkScheduleTypeById(item.type).title
          }}</template>
        </v-data-table>
        <v-dialog v-model="dialog" max-width="1024px" persistent>
          <car-work-schedule-form
            v-model="editedSchedule"
            @cancelEdit="cancelHandler"
            @createSchedule="createScheduleHandler"
            @updateSchedule="updateScheduleHandler"
            @deleteCarWorkSchedule="deleteCarWorkScheduleHandler"
          />
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import carWorkScheduleForm from './carWorkScheduleForm'
import { mapGetters } from 'vuex'
import gql from 'graphql-tag'
import {
  createCarWorkScheduleMutation,
  updateCarWorkScheduleMutation,
  deleteCarWorkScheduleMutation,
  carWorkSchedulePagesQuery
} from '@/gql/cars'

export default {
  name: 'carWorkSchedule',
  components: {
    carWorkScheduleForm
  },
  data: () => ({
    dialog: false,
    editedSchedule: {},
    carWorkSchedulePage: {
      count: 0,
      carWorkSchedule: []
    },
    options: {},
    headers: [
      { text: 'Начало', value: 'startDate', align: 'center' },
      { text: 'Конец', value: 'endDate', align: 'center' },
      { text: 'Тип', value: 'type', align: 'center' },
      { text: 'Заголовок', value: 'title', align: 'center' },
      { text: 'Машина', value: 'car', align: 'center' },
      { text: 'Прицеп', value: 'trailer', align: 'center' },
      { text: 'Водитель', value: 'driver', align: 'center' },
      { text: 'Комментарий', value: 'note', align: 'center' }
    ],
    limit: 50
  }),
  computed: {
    ...mapGetters([
      'carWorkSchedule',
      'carById',
      'timeZoneById',
      'carWorkScheduleTypeById',
      'driverById'
    ]),
    queryVariables() {
      return {
        ...this.editedSchedule
      }
    }
  },
  methods: {
    cancelHandler() {
      this.editedSchedule = Object.assign({})
      this.$nextTick(() => {
        this.dialog = false
      })
    },
    createScheduleHandler() {
      this.$apollo
        .mutate({
          mutation: createCarWorkScheduleMutation,
          variables: this.queryVariables,
          update: (store, { data: { createCarWorkSchedule } }) => {
            const data = store.readQuery({
              query: carWorkSchedulePagesQuery,
              variables: {
                limit: this.options.itemsPerPage || this.limit,
                offset: this.options.itemsPerPage * (this.options.page - 1) || 0
              }
            })
            data.carWorkSchedulePage.carWorkSchedule.unshift(
              createCarWorkSchedule
            )
            data.carWorkSchedulePage.count += 1
            store.writeQuery({ query: carWorkSchedulePagesQuery, data })
          }
        })
        .then(() => {
          this.cancelHandler()
        })
        .catch(e => {
          this.$store.dispatch('setError', e.message)
        })
    },
    updateScheduleHandler() {
      this.$apollo
        .mutate({
          mutation: updateCarWorkScheduleMutation,
          variables: this.queryVariables,
          update: (store, { data: { updateCarWorkSchedule } }) => {
            const data = store.readQuery({
              query: carWorkSchedulePagesQuery,
              variables: {
                limit: this.options.itemsPerPage || this.limit,
                offset: this.options.itemsPerPage * (this.options.page - 1) || 0
              }
            })
            let updatedCarWorkSchedule = data.carWorkSchedulePage.carWorkSchedule.find(
              item => item.id === updateCarWorkSchedule.id
            )
            updatedCarWorkSchedule = Object.assign({}, updateCarWorkSchedule)
          }
        })
        .then(() => {
          this.cancelHandler()
        })
        .catch(e => {
          this.$store.commit('setError', e.message)
        })
    },
    clickRowHandler(item) {
      this.dialog = true
      this.$nextTick(() => {
        this.editedSchedule = Object.assign({}, item)
      })
    },
    newCarWorkSchedule() {
      this.dialog = true
    },
    deleteCarWorkScheduleHandler() {
      this.$apollo
        .mutate({
          mutation: deleteCarWorkScheduleMutation,
          variables: this.editedSchedule,
          update: (store, { data: { deleteCarWorkSchedule } }) => {
            const data = store.readQuery({
              query: carWorkSchedulePagesQuery,
              variables: {
                limit: this.options.itemsPerPage,
                offset: this.options.itemsPerPage * (this.options.page - 1)
              }
            })
            data.carWorkSchedulePage.carWorkSchedule.splice(
              data.carWorkSchedulePage.carWorkSchedule.findIndex(
                item => item.id === deleteCarWorkSchedule
              ),
              1
            )
            data.carWorkSchedulePage.count = data.carWorkSchedulePage.count - 1
          }
        })
        .then(this.cancelHandler())
        .catch(e => {
          this.$store.dispatch('setError', e.message)
        })
    },
    dateRender(dateRange, pos) {
      // pos 0- Начало диапазона, 1 -конец диапазона
      if (Array.isArray(dateRange) && dateRange.length === 2) {
        return moment(+dateRange[pos].value).format('DD.MM.YYYY, HH:mm')
      } else return ''
    }
  },
  apollo: {
    carWorkSchedulePage: {
      query: carWorkSchedulePagesQuery,
      variables() {
        return {
          limit: this.options.itemsPerPage || this.limit,
          offset: this.options.itemsPerPage * (this.options.page - 1) || 0
        }
      }
    }
  }
}
</script>

<style></style>
