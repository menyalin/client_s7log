<template>
  <v-card>
    <v-card-title>Новый заказ</v-card-title>
    <v-card-text>
      <v-container>
        <v-row align="center">
          <v-col cols="4">
            <v-select
              :items="statuses"
              label="Статус"
              item-text="title"
              item-value="id"
              hide-details
              class="pt-0 mt-0"
              v-model="editedOrder.status"
            />
          </v-col>
          <v-col cols="2">
            <v-select
              :items="carTypes"
              label="Тип ТС"
              item-text="title"
              item-value="id"
              hide-details
              class="pt-0 mt-0"
              v-model="editedOrder.carType"
            />
          </v-col>
          <v-col cols="4">
            <my-date-picker
              v-model="editedOrder.confirmDate"
              label="Дата рейса"
            />
          </v-col>
          <v-col cols="2">
            <v-select
              :items="timeZones"
              item-text="title"
              item-value="id"
              clearable
              label="Время"
              hide-details
              class="pt-0 mt-0"
              v-model="editedOrder.confirmTime"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <my-partner-autocomplete
              label="Погрузка"
              v-model="editedOrder.shipperId"
              placeType="shippingPlace"
            />
            <my-date-picker
              v-model="editedOrder.shippingDate"
              label="Плановая дата погрузки"
            />
            <my-time-text-field
              class="mt-2 pt-2"
              label="Время погрузки"
              v-model="editedOrder.shippingTime"
            />
          </v-col>
          <v-col>
            <my-partner-autocomplete
              label="Доставка"
              v-model="editedOrder.consigneeId"
              placeType="deliveryPlace"
            />
            <my-date-picker
              v-model="editedOrder.deliveryDate"
              label="Плановая дата доставки"
            />
            <my-time-text-field
              class="mt-2 pt-2"
              label="Время доставки"
              v-model="editedOrder.deliveryTime"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <my-car-autocomplete
              label="Машина"
              v-model="editedOrder.confirmedCarId"
            />
          </v-col>
          <v-col>
            <v-text-field label="Водитель" disabled />
          </v-col>
          <v-col>
            <v-checkbox
              v-model="editedOrder.isDriverNotified"
              label="Водитель оповещен"
              hide-details
              color="primary"
            />
          </v-col>
          <v-col>
            <v-checkbox
              v-model="editedOrder.isClientNotified"
              label="Клиент оповещен"
              hide-details
              color="primary"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Примечание" v-model="editedOrder.note" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-subheader>{{ currentUser.name }}</v-subheader>
      <v-spacer />
      <v-btn color="primary" @click="save" :loading="$apollo.loading"
        >Сохранить</v-btn
      >
      <v-btn color="primary" @click="cancel">Отмена</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import myDatePicker from '@/components/common/myDatePicker/index.vue'
import myPartnerAutocomplete from '@/components/common/myPartnerAutocomplete/index.vue'
import myTimeTextField from '@/components/common/myTimeTextField/index.vue'
import myCarAutocomplete from '@/components/common/myCarAutocomplete/index.vue'

import { mapGetters } from 'vuex'
export default {
  model: {
    prop: 'editedOrder',
    event: 'change'
  },
  computed: {
    ...mapGetters(['timeZones', 'statuses', 'currentUser']),
    isNewOrder() {
      return !!this.editedOrder.id
    }
  },
  components: {
    myDatePicker,
    myPartnerAutocomplete,
    myTimeTextField,
    myCarAutocomplete
  },
  data: () => ({
    carTypes: [
      { id: '20tn', title: '20 тн' },
      { id: '10tn', title: '10 тн' }
    ]
  }),
  props: ['editedOrder'],
  methods: {
    cancel() {
      this.$emit('cancelEdit')
    },
    save() {
      if (this.isNewOrder) {
        this.$emit('updateOrder')
      } else {
        this.$emit('createOrder')
      }
    }
  }
}
</script>

<style></style>
