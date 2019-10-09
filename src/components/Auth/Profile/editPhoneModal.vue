<template>
  <v-dialog v-model="dialog" persistent max-width="490">
    <template v-slot:activator="{ on }">
      <v-btn class="ma-2" dark color="green" small fab @click="openDialogHandler">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">{{ this.newPhone ? 'Новый': 'Старый' }}</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-select :items="phoneTypes" label="Тип" v-model="phoneType" />
              <v-text-field label="Номер телефона" v-model="phoneNumber" />
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
        <div class="flex-grow-1"></div>
        <v-btn color="green darken-1" text @click="сancelHandler">Отмена</v-btn>
        <v-btn color="green darken-1" text @click="addNewPhoneHandler" :loading="loading">Добавить</v-btn>
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
export default {
  data() {
    return {
      dialog: false,
      phoneType: [],
      phoneNumber: '',
      isMainPhone: false
    }
  },
  computed: {
    ...mapGetters(['phoneTypes', 'loading'])
  },
  props: ['newPhone'],
  methods: {
    openDialogHandler() {
      this.dialog = true
    },
    resetFields() {
      this.phoneNumber = ''
      this.phoneType = []
      this.isMainPhone = false
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
        })
    }
  }
}
</script>