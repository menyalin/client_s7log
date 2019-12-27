<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form @submit.prevent="submitHandler">
          <v-card class="elevation-12 mt-5">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                label="Email"
                prepend-icon="mdi-at"
                type="text"
                :error-messages="emailErrors"
                v-model.trim="$v.form.email.$model"
              />
              <v-text-field
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                v-model.trim="$v.form.password.$model"
                :error-messages="passwordErrors"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                type="submit"
                :loading="loading"
                :disabled="loading || $v.$invalid"
              >
                Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'SignIn',
  methods: {
    submitHandler() {
      this.$store.dispatch('signIn', {
        email: this.$v.form.email.$model.toLowerCase(),
        password: this.$v.form.password.$model
      })
    }
  },
  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),
  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    emailErrors() {
      let res = []
      if (this.$v.form.email.$error) {
        if (!this.$v.form.email.required) res.push('Поле не может быть пустым')
        if (!this.$v.form.email.email) res.push('Введите корректный email')
      }
      return res
    },

    passwordErrors() {
      if (this.$v.form.password.$error) {
        return 'Поле не может быть пустым'
      } else return null
    }
  }
}
</script>

<style></style>
