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
              label="Контрагент"
              :value="editedAddress.partner"
              @input="change($event, 'partner')"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Сокращенное название"
              :value="editedAddress.shortName"
              @input="change($event, 'shortName')"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Адрес доставки"
              :value="editedAddress.address"
              @input="change($event, 'address')"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Примечание"
              :value="editedAddress.note"
              @input="change($event, 'note')"
            />
          </v-col>
          <v-col cols="6">
            <v-checkbox
              label="Погрузка"
              :value="!!editedAddress.isShippingPlace"
              @change="change($event, 'isShippingPlace')"
              hide-details
              color="primary"
            />
          </v-col>
          <v-col cols="6">
            <v-checkbox
              label="Разгрузка"
              :value="!!editedAddress.isDeliveryPlace"
              @change="change($event, 'isDeliveryPlace')"
              hide-details
              color="primary"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="cancel">Отмена</v-btn>
      <v-btn
        color="primary"
        @click="save"
        :loading="loading"
        :disabled="!isModified"
        >{{ isNewItem ? 'Создать' : 'Сохранить' }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  model: {
    prop: 'editedAddress',
    event: 'change'
  },
  props: ['editedAddress', 'isModified'],
  methods: {
    change(val, field) {
      this.$emit(
        'change',
        Object.assign({}, this.editedAddress, {[field]: val})
      )
      this.$emit('modify')
    },
    cancel() {
      this.$emit('closedialog')
    },
    save() {
      if (this.isNewItem) {
        this.$emit('newitem')
      } else {
        this.$emit('saveitem')
      }
    }
  },
  computed: {
    ...mapGetters(['loading']),
    isNewItem() {
      return !!!this.editedAddress.id
    }
  }
}
</script>

<style></style>
