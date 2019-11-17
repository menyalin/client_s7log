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
            <v-dialog v-model="dialog" max-width="800px">
              <address-edit-form
                @closedialog="cancelHandler"
                @saveitem="saveItemHandler"
                @newitem="newItemHandler"
                v-model="editedAddress"
                :isModified="isModified"
                @modify="isModified = true"
              />
            </v-dialog>
            <v-container fluid>
              <v-row align="center">
                <v-col cols="auto">
                  <v-btn color="secondary" @click="addAddress" dark>
                    <v-icon>mdi-plus</v-icon>Новый
                  </v-btn>
                </v-col>

                <v-col cols="auto">
                  <v-checkbox
                    label="Разгрузка"
                    v-model="isDeliveryPlace"
                    @change="editFilters"
                    hide-details
                    color="primary"
                    class="pr-2"
                  />
                </v-col>
                <v-col cols="auto">
                  <v-checkbox
                    label="Погрузка"
                    v-model="isShippingPlace"
                    @change="editFilters"
                    hide-details
                    color="primary"
                    class="pr-2"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    label="Поиск"
                    v-model="searchText"
                    hide-details
                    @input="editFilters"
                  />
                </v-col>
                <v-col cols="auto">
                  <v-select
                    :items="itemsOnPage"
                    label="Кол-во строк"
                    :value="limit"
                    hide-details
                    @change="changeLimit($event)"
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:item.isShippingPlace="{item}">
            <v-icon v-if="item.isShippingPlace" small color="green">mdi-check</v-icon>
          </template>
          <template v-slot:item.isDeliveryPlace="{item}">
            <v-icon v-if="item.isDeliveryPlace" small color="green">mdi-check</v-icon>
          </template>
          <template v-slot:item.action="{item}">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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
const updateAddressMutation = gql`
  mutation updateAddress(
    $id: ID
    $address: String
    $partner: String
    $shortName: String
    $note: String
    $isShippingPlace: Boolean
    $isDeliveryPlace: Boolean
  ) {
    updateAddress(
      id: $id
      address: $address
      partner: $partner
      shortName: $shortName
      note: $note
      isShippingPlace: $isShippingPlace
      isDeliveryPlace: $isDeliveryPlace
    ) {
      id
      shortName
      address
      partner
      note
      isShippingPlace
      isDeliveryPlace
    }
  }
`
const blockAddressMutation = gql`
  mutation blockAddress($id: ID) {
    blockAddress(id: $id)
  }
`
const createAddressMutation = gql`
  mutation createAddress(
    $address: String
    $partner: String
    $shortName: String
    $note: String
    $isShippingPlace: Boolean
    $isDeliveryPlace: Boolean
  ) {
    createAddress(
      address: $address
      partner: $partner
      shortName: $shortName
      note: $note
      isShippingPlace: $isShippingPlace
      isDeliveryPlace: $isDeliveryPlace
    ) {
      id
      shortName
      address
      partner
      note
      isShippingPlace
      isDeliveryPlace
    }
  }
`

export default {
  components: {
    addressEditForm
  },
  computed: {
    queryVariables() {
      return {
        offset: (this.page - 1) * this.limit,
        limit: this.limit,
        search: this.searchText,
        isDeliveryPlace: this.isDeliveryPlace,
        isShippingPlace: this.isShippingPlace
      }
    }
  },
  methods: {
    editFilters() {
      this.page = 1
    },
    changeLimit(val) {
      this.limit = val
      this.page = 1
      localStorage.setItem('addressPageLimit', val)
    },
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
      this.isModified = false
      this.dialog = true
      this.$nextTick(() => {
        this.editedAddress = Object.assign({}, this.editedAddress, item)
      })
    },
    addAddress() {
      this.isModified = false
      this.dialog = true
      this.resetEditedAddress()
      this.$nextTick(() => {
        this.editedAddress = Object.assign({}, this.editedAddress)
      })
    },
    newItemHandler() {
      this.$store.commit('setLoading', true)
      this.$apollo
        .mutate({
          mutation: createAddressMutation,
          variables: {
            address: this.editedAddress.address,
            partner: this.editedAddress.partner,
            shortName: this.editedAddress.shortName,
            note: this.editedAddress.note,
            isShippingPlace: this.editedAddress.isShippingPlace,
            isDeliveryPlace: this.editedAddress.isDeliveryPlace
          },
          update: (store, { data: { createAddress } }) => {
            const data = store.readQuery({
              query,
              variables: this.queryVariables
            })
            data.addressPages.addresses.push(createAddress)
            store.writeQuery({
              query,
              variables: this.queryVariables,
              data
            })
          }
        })
        .then(({ data: { createAddress } }) => {
          this.addressPages.addresses.unshift(createAddress)
          this.$store.commit('setLoading', false)
          this.cancelHandler()
        })
        .catch(e => {
          this.$store.commit('setLoading', false)
          this.$store.commit('setError', e.message)
          this.cancelHandler()
        })
    },
    async deleteItem(item) {
      const res = await this.$confirm(
        `Подтверждаете удаление записи ${item.partner} - ${item.shortName}?`,
        {
          title: 'Удаление записи'
        }
      )
      if (res) {
        this.$apollo
          .mutate({
            mutation: blockAddressMutation,
            variables: {
              id: item.id
            },
            update: store => {
              const data = store.readQuery({
                query,
                variables: this.queryVariables
              })
              data.addressPages.addresses.splice(
                data.addressPages.addresses.findIndex(i => i.id === item.id),
                1
              )
              store.writeQuery({
                query,
                variables: this.queryVariables,
                data
              })
            }
          })
          .then(({ data: blockAddress }) => {
            if (blockAddress) {
            }
          })
      }
    },
    saveItemHandler() {
      this.$store.commit('setLoading', true)
      this.$apollo
        .mutate({
          mutation: updateAddressMutation,
          variables: {
            id: this.editedAddress.id,
            address: this.editedAddress.address,
            partner: this.editedAddress.partner,
            shortName: this.editedAddress.shortName,
            note: this.editedAddress.note,
            isShippingPlace: this.editedAddress.isShippingPlace,
            isDeliveryPlace: this.editedAddress.isDeliveryPlace
          }
        })
        .then(({ data: { updateAddress } }) => {
          this.cancelHandler()
        })
        .catch(e => {
          this.$store.commit('setError', e.message)
          this.cancelHandler()
        })
    },
    cancelHandler() {
      this.$store.commit('setLoading', false)
      this.dialog = false
      this.resetEditedAddress()
    }
  },
  data() {
    return {
      itemsOnPage: [20, 50, 100],
      limit: +localStorage.getItem('addressPageLimit') || 20,
      dialog: false,
      isDeliveryPlace: false,
      isShippingPlace: false,
      searchText: '',
      isModified: false,
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

      options: {},
      addressPages: {},
      headers: [
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
        return this.queryVariables
      },
      fetchPolicy: 'network-only'
    }
  }
}
</script>
<style></style>
