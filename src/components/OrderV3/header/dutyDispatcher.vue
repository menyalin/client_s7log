<template>
  <div class="wrapper" @click="openDialog">
    <small>
      {{
        dutyDispatcher(date) && dutyDispatcher(date).user
          ? dutyDispatcher(date).user.name
          : 'Не задан'
      }}
    </small>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline text-center">
          {{ displayDate }}
        </v-card-title>
        <v-card-text>
          <v-autocomplete
            label="Диспетчер"
            :items="dispatchersStaff"
            item-value="userId"
            item-text="userName"
            clearable
            v-model="editedDispatcherId"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="cancelHandler">Отмена</v-btn>
          <v-btn color="primary" text @click="saveHandler">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import gql from 'graphql-tag'
import { createScheduleMutation, deleteScheduleMutation, updateScheduleMutation } from '@/gql/users'

export default {
  name: 'dutyDispatcher',
  props: ['date'],
  computed: {
    ...mapGetters(['dutyDispatcher', 'dispatchersStaff']),
    displayDate() {
      moment.locale('ru')
      return moment(this.date).format('DD MMM YYYY, ddd')
    },
    variables() {
      return {
        type: 'dispatcher',
        date: this.date,
        userId: this.editedDispatcherId,
        id: this.dutyDispatcher(this.date)
          ? this.dutyDispatcher(this.date).id
          : null
      }
    }
  },
  data: () => ({
    dialog: false,
    editedDispatcherId: null
  }),
  methods: {
    openDialog() {
      if (this.dutyDispatcher(this.date)) {
        this.editedDispatcherId = this.dutyDispatcher(this.date).user.id
      } else {
        this.editedDispatcherId = null
      }
      this.$nextTick(() => {
        this.dialog = true
      })
    },
    cancelHandler() {
      this.editedDispatcherId = null
      this.dialog = false
    },
    saveHandler() {
      let mutation = null
      if (!this.dutyDispatcher(this.date) && this.editedDispatcherId)
        mutation = createScheduleMutation
      else if (this.dutyDispatcher(this.date) && this.editedDispatcherId) {
        mutation = updateScheduleMutation
      } else if (this.dutyDispatcher(this.date) && !this.editedDispatcherId) {
        mutation = deleteScheduleMutation
      } else {
        console.log('Ошибка!!!')
      }
      this.$apollo
        .mutate({
          mutation,
          variables: this.variables
        })
        .then(() => {
          this.cancelHandler()
        })
        .catch(e => {
          this.$store.commit('setError', e.message)
          this.cancelHandler()
        })
    }
  }
}
</script>

<style scoped>
.wrapper {
  text-align: center;
  cursor: pointer;
}
</style>
