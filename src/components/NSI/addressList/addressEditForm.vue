<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{
        isNewItem ? 'Новый адрес' : 'Старый адрес'
      }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              label="Сокращенное название"
              :value="editedAddress.shortName"
              @change="change($event, 'shortName')"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Партнер"
              :value="editedAddress.partner"
              @change="change($event, 'partner')"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Адрес доставки"
              :value="editedAddress.address"
              @change="change($event, 'address')"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Примечание"
              :value="editedAddress.note"
              @change="change($event, 'note')"
            />
          </v-col>
          <v-col cols="12">
            <v-checkbox
              label="Погрузка"
              :value="editedAddress.isShippingPlace"
              @change="change($event, 'isShippingPlace')"
              color="primary"
            />
            {{ editedAddress.isShippingPlace }}
            <v-checkbox
              label="Разгрузка"
              :value="editedAddress.isDeliveryPlace"
              @change="change($event, 'isDeliveryPlace')"
              color="primary"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  model: {
    prop: 'editedAddress',
    event: 'change'
  },
  props: ['editedAddress'],
  methods: {
    change(val, field) {
      this.$emit(
        'change',
        Object.assign({}, this.editedAddress, { [field]: val })
      )
    },
    cancel() {
      this.$emit('closedialog')
    },
    save() {
      this.$emit('closedialog')
    }
  },
  computed: {
    isNewItem() {
      return !!!this.editedAddress.id
    }
  }
}
</script>

<style></style>
