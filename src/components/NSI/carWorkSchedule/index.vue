<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          class="elevation-1"
          :items="carWorkSchedule"
          :items-per-page="limit"
          :headers="headers"
          dense
          align="center"
          @click:row="clickRowHandler"
          :footer-props="{
            'items-per-page-options': [15, 30, 50, -1]
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
            {{ carById(item.carId) ? carById(item.carId).title : 'Не найден' }}
          </template>
          <template v-slot:item.startDate="{ item }">
            {{ dateForRender(item.startDate) }}
          </template>
          <template v-slot:item.endDate="{ item }">
            {{ dateForRender(item.endDate) }}
          </template>
          <template v-slot:item.startTime="{ item }">
            {{ timeZoneById(item.startTime).title }}
          </template>
          <template v-slot:item.endTime="{ item }">
            {{ timeZoneById(item.endTime).title }}
          </template>
          <template v-slot:item.type="{ item }">
            {{ carWorkScheduleTypeById(item.type).title }}
          </template>
        </v-data-table>
        <v-dialog v-model="dialog" max-width="1024px">
          <car-work-schedule-form
            v-model="editedSchedule"
            @cancelEdit="cancelHandler"
            @createSchedule="createScheduleHandler"
            @updateSchedule="updateScheduleHandler"
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

const createCarWorkScheduleMutation = gql`
  mutation createCarWorkSchedule(
    $type: CarWorkScheduleType!
    $carId: String!
    $startDate: String!
    $startTime: String!
    $endDate: String!
    $endTime: String!
    $note: String
  ) {
    createCarWorkSchedule(
      type: $type
      carId: $carId
      startDate: $startDate
      startTime: $startTime
      endDate: $endDate
      endTime: $endTime
      note: $note
    ) {
      id
      type
      note
      startDate
      startTime
      endDate
      endTime
      carId
    }
  }
`
const updateCarWorkScheduleMutation = gql`
  mutation updateCarWorkSchedule(
    $id: ID!
    $type: CarWorkScheduleType!
    $carId: String!
    $startDate: String!
    $startTime: String!
    $endDate: String!
    $endTime: String!
    $note: String
  ) {
    updateCarWorkSchedule(
      id: $id
      type: $type
      carId: $carId
      startDate: $startDate
      startTime: $startTime
      endDate: $endDate
      endTime: $endTime
      note: $note
    ) {
      id
      type
      note
      startDate
      startTime
      endDate
      endTime
      carId
    }
  }
`

export default {
  name: 'carWorkSchedule',
  components: {
    carWorkScheduleForm
  },
  data: () => ({
    dialog: false,
    editedSchedule: {},
    headers: [
      { text: 'id', value: 'id', align: 'center' },
      { text: 'Машина', value: 'car', align: 'center' },
      { text: 'Тип', value: 'type', align: 'center' },
      { text: 'День начала', value: 'startDate', align: 'center' },
      { text: 'Время начала', value: 'startTime', align: 'center' },
      { text: 'День завершение', value: 'endDate', align: 'center' },
      { text: 'Время завершения', value: 'endTime', align: 'center' },
      { text: 'Комментарий', value: 'note', align: 'center' }
    ],
    limit: 30
  }),
  computed: {
    ...mapGetters([
      'carWorkSchedule',
      'carById',
      'timeZoneById',
      'carWorkScheduleTypeById'
    ])
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
          variables: this.editedSchedule
        })
        .then(() => {
          this.cancelHandler()
        })
        .catch(e => {
          this.$store.commit('setError', e.message)
        })
    },
    updateScheduleHandler() {
      this.$apollo
        .mutate({
          mutation: updateCarWorkScheduleMutation,
          variables: this.editedSchedule
        })
        .then(() => {
          this.cancelHandler()
        })
        .catch(e => {
          this.$store.commit('setError', e.message)
        })
    },
    dateForRender(date) {
      moment.locale('ru')
      return moment(date).format('DD MMM YYYY, ddd')
    },
    clickRowHandler(item) {
      this.editedSchedule = Object.assign({}, item)
      this.$nextTick(() => {
        this.dialog = true
      })
    },
    newCarWorkSchedule() {
      this.dialog = true
    }
  }
}
</script>

<style></style>
