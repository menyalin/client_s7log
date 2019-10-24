<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Новая компания</v-card-title>
          <v-card-text>
            <v-container>
              <v-row no-gutters>
                <v-col cols="3">
                  <v-alert v-if="alert" type="success"
                    >Компания успешно создана</v-alert
                  >
                  <v-text-field label="Название" v-model="name" />
                  <v-text-field label="Полное название" v-model="fullName" />
                  <v-text-field label="ИНН" v-model="inn" />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="saveHandler"
              :disabled="loading"
              :loading="loading"
              >Сохранить</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'

const addNewCompanyQuery = gql`
  mutation addCompany($name: String, $fullName: String, $inn: String) {
    addNewCompany(name: $name, fullName: $fullName, inn: $inn) {
      _id
      name
      fullName
      inn
    }
  }
`

export default {
  name: 'AddNewCompany',
  data: () => ({
    alert: false,
    name: '',
    fullName: '',
    inn: ''
  }),
  computed: {
    ...mapGetters(['loading'])
  },
  methods: {
    resetForm() {
      this.name = ''
      this.fullName = ''
      this.inn = ''
    },
    saveHandler() {
      this.$store.commit('setLoading', true)
      this.$apollo
        .mutate({
          mutation: addNewCompanyQuery,
          variables: {
            name: this.name,
            fullName: this.fullName,
            inn: this.inn
          }
        })
        .then(({ data: { addNewCompany } }) => {
          this.alert = true
          this.resetForm()
          this.$store.commit('setLoading', false)
          setTimeout(() => {
            this.alert = false
          }, 5000)
        })
        .catch(e => {
          this.$store.commit('setLoading', false)
          this.$store.commit('setError', e.message)
        })
    }
  }
}
</script>
