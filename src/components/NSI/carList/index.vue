<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table class="elevation-1" hide-default-footer dense></v-data-table>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="Math.floor(carPage.totalCar / limit) + 1 || 0"
            :total-visible="7"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data: () => ({
    page: 1,
    limit: 30,
    carPage: {}
  }),
  apollo: {
    carPage: {
      query: 
    }
  }
}
</script>

<style>
</style>