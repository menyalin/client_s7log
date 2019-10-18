<template>
  <v-card>
    <v-card-title>New order</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" lg="3">
            <v-select label="Заказчик"></v-select>
            <my-date-picker label="Дата погрузки" v-model="shippingDate" />
            <my-time-text-field label="Время погрузки" v-model="shippingTime" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
import myDatePicker from '@/components/common/myDatePicker'
import myTimeTextField from '@/components/common/myTimeTextField'

export default {
  data: () => ({
    shippingDate: '',
    shippingTime: ''
  }),
  components: {
    myDatePicker,
    myTimeTextField
  }
}
</script>