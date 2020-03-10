<template>
  <v-container fluid>
    <v-row class="data--block">
      <v-col cols="12">
        <v-data-table
          dense
          :headers="headers"
          :items="addresses"
          class="elevation-1"
          multi-sort
          :sort-by="['partner', 'shortName']"
          :sort-desc="[false, false]"
          :search="search"
          @click:row="clickRowHandler"
          :footer-props="{
            'items-per-page-options': [80, 120, -1]
          }"
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="800px">
              <address-edit-form
                @closedialog="cancelHandler"
                @saveitem="saveItemHandler"
                @newitem="newItemHandler"
                v-model="editedItem"
                :isModified="isModified"
                @modify="isModified = true"
              />
            </v-dialog>
            <v-container fluid>
              <v-row align="center">
                <v-col cols="auto">
                  <v-btn color="secondary" @click="addAddress" dark>
                    <v-icon>mdi-plus</v-icon>
                    Добавить
                  </v-btn>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Поиск"
                    hide-details
                    v-model="search"
                    single-line
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:item.isActive="{ item }">
            <div>
              <v-icon color="green" small v-if="!!item.isActive">
                mdi-check
              </v-icon>
              <v-icon color="grey" small v-else>mdi-minus</v-icon>
            </div>
          </template>
          <template v-slot:item.isShippingPlace="{ item }">
            <v-icon v-if="item.isShippingPlace" small color="green">
              mdi-check
            </v-icon>
          </template>
          <template v-slot:item.isDeliveryPlace="{ item }">
            <v-icon v-if="item.isDeliveryPlace" small color="green">
              mdi-check
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import addressEditForm from './addressEditForm'
import { mapGetters } from 'vuex'
import { updateAddressMutation, createAddressMutation } from '@/gql/address'

const query = gql`
  query addressPages(
    $offset: Int
    $limit: Int
    $search: String
    $isShippingPlace: Boolean
    $isDeliveryPlace: Boolean
  ) {
    addressPages(
      offset: $offset
      limit: $limit
      search: $search
      isShippingPlace: $isShippingPlace
      isDeliveryPlace: $isDeliveryPlace
    ) {
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

const blockAddressMutation = gql`
  mutation blockAddress($id: ID) {
    blockAddress(id: $id)
  }
`

export default {
  components: {
    addressEditForm
  },
  computed: {
    ...mapGetters(['addresses'])
  },
  methods: {
    addAddress() {
      this.$nextTick(() => {
        this.dialog = true
      })
    },
    cancelHandler() {
      this.editedItem = Object.assign({})
      this.$nextTick(() => {
        this.dialog = false
      })
    },
    clickRowHandler(item) {
      this.dialog = true
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, item)
      })
    },
    saveItemHandler() {
      this.$apollo
        .mutate({
          mutation: updateAddressMutation,
          variables: this.editedItem
        })
        .then(() => {
          this.cancelHandler()
        })
        .catch(e => {
          this.$store.dispatch('setError', e.message)
          this.cancelHandler()
        })
    },
    newItemHandler() {
      this.$apollo
        .mutate({
          mutation: createAddressMutation,
          variables: this.editedItem
        })
        .then(() => {
          this.cancelHandler()
        })
        .catch(e => {
          this.$store.dispatch('setError', e.message)
          this.cancelHandler()
        })
    }
  },
  data() {
    return {
      dialog: false,
      search: '',
      isModified: false,
      editedItem: {},
      options: {},
      headers: [
        { text: 'Контрагент', value: 'partner' },
        { text: 'Сокр.название', value: 'shortName' },
        { text: 'Адрес', value: 'address' },
        { text: 'Примечание', value: 'note' },
        {
          text: 'Погрузка',
          value: 'isShippingPlace',

          align: 'center'
        },
        {
          text: 'Разгрузка',
          value: 'isDeliveryPlace',
          align: 'center'
        },
        {
          text: 'isActive',
          value: 'isActive',
          align: 'center'
        }
      ]
    }
  }
}
</script>
<style></style>
