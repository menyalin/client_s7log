<template>
  <v-card class="ma-1">
    <v-container class="pa-0">
      <v-row no-gutters align="center">
        <v-col class="pa-0" jus>
          <v-subheader>Телефоны:</v-subheader>
        </v-col>
        <v-spacer />
        <app-edit-phone-modal newPhone="true" v-on:phone-number-added="addNewPhoneHahdler" />
      </v-row>
    </v-container>

    <div v-if="userPhones.length">
      <v-list two-line dense>
        <v-list-item v-for="phone of userPhones" :key="phone._id">
          <v-list-item-content class="pl-4">
            <v-list-item-title :class="{title: phone.isMain}">{{ phone.number }}</v-list-item-title>
            <v-list-item-subtitle>
              <span>{{ phone.type }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-pencil-outline</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>
    <div v-else class="pa-3">Телефоны не указаны</div>
  </v-card>
</template>

<script>
import appEditPhoneModal from './editPhoneModal'
import { mapGetters } from 'vuex'
import gql from 'graphql-tag'

const userPhonesQuery = gql`
  query {
    userPhones {
      _id
      type
      number
      created
      isMain
    }
  }
`

export default {
  name: 'UserPhones',
  computed: {
    ...mapGetters(['currentUser'])
  },
  data() {
    return {
      userPhones: []
    }
  },
  components: {
    appEditPhoneModal
  },
  apollo: {
    userPhones: {
      query: userPhonesQuery
    }
  },
  methods: {
    addNewPhoneHahdler(newPhones) {
      this.userPhones = newPhones
    }
  }
}
</script>
<style scoped>
</style>