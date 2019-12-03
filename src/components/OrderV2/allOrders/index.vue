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
              <v-dialog v-model="dialog" max-width="1024px" persistent>
                <order-edit-form
                  v-model="editedOrder"
                  @cancelEdit="cancelFormHandler"
                  @createOrder="createOrderHandler"
                  @updateOrder="updateOrderHandler"
                />
              </v-dialog>
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

import orderEditForm from './orderEditForm'
import { mapGetters } from 'vuex'
import { updateOrderMutation, orderPageQuery, createOrderMutation} from '../gql'




export default {
  name: 'allOrders',
  components: {
    orderEditForm
  },
  computed: {
    ...mapGetters(['statusTitleById']),
    queryFilters() {
      return {
        limit: this.limit,
        offset: (this.page - 1) * this.limit
      }
    },
    mutationVariables() {
      return {
        id: this.editedOrder.id,
        status: this.editedOrder.status || null,
        carType: this.editedOrder.carType,
        confirmDate: this.editedOrder.confirmDate || null,
        confirmTime: this.editedOrder.confirmTime || null,
        shipperId: this.editedOrder.shipperId || null,
        consigneeId: this.editedOrder.consigneeId || null,
        note: this.editedOrder.note || null,
        shippingDate: this.editedOrder.shippingDate || null,
        shippingTime: this.editedOrder.shippingTime || null,
        deliveryDate: this.editedOrder.deliveryDate || null,
        deliveryTime: this.editedOrder.deliveryTime || null,
        confirmedCarId: this.editedOrder.confirmedCarId || null,
        isDriverNotified: this.editedOrder.isDriverNotified || null,
        isClientNotified: this.editedOrder.isClientNotified || null
      }
    }
  },
  methods: {
    addOrder() {
      this.dialog = true
    },
    cancelFormHandler() {
      this.editedOrder = Object.assign({}, {})
      this.dialog = false
    },
    createOrderHandler() {
      this.$apollo
        .mutate({
          mutation: createOrderMutation,
          variables: this.mutationVariables,
          update: (store, { data: { createOrder } }) => {
            let data = store.readQuery({
              query: orderPageQuery,
              variables: this.queryFilters
            })
            let newOrder = Object.assign({}, createOrder, this.editedOrder)
            data.orderPage.orders.unshift(newOrder)
            store.writeQuery({
              query: orderPageQuery,
              variables: this.queryFilters,
              data
            })
          }
        })
        .then(({ data: { createOrder } }) => {
          this.$apollo.queries.orderPage.refresh()
          this.dialog = false
          this.$nextTick(() => {
            this.editedOrder = Object.assign({}, {})
          })
        })
        .catch(e => {
          this.$store.commit('setError', e.message)
        })
    },
    updateOrderHandler() {
      this.$apollo
        .mutate({
          mutation: updateOrderMutation,
          variables: this.mutationVariables,
          update: (store, { data: { updateOrder } }) => {
            let data = store.readQuery({
              query: orderPageQuery,
              variables: this.queryFilters
            })
            let updatedOrder = data.orderPage.orders.find(
              item => item.id === updateOrder.id
            )
            Object.assign(updatedOrder, this.editedOrder)
            store.writeQuery({
              query: orderPageQuery,
              variables: this.queryFilters,
              data
            })
          }
        })
        .then(({ data: { updateOrder } }) => {
          this.$apollo.queries.orderPage.refresh()
          this.dialog = false
          this.$nextTick(() => {
            this.editedOrder = Object.assign({}, {})
          })
        })
        .catch(e => {
          this.$store.commit('setError', e.message)
        })
    },
    editOrder(item) {
      this.dialog = true
      this.$nextTick(() => {
        this.editedOrder = Object.assign({}, item)
      })
    }
  },
  data: () => ({
    page: 1,
    limit: 25,
    dialog: false,
    editedOrder: {},
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
