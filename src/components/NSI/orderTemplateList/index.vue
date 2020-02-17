<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-data-table
          class="elevation-1"
          :items="allOrderTemplates"
          :items-per-page="limit"
          :headers="headers"
          dense
          @click:row="clickRowHandler"
          :footer-props="{
            'items-per-page-options': [15, 30, 50, -1]
          }"
        >
          <template v-slot:item.showInMenu="{ item }">
            <div>
              <v-icon color="green" v-if="item.showInMenu">mdi-check</v-icon>
              <v-icon v-else>mdi-cross</v-icon>
            </div>
          </template>
          <template v-slot:item.shipper="{ item }">
            <span>
              {{
                item.shipperId
                  ? `${addressById(item.shipperId).shortName} : ${
                      addressById(item.shipperId).partner
                    }`
                  : null
              }}
            </span>
          </template>
          <template v-slot:item.consignee="{ item }">
            <span>
              {{
                item.consigneeId
                  ? `${addressById(item.consigneeId).shortName} : ${
                      addressById(item.consigneeId).partner
                    }`
                  : null
              }}
            </span>
          </template>
          <template v-slot:item.status="{ item }">{{
            statusTitleById(item.status)
              ? statusTitleById(item.status).title
              : '(пусто)'
          }}</template>
        </v-data-table>
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <order-template-edit-form
            v-model="editedTemplate"
            @cancelOrderTemplateEdit="cancelEdit"
            @updateTemplate="updateTemplateHandler"
            @deleteOrderTemplate="deleteTemlateHandler"
          />
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import orderTemplateEditForm from './orderTemplateEditForm'
import {
  updateTemplateMutation,
  deleteOrderTemplateMutation
} from '@/gql/orders'

export default {
  data: () => ({
    editedTemplate: {},
    limit: 30,
    dialog: false,
    page: 1,
    headers: [
      { text: 'Название шаблона', value: 'templateName' },
      {
        text: 'Показывать',
        value: 'showInMenu',
        align: 'center',
        width: '5em',
        sortable: false
      },
      { text: 'Тип ТС', value: 'carType' },
      { text: 'Тип ТС (План)', value: 'plannedCarType' },
      { text: 'Статус', value: 'status' },
      { text: 'Кол-во ячеек', value: 'lengthCell', align: 'center' },
      { text: 'Погрузка', value: 'shipper' },
      { text: 'Разгрузка', value: 'consignee' },
      { text: 'Вес', value: 'weight', align: 'center' },
      { text: 'Кол-во ПЛТ', value: 'pltCount', align: 'center' },
      { text: 'Стоимость', value: 'price', align: 'center' },
      { text: 'Примечание', value: 'note' }
    ]
  }),
  computed: {
    ...mapGetters(['allOrderTemplates', 'addressById', 'statusTitleById'])
  },
  components: {
    orderTemplateEditForm
  },
  methods: {
    updateTemplateHandler() {
      this.$apollo
        .mutate({
          mutation: updateTemplateMutation,
          variables: this.editedTemplate
        })
        .then(() => {
          this.cancelEdit()
        })
        .catch(e => {
          this.$store.dispatch('setError', e.message)
          this.cancelEdit()
        })
    },
    deleteTemlateHandler() {
      this.$apollo
        .mutate({
          mutation: deleteOrderTemplateMutation,
          variables: this.editedTemplate
        })
        .then(this.cancelEdit())
        .catch(e => {
          this.$store.dispatch('setError', e.message)
        })
    },
    cancelEdit() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedTemplate = Object.assign({})
      })
    },
    clickRowHandler(item) {
      this.dialog = true
      this.$nextTick(() => {
        this.editedTemplate = Object.assign({}, item)
      })
    }
  }
}
</script>

<style></style>
