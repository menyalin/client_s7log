<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form @submit.prevent="submitHandler">
          <v-card class="elevation-12 mt-5">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Регистрация нового пользователя</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                label="Name"
                prepend-icon="mdi-account-outline"
                type="text"
                :error-messages="nameErrors"
                v-model.trim="$v.form.name.$model"
              />
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
              <v-text-field
                label="Confirm Password"
                prepend-icon="mdi-lock"
                type="password"
                v-model.trim="$v.form.confirmPassword.$model"
                :error-messages="confirmPasswordErrors"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                type="submit"
                :loading="loading"
                :disabled="loading || $v.$invalid"
              >Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'
import { isExistEmailQuery } from '../../store/queries'

export default {
  name: 'SignUn',
  methods: {
    submitHandler () {
      this.$store.dispatch('signUp', {
        name: this.$v.form.name.$model.trim(),
        email: this.$v.form.email.$model.toLowerCase(),
        password: this.$v.form.password.$model
      })
    }
  },
  apollo: {
    isExistEmail: {
      query: isExistEmailQuery,
      variables () {
        return {
          email: this.$v.form.email.$model.toLowerCase() || ' '
        }
      }
    }
  },
  data: () => ({
    form: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }),
  validations: {
    form: {
      name: { required },
      email: {
        required,
        email,
        async isExistEmailValidator (value) {
          if (this.$v.form.email.required && this.$v.form.email.email) {
            this.$apollo.queries.isExistEmail.skip = false
            if (this.isExistEmail) {
              return false
            } else {
              return true
            }
          } else {
            this.$apollo.queries.isExistEmail.skip = true
            return false
          }
        }
      },
      password: { required },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    nameErrors () {
      if (this.$v.form.name.$error) {
        return 'Поле не может быть пустым'
      } else return null
    },
    emailErrors () {
      if (this.$v.form.email.$error) {
        if (!this.$v.form.email.required) return 'Поле не может быть пустым'
        if (!this.$v.form.email.email) return 'Введите корректный email'
        if (!this.$v.form.email.isExistEmailValidator) {
          return 'Введенный email уже зарегистрирован в системе'
        }
      } else {
        return null
      }
    },
    passwordErrors () {
      if (this.$v.form.password.$error) {
        return 'Поле не может быть пустым'
      } else return null
    },
    confirmPasswordErrors () {
      if (this.$v.form.confirmPassword.$error) {
        return 'Пароли не совпадают'
      } else return null
    }
  }
}
</script>

<style>
</style>
