<template>
  <v-row no-gutters>
    <v-col cols="auto">
      <app-left-bar />
    </v-col>
    <v-col>
      <app-my-company-list />
      <app-my-contract-list />
      <app-add-new-company />
    </v-col>
  </v-row>
</template>
<script>
import appLeftBar from './leftBar'
import appAddNewCompany from './addNewCompany'
import appMyCompanyList from './myCompanyList'
import appMyContractList from './myContractList'
import { mapGetters } from 'vuex'

export default {
  components: {
    appLeftBar,
    appAddNewCompany,
    appMyCompanyList,
    appMyContractList
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.getters.isLoggedIn) {
        vm.$router.push('/signin')
      }
    })
  }
}
</script>
