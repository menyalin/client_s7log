<template>
  <v-row no-gutters>
    <v-col cols="auto">
      <app-left-bar />
    </v-col>
    <v-col>
      <app-my-company-list />
      <app-add-new-company />
    </v-col>
  </v-row>
</template>
<script>
import appLeftBar from './leftBar'
import appAddNewCompany from './addNewCompany'
import appMyCompanyList from './myCompanyList'

export default {
  components: {
    appLeftBar,
    appAddNewCompany,
    appMyCompanyList
  }
}
</script>