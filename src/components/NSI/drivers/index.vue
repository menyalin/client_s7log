<template>
  <div>
    <nsi-vuex-journal
      :items="activeDrivers"
      :clickRowHandler="clickRowHandler"
      :headers="headers"
      :newItemHandler="newDriver"
    />
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
  </div>
</template>

<script>
import nsiVuexJournal from '@/components/common/nsiVuexJournal/index.vue'
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
    editedDriver: {},
    headers: [
      { value: 'fullName', text: 'Имя (полное)' },
      { value: 'shortName', text: 'Имя (сокращенное)' },
      { value: 'phone1', text: 'Телефон 1' },
      { value: 'phone2', text: 'Телефон 2' },
      { value: 'passport', text: 'Паспорт' },
      { value: 'driversLicense', text: 'Вод. удостоверение' },
      { value: 'note', text: 'Примечание' }
    ]
  }),
  components: {
    nsiVuexJournal,
    driverEditForm
  },
  computed: {
    ...mapGetters(['activeDrivers'])
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
