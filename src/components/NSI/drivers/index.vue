<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          class="elevation-1"
          :items="driversForJournal(onlyActive)"
          :headers="headers"
          :search="search"
          dense
          multi-sort
          :sort-by="['isActive', 'fullName']"
          :sort-desc="[true, false]"
          align="center"
          @click:row="clickRowHandler"
          :footer-props="{
            'items-per-page-options': [50, 100, -1]
          }"
        >
          <template v-slot:item.isActive="{ item }">
            <div>
              <v-icon color="green" v-if="!!item.isActive">mdi-check</v-icon>
              <v-icon color="grey" v-else>mdi-minus</v-icon>
            </div>
          </template>
          <template v-slot:top>
            <v-container fluid>
              <v-row align="center">
                <v-col cols="auto">
                  <v-btn color="secondary" dark @click="newDriver">
                    <v-icon>mdi-plus</v-icon>Добавить
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-checkbox
                    v-model="onlyActive"
                    label="Активные"
                    hide-details
                  />
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
        </v-data-table>
        <v-dialog
          v-model="dialog"
          max-width="700px"
          persistent
          @keydown.esc="cancelHandler"
        >
          <driver-edit-form
            :item="editedDriver"
            @cancel="cancelHandler"
            @keydown.esc="cancelHandler"
            @save="saveHandler"
            @delete-item="deleteHandler"
          />
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import driverEditForm from './driverEditForm'
import {
  createDriverMutation,
  updateDriverMutation,
  deleteDriverMutation
} from '@/gql/drivers'
import { mapGetters } from 'vuex'

export default {
  name: 'NSIDriversComponent',
  data: () => ({
    dialog: false,
    search: '',
    onlyActive: true,
    editedDriver: {},
    headers: [
      { value: 'fullName', text: 'Имя (полное)' },
      { value: 'shortName', text: 'Имя (сокращенное)' },
      { value: 'phone1', text: 'Телефон 1', sortable: false },
      { value: 'phone2', text: 'Телефон 2', sortable: false },
      { value: 'passport', text: 'Паспорт', sortable: false },
      { value: 'driversLicense', text: 'Вод. удостоверение', sortable: false },
      { value: 'note', text: 'Примечание', sortable: false },
      { value: 'isActive', text: 'isActive' }
    ]
  }),
  components: {
    driverEditForm
  },
  computed: {
    ...mapGetters(['drivers', 'driversForJournal'])
  },
  methods: {
    newDriver() {
      this.dialog = true
    },
    clickRowHandler(item) {
      this.editedDriver = Object.assign({}, item)
      this.$nextTick(() => {
        this.dialog = true
      })
    },
    saveHandler(isNewItem) {
      let mutation = ''
      if (isNewItem) mutation = createDriverMutation
      else mutation = updateDriverMutation
      this.$apollo
        .mutate({
          mutation,
          variables: this.editedDriver
        })
        .catch(e => {
          this.$store.dispatch('setError', e.message)
        })
        .then(() => {
          this.cancelHandler()
        })
    },
    async deleteHandler() {
      const res = await this.$confirm('Вы уверены? Отменить будет нельзя!', {
        title: 'Удаление записи'
      })
      if (res) {
        this.$apollo
          .mutate({
            mutation: deleteDriverMutation,
            variables: this.editedDriver
          })
          .catch(e => {
            this.$store.dispatch('setError', e.message)
          })
          .then(() => {
            this.cancelHandler()
          })
      }
    },
    cancelHandler() {
      this.editedDriver = Object.assign({})
      this.$nextTick(() => {
        this.dialog = false
      })
    }
  }
}
</script>

<style></style>
