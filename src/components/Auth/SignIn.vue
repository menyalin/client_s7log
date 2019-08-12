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
              <v-text-field label="Email" prepend-icon="mdi-at" type="text" v-model.trim="email" />
              <v-text-field
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit" :loading="loading">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'SignIn',
  methods: {
    submitHandler () {
      this.$store.dispatch('signIn', {
        email: this.email.toLowerCase(),
        password: this.password
      })
    }
  },
  data: () => ({
    email: '',
    password: ''
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style>
</style>
