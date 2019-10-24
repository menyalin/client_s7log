<template>
  <v-card offset-lg-1>
    <v-card-title>New order</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" lg="4">
            <my-partner-autocomplete
              label="Грузоотправитель"
              :items="partnersForAutocomplite"
              v-model="shipper"
            />
            <v-container fluid class="pa-0">
              <v-row no-gutters>
                <v-col cols="6" md="7">
                  <my-date-picker
                    label="Дата погрузки"
                    v-model="shippingDate"
                  />
                </v-col>
                <v-col>
                  <my-time-text-field
                    label="Время погрузки"
                    v-model="shippingTime"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="12" md="6" lg="4">
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
                    v-model="deliverytime"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <v-autocomplete
              color="primary"
              :items="vehicleType"
              v-model="vehicle"
              label="Тип ТС"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import myDatePicker from '@/components/common/myDatePicker'
import myTimeTextField from '@/components/common/myTimeTextField'
import myPartnerAutocomplete from '@/components/common/myPartnerAutocomplete'

export default {
  data: () => ({
    shippingDate: '',
    shippingTime: '',
    shipper: '',
    consignee: '',
    deliveryDate: '',
    deliverytime: '',
    vehicle: '10tn',
    comment: ''
  }),
  computed: {
    ...mapGetters(['partnersForAutocomplite', 'vehicleType'])
  },
  components: {
    myDatePicker,
    myTimeTextField,
    myPartnerAutocomplete
  }
}
</script>
