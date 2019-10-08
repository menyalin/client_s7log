<template>
  <v-card class="ma-2">
    <v-container class="pa-0">
      <v-row no-gutters align="center">
        <v-col class="pa-0" jus>
          <v-subheader>phones:</v-subheader>
        </v-col>
        <v-spacer />
        <v-btn class="ma-2" small rounded>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-row>
    </v-container>

    <div v-if="userPhones.length">
      <v-list two-line>
        <v-list-item v-for="phone of userPhones" :key="phone._id">
          <v-list-item-content class="pl-4">
            <v-list-item-title :class="{title: phone.isMain}">{{ phone.number }}</v-list-item-title>
            <v-list-item-subtitle>
              <span>{{ phone.type }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div v-else>phones no found</div>
  </v-card>
</template>
<script>
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
  apollo: {
    userPhones: {
      query: userPhonesQuery
    }
  }
}
</script>
<style scoped>
</style>