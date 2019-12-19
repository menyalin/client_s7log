<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          hide-default-footer
          :items="orderPage.orders"
          :items-per-page="limit"
          :headers="headers"
          @click:row="editOrder"
          dense
        >
          <template v-slot:top>
            <v-container fluid>
              <order-edit-dialog />
              <v-row align="center">
                <v-col cols="auto">
                  <v-btn color="secondary" @click="addOrder" dark>
                    <v-icon>mdi-plus</v-icon>Новый
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:item.status="{ item }">
            {{ item.status ? statusTitleById(item.status).title : '' }}
          </template>
        </v-data-table>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="Math.floor(orderPage.orderCount / limit) + 1 || 0"
            :total-visible="7"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import orderEditDialog from '../orderEditDialog'
import { mapGetters } from 'vuex'
import { orderPageQuery } from '../gql'

export default {
  name: 'allOrders',
  components: {
    orderEditDialog
  },
  computed: {
    ...mapGetters(['statusTitleById']),
    queryFilters() {
      return {
        limit: this.limit,
        offset: (this.page - 1) * this.limit
      }
    }
  },
  methods: {
    addOrder() {
      this.$store.commit('openEditOrderForm')
    },
    editOrder(item) {
      this.$store.commit('openEditOrderForm', item)
    }
  },
  data: () => ({
    page: 1,
    limit: 25,
    orderPage: {},
    headers: [
      {
        text: 'Номер',
        value: 'number',
        sortable: false,
        align: 'right',
        width: '7em'
      },
      { text: 'Статус', value: 'status', sortable: false },
      { text: 'ТС', value: 'carType', sortable: false },
      { text: 'Дата', value: 'confirmDate', sortable: false },
      { text: 'Грузоотправитель', value: 'shipper.shortName', sortable: false },
      {
        text: 'Грузополучатель',
        value: 'consignee.shortName',
        sortable: false
      },
      { text: 'Менеджер', value: 'manager.name', sortable: false }
    ]
  }),
  apollo: {
    orderPage: {
      query: orderPageQuery,
      variables() {
        return this.queryFilters
      },
      fetchPolicy: 'cache-and-network',
      startPooling: 1000
    }
  }
}
</script>

<style></style>
