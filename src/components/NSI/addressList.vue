<template>
  <v-container>
    <v-row class="filter--block">
      <v-col>
        <v-container fluid>
          <v-row>
            <v-col> </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-divider />
    <v-row class="data--block">
      <v-col cols="12">
        <v-data-table
          dense
          :headers="headers"
          :items="addressPages.addresses"
          :loading="this.$apollo.loading"
          :items-per-page="limit"
          :page.sync="page"
          class="elevation-1"
          hide-default-footer
        />
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="Math.floor(addressPages.totalCount / limit) + 1"
            :total-visible="7"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
const query = gql`
  query addressPages($offset: Int, $limit: Int) {
    addressPages(offset: $offset, limit: $limit) {
      addresses {
        id
        partner
        shortName
        address
        note
        isShippingPlace
        isDeliveryPlace
      }
      totalCount
    }
  }
`
export default {
  data() {
    return {
      page: 1,
      limit: 30,
      options: {},
      addressPages: {},
      headers: [
        { text: 'id', value: 'id', sortable: false },
        { text: 'Контрагент', value: 'partner', sortable: false },
        { text: 'shortName', sortable: false, value: 'shortName' },
        { text: 'address', value: 'address', sortable: false },
        { text: 'Примечание', value: 'note', sortable: false }
      ]
    }
  },
  apollo: {
    addressPages: {
      query,
      variables() {
        return {
          offset: (this.page - 1) * this.limit,
          limit: this.limit
        }
      }
    }
  }
}
</script>

<style></style>
