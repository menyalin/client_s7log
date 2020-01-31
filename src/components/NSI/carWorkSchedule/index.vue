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
          <template
            v-slot:item.car="{ item }"
          >{{ carById(item.carId) ? carById(item.carId).title : 'Не найден' }}</template>
          <template v-slot:item.startDate="{ item }">{{ dateRender(item.dateRange, 0) }}</template>
          <template v-slot:item.endDate="{ item }">{{ dateRender(item.dateRange, 1) }}</template>
          <template v-slot:item.type="{ item }">{{ carWorkScheduleTypeById(item.type).title }}</template>
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

const createCarWorkScheduleMutation = gql`
  mutation createCarWorkSchedule(
    $type: CarWorkScheduleType!
    $carId: String!
    $title: String
    $dateRange: String!
    $note: String
  ) {
    createCarWorkSchedule(
      type: $type
      carId: $carId
      title: $title
      dateRange: $dateRange
      note: $note
    ) {
      id
      type
      note
      dateRange {
        value
        inclusive
      }
      carId
    }
  }
`
const updateCarWorkScheduleMutation = gql`
  mutation updateCarWorkSchedule(
    $id: ID!
    $type: CarWorkScheduleType!
    $title: String
    $carId: String!
    $dateRange: String!
    $note: String
  ) {
    updateCarWorkSchedule(
      id: $id
      type: $type
      title: $title
      carId: $carId
      dateRange: $dateRange
      note: $note
    ) {
      id
      type
      title
      note
      dateRange {
        value
        inclusive
      }
      carId
    }
  }
`
const deleteCarWorkScheduleMutation = gql`
  mutation deleteCarWorkSchedule($id: ID!) {
    deleteCarWorkSchedule(id: $id)
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
      { text: 'Заголовок', value: 'title', align: 'center' },
      { text: 'Начало', value: 'startDate', align: 'center' },
      { text: 'Конец', value: 'endDate', align: 'center' },
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
          variables: this.queryVariables
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
          variables: this.queryVariables
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
          variables: this.editedSchedule
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
  }
}
</script>

<style></style>
