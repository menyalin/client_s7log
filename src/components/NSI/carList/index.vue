<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          class="elevation-1"
          :items="carsForJournal"
          :headers="headers"
          dense
          :sort-by="['isActive', 'type', 'listItem']"
          :sort-desc="[true, false, false]"
          multi-sort
          :search="search"
          @click:row="clickRowHandler"
          :footer-props="{
            'items-per-page-options': [40, 80, 120, -1]
          }"
        >
          <template v-slot:top>
            <v-container fluid>
              <v-row align="center">
                <v-col cols="auto">
                  <v-btn color="secondary" dark @click="newCarHandler">
                    <v-icon>mdi-plus</v-icon>Добавить
                  </v-btn>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-search"
                    label="Поиск"
                    single-line
                    hide-details
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template v-slot:item.isOwned="{ item }">
            <div>
              <v-icon color="green" v-if="!!item.isOwned">mdi-check</v-icon>
              <v-icon color="grey" v-else>mdi-minus</v-icon>
            </div>
          </template>
          <template v-slot:item.isActive="{ item }">
            <div>
              <v-icon color="green" v-if="!!item.isActive">mdi-check</v-icon>
              <v-icon color="grey" v-else>mdi-minus</v-icon>
            </div>
          </template>
        </v-data-table>
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <car-edit-form
            v-model="editedItem"
            @cancelEdit="cancelHandler"
            @createSchedule="createCarHandler"
            @updateSchedule="updateCarHandler"
            @deleteCarWorkSchedule="deleteCarHandler"
          />
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import carEditForm from './carEditForm'
import { createCarMutation, updateCarMutation } from '@/gql/cars'
import { mapGetters } from 'vuex'
export default {
  name: 'CarList',
  components: {
    carEditForm
  },
  data: () => ({
    dialog: false,
    search: '',
    editedItem: {},
    headers: [
      { text: 'isActive', value: 'isActive' },
      { text: 'Тип', value: 'type' },
      { text: 'Заголовок', value: 'title' },
      { text: '№ списке', value: 'listItem', align: 'center' },
      { text: 'Собственная', value: 'isOwned', align: 'center' },
      { text: 'Кол-во плт', value: 'maxPltCount', align: 'center' },
      { text: 'Гос.номер', value: 'regNumber' },
      { text: 'Св-во регистрации', value: 'reg' },
      { text: 'ПТС', value: 'pts' },
      { text: 'Примечание', value: 'note' }
    ]
  }),
  computed: {
    ...mapGetters(['carsForJournal'])
  },
  methods: {
    cancelHandler() {
      this.editedItem = Object.assign({})
      this.$nextTick(() => {
        this.dialog = false
      })
    },
    clickRowHandler(item) {
      this.dialog = true
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, item)
      })
    },
    createCarHandler() {
      this.$apollo
        .mutate({
          mutation: createCarMutation,
          variables: this.editedItem
        })
        .then(() => {
          this.cancelHandler()
        })
        .catch(e => {
          this.$store.dispatch('setError', e.message)
          this.cancelHandler()
        })
    },
    updateCarHandler() {
      this.$apollo
        .mutate({
          mutation: updateCarMutation,
          variables: this.editedItem
        })
        .then(() => {
          this.cancelHandler()
        })
        .catch(e => {
          this.$store.dispatch('setError', e.message)
          this.cancelHandler()
        })
    },
    deleteCarHandler() {},
    newCarHandler() {
      this.dialog = true
    }
  }
}
</script>

<style></style>
