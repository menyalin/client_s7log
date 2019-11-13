<template>
  <v-container>
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
        >
          <template v-slot:top>
            {{ editedAddress }}
            <v-dialog v-model="dialog" max-width="960px">
              <address-edit-form
                @closedialog="cancelHandler"
                @saveitem="saveItemHandler"
                v-model="editedAddress"
              />
            </v-dialog>
          </template>
          <template v-slot:item.isShippingPlace="{ item }">
            <v-icon v-if="item.isShippingPlace" small color="green"
              >mdi-check</v-icon
            >
          </template>
          <template v-slot:item.isDeliveryPlace="{ item }">
            <v-icon v-if="item.isDeliveryPlace" small color="green"
              >mdi-check</v-icon
            >
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small>mdi-delete</v-icon>
          </template>
        </v-data-table>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="Math.floor(addressPages.totalCount / limit) + 1 || 0"
            :total-visible="7"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import addressEditForm from './addressEditForm'
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
  components: {
    addressEditForm
  },
  methods: {
    resetEditedAddress() {
      this.editedAddress = Object.assign(
        {},
        {
          id: null,
          shortName: '',
          address: '',
          partner: '',
          note: '',
          isShippingPlace: false,
          isDeliveryPlace: false
        }
      )
    },
    editItem(item) {
      this.dialog = true
      this.$nextTick(() => {
        this.editedAddress = Object.assign({}, this.editedAddress, item)
      })
    },
    saveItemHandler(item) {
      console.log(item)
    },
    cancelHandler() {
      this.dialog = false
      this.resetEditedAddress()
    }
  },
  data() {
    return {
      dialog: false,
      page: 1,
      editedAddress: {
        id: null,
        address: '',
        shortName: '',
        partner: '',
        note: '',
        isShippingPlace: false,
        isDeliveryPlace: false
      },
      limit: 30,
      options: {},
      addressPages: {},
      headers: [
        { text: 'id', value: 'id', sortable: false },
        { text: 'Контрагент', value: 'partner', sortable: false },
        { text: 'Сокр.название', sortable: false, value: 'shortName' },
        { text: 'Адрес', value: 'address', sortable: false },
        { text: 'Примечание', value: 'note', sortable: false },
        {
          text: 'Погрузка',
          value: 'isShippingPlace',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Разгрузка',
          value: 'isDeliveryPlace',
          sortable: false,
          align: 'center'
        },
        { text: 'Actions', value: 'action', sortable: false }
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
