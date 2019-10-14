<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-container class="pa-0">
            <v-row no-gutters align="center">
              <v-col class="pa-0" jus>
                <v-subheader>Мои компании:</v-subheader>
              </v-col>
              <v-spacer />
              <v-btn fab small class="ma-1" dark color="green">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </v-container>
          <v-card-text>
            <v-container v-if="!$apollo.loading">
              <v-row no-gutters>
                <v-col cols="3">
                  <div v-if="getMyCompanies.length">
                    <v-list two-line dense class="pt-0 pb-0">
                      <v-list-item
                        v-for="company of getMyCompanies"
                        :key="company._id"
                        :to="`/company/${company._id}`"
                      >
                        <v-list-item-content class="pl-3">
                          <v-list-item-title class="pb-2 pt-2 headline">{{ company.name }}</v-list-item-title>
                          <v-list-item-subtitle>
                            <span class="pl-1">ИНН: {{ company.inn }}</span>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </div>
                  <div v-else class="pa-3">Компаний нет</div>
                </v-col>
              </v-row>
            </v-container>
            <app-small-spinner v-else />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import appSmallSpinner from '@/components/common/smallSpinner'
import gql from 'graphql-tag'

const myCompaniesQuery = gql`
  query {
    getMyCompanies {
      _id
      name
      fullName
      inn
    }
  }
`

export default {
  data: () => ({}),
  components: {
    appSmallSpinner
  },
  apollo: {
    getMyCompanies: {
      query: myCompaniesQuery
    }
  }
}
</script>