<template>
  <v-container>
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
            <span>{{
              item.shipperId
                ? `${addressById(item.shipperId).shortName} :  ${
                    addressById(item.shipperId).partner
                  }`
                : null
            }}</span>
          </template>
          <template v-slot:item.consignee="{ item }">
            <span>{{
              item.consigneeId
                ? `${addressById(item.consigneeId).shortName} :  ${
                    addressById(item.consigneeId).partner
                  }`
                : null
            }}</span>
          </template>
        </v-data-table>
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <order-template-edit-form
            v-model="editedTemplate"
            @cancelOrderTemplateEdit="cancelEdit"
            @updateTemplate="updateTemplateHandler"
          />
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import orderTemplateEditForm from './orderTemplateEditForm'
import gql from 'graphql-tag'

const updateTemplateMutation = gql`
  mutation updateTemplate(
    $id: ID!
    $carType: String!
    $shipperId: String
    $consigneeId: String
    $status: String
    $note: String
    $templateName: String
    $showInMenu: Boolean
  ) {
    updateTemplate(
      id: $id
      carType: $carType
      shipperId: $shipperId
      consigneeId: $consigneeId
      status: $status
      note: $note
      templateName: $templateName
      showInMenu: $showInMenu
    ) {
      id
    }
  }
`

export default {
  data: () => ({
    editedTemplate: {},
    limit: 30,
    dialog: false,
    page: 1,
    headers: [
      { text: 'Название шаблона', value: 'templateName' },
      { text: 'Показывать в меню', value: 'showInMenu' },
      { text: 'Тип ТС', value: 'carType' },
      { text: 'Погрузка', value: 'shipper' },
      { text: 'Разгрузка', value: 'consignee' }
    ]
  }),
  computed: {
    ...mapGetters(['allOrderTemplates', 'addressById'])
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
          this.$store.commit('setError', e.message)
          this.cancelEdit()
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
