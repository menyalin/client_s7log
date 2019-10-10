<template>
  <v-dialog v-model="dialog" persistent max-width="490">
    <template v-if="newPhone" v-slot:activator="{ on }">
      <v-btn class="ma-2" dark color="green" small fab @click="openDialogHandler">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <template v-else v-slot:activator="{ on }">
      <v-icon @click="openDialogHandler">mdi-pencil-outline</v-icon>
    </template>
    <v-card>
      <v-card-title class="headline">{{ this.newPhone ? 'Новый': 'Старый' }}</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <label v-if="!newPhone">{{ phone._id }}</label>
              <v-select :items="phoneTypes" label="Тип" v-model="phoneType" />
              <v-text-field label="Номер телефона" v-model="phoneNumber" :disabled="!newPhone" />
              <v-checkbox
                dense
                v-model="isMainPhone"
                class="ma-0"
                hide-details
                label="Предпочитаемый способ связи"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="ma-2"
          dark
          color="warning"
          small
          fab
          v-if="!newPhone"
          @click="deletePhoneHandler"
        >
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>

        <v-spacer />
        <v-btn color="primary" @click="dialog=false">Отмена</v-btn>
        <v-btn
          v-if="newPhone"
          color="primary"
          @click="addNewPhoneHandler"
          :loading="loading"
          :disabled="!formValid || loading"
        >Добавить</v-btn>
        <v-btn
          v-else
          color="primary"
          @click="updatePhoneHandler"
          :loading="loading"
          :disabled="!formValid"
        >Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import gql from 'graphql-tag'

const addNewPhoneQuery = gql`
  mutation addPhone($type: String!, $number: String!, $isMain: Boolean) {
    addMyPhone(type: $type, number: $number, isMain: $isMain) {
      _id
      type
      number
      isMain
    }
  }
`
const deleteMyPhoneQuery = gql`
  mutation deleteMyPhone($_id: String!) {
    deleteMyPhone(_id: $_id) {
      _id
      type
      number
      isMain
    }
  }
`
const updateMyPhoneQuery = gql`
  mutation updateMyPhone($_id: String!, $type: String, $isMain: Boolean) {
    updateMyPhone(_id: $_id, type: $type, isMain: $isMain) {
      _id
      type
      number
      isMain
    }
  }
`

export default {
  data() {
    return {
      dialog: false,
      phoneType: '',
      phoneNumber: '',
      isMainPhone: false
    }
  },
  mounted() {
    if (!this.newPhone) {
      this.phoneType = this.phone.type
      this.phoneNumber = this.phone.number
      this.isMainPhone = this.phone.isMain
    }
  },
  computed: {
    ...mapGetters(['phoneTypes', 'loading']),
    formValid() {
      if (this.newPhone) {
        return this.phoneType !== '' && this.phoneNumber !== ''
      } else {
        return (
          this.phoneType !== this.phone.type ||
          this.isMainPhone !== this.phone.isMain
        )
      }
    }
  },
  props: ['newPhone', 'phone'],
  methods: {
    deletePhoneHandler() {
      this.$store.commit('setLoading', true)
      this.$apollo
        .mutate({
          mutation: deleteMyPhoneQuery,
          variables: {
            _id: this.phone._id
          }
        })
        .then(({ data: { deleteMyPhone: phones } }) => {
          this.$emit('update-phones', phones)
          this.$store.commit('setLoading', false)
          this.dialog = false
        })
        .catch(e => {
          this.$store.commit('setLoading', false)
          this.$store.commit('setError', e.message)
          this.dialog = false
        })
    },
    openDialogHandler() {
      if (!this.newPhone) {
        this.resetFields()
      }
      this.dialog = true
    },
    resetFields() {
      if (!this.newPhone) {
        this.phoneType = this.phone.type
        this.isMainPhone = this.phone.isMain
      } else {
        this.phoneNumber = ''
        this.phoneType = []
        this.isMainPhone = false
      }
    },
    сancelHandler() {
      this.dialog = false
    },
    addNewPhoneHandler() {
      this.$store.commit('setLoading', true)
      this.$apollo
        .mutate({
          mutation: addNewPhoneQuery,
          variables: {
            type: this.phoneType,
            number: this.phoneNumber,
            isMain: this.isMainPhone
          }
        })
        .then(({ data: { addMyPhone } }) => {
          this.$store.commit('setLoading', false)
          this.$emit('phone-number-added', addMyPhone)
          this.resetFields()
          this.dialog = false
        })
        .catch(e => {
          this.$store.commit('setLoading', false)
          this.resetFields()
          this.dialog = false
        })
    },
    updatePhoneHandler() {
      if (!this.newPhone && this.formValid) {
        this.$store.commit('setLoading', true)
        this.$apollo
          .mutate({
            mutation: updateMyPhoneQuery,
            variables: {
              _id: this.phone._id,
              type: this.phoneType,
              isMain: this.isMainPhone
            }
          })
          .then(({ data: { updateMyPhone: phones } }) => {
            this.$emit('update-phones', phones)
            this.$store.commit('setLoading', false)
            this.dialog = false
          })
          .catch(e => {
            this.$store.commit('setLoading', false)
            this.$store.commit('setError', e.message)
            this.dialog = false
          })
      }
    }
  }
}
</script>