<template>
  <v-dialog :value="dialog" max-width="1024" persistent>
    <v-card>
      <v-card-title class="headline">Форма редактирования заказа</v-card-title>
      <v-card-text>
        <v-container fluid class="pa-0 ma-0">
          <v-row>
            <v-col>
              <v-autocomplete
                label="Статус"
                v-model="status"
                :items="orderStatuses"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6">
              <my-partner-autocomplete
                label="Грузоотправитель"
                :items="partnersForAutocomplite"
                v-model="shipper"
              />
            </v-col>
            <v-col cols="6">
              <my-partner-autocomplete
                label="Грузополучатель"
                :items="partnersForAutocomplite"
                v-model="consignee"
              />
              <v-container fluid class="pa-0">
                <v-row no-gutters>
                  <v-col cols="6" md="7">
                    <my-date-picker
                      label="Дата доставки"
                      v-model="deliveryDate"
                    />
                  </v-col>
                  <v-col>
                    <my-time-text-field
                      label="Время доставки"
                      v-model="deliveryTime"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancelHandler">Отмена</v-btn>
        <v-btn color="primary" text @click="acceptHandler">Ок</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import myDatePicker from '@/components/common/myDatePicker'
import myTimeTextField from '@/components/common/myTimeTextField'
import myPartnerAutocomplete from '@/components/common/myPartnerAutocomplete'
import { mapGetters } from 'vuex'

export default {
  props: ['dialog', 'order'],
  components: {
    myPartnerAutocomplete,
    myDatePicker,
    myTimeTextField
  },
  data: () => ({
    status: null,
    shipper: null,
    consignee: null,
    deliveryDate: null,
    deliveryTime: null,
    orderStatuses: ['Новый', 'На погрузке', 'Выполнен', 'Проблема']
  }),
  created() {
    this.status = this.order.status
    this.shipper = this.order.shipper
    this.consignee = this.order.consignee
    this.deliveryDate = this.order.deliveryDate
    this.deliveryTime = this.order.deliveryTime
  },
  methods: {
    acceptHandler() {
      this.$store.dispatch('updateOrder', {
        id: this.order._id,
        status: this.status,
        shipper: this.shipper,
        consignee: this.consignee,
        deliveryDate: this.deliveryDate,
        deliveryTime: this.deliveryTime
      })
      this.$emit('change', false)
    },
    cancelHandler() {
      this.$emit('change', false)
    }
  },
  computed: {
    ...mapGetters(['partnersForAutocomplite'])
  },
  model: {
    prop: 'dialog',
    event: 'change'
  }
}
</script>

<style></style>
