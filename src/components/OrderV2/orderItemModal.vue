<template>
  <v-dialog :value="dialog" max-width="1024" persistent>
    <v-card>
      <v-card-title class="headline">Форма редактирования заказа</v-card-title>
      <v-card-text>
        <v-container fluid fill-height class="pa-0 ma-0">
          <v-row>
            <v-col>
              <v-autocomplete label="Статус" v-model="status" :items="orderStatuses" />
              <my-partner-autocomplete
                label="Грузоотправитель"
                :items="partnersForAutocomplite"
                v-model="shipper"
              />
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
    myPartnerAutocomplete
  },
  data: () => ({
    status: null,
    shipper: null,
    orderStatuses: ['Новый', 'На погрузке', 'Выполнен', 'Проблема']
  }),
  created() {
    this.status = this.order.status
    this.shipper = this.order.shipper
  },
  methods: {
    acceptHandler() {
      this.$store.dispatch('updateOrder', {
        id: this.order._id,
        status: this.status,
        shipper: this.shipper
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
