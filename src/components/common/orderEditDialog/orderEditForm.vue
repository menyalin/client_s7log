<template>
  <v-card>
    <v-card-title>
      {{ isNewOrder ? 'Новый заказ' : `Заказ №${editedOrder.number}` }}
      <v-spacer />
      <v-select
        label="Заполнить из шаблона"
        :items="orderTemplates(editedOrder.carType)"
        :disabled="!editedOrder.carType"
        item-text="templateName"
        item-value="id"
        @input="changeTemplate"
        :value="editedOrder.templateId"
        clearable
        @click:clear="clearTemplateSelect"
      />
      <v-text-field
        label="кол-во ячеек"
        class="pl-2"
        type="number"
        min="1"
        v-model.number="editedOrder.lengthCell"
      />
    </v-card-title>
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
              :items="vehicleType"
              label="Тип ТС"
              item-text="text"
              item-value="value"
              hide-details
              class="pt-0 mt-0"
              v-model="editedOrder.carType"
            />
          </v-col>
          <v-col cols="6">
            <date-time-range
              v-model="editedOrder.dateRange"
              startLabel="Начало рейса"
              endLabel="Конец рейса"
              :lengthCell="editedOrder.lengthCell"
            />
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col>
            <my-partner-autocomplete
              label="Погрузка"
              v-model="editedOrder.shipperId"
              placeType="shippingPlace"
              class="pb-3"
            />
            <date-time-row>
              <template v-slot:date>
                <my-date-picker v-model="editedOrder.shippingDate" label="Плановая дата погрузки" />
              </template>
              <template v-slot:time>
                <my-time-text-field label="Время погрузки" v-model="editedOrder.shippingTime" />
              </template>
            </date-time-row>
          </v-col>
          <v-col>
            <my-partner-autocomplete
              label="Доставка"
              v-model="editedOrder.consigneeId"
              placeType="deliveryPlace"
              class="pb-3"
            />
            <date-time-row>
              <template v-slot:date>
                <my-date-picker v-model="editedOrder.deliveryDate" label="Плановая дата доставки" />
              </template>
              <template v-slot:time>
                <my-time-text-field label="Время доставки" v-model="editedOrder.deliveryTime" />
              </template>
            </date-time-row>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <my-car-autocomplete
              label="Машина"
              :type="editedOrder.carType"
              v-model="editedOrder.carId"
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
      <v-btn text color="primary" @click="openTemplateModal">Сохранить как шаблон</v-btn>
      <v-spacer />
      <v-btn color="primary" @click="save" :loading="$apollo.loading">Сохранить</v-btn>
      <v-btn color="primary" @click="cancel">Отмена</v-btn>
    </v-card-actions>
    <v-dialog v-model="templateModal" max-width="350">
      <v-card>
        <v-card-title class="headline">Сохранить новый шаблон</v-card-title>
        <v-card-text>
          <v-text-field v-model="templateName" label="Название шаблона" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-3" text @click="templateModalCancel">Отмена</v-btn>
          <v-btn
            color="green darken-3"
            text
            @click="templateModalSave"
            :disabled="!templateName"
          >Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import myDatePicker from '@/components/common/myDatePicker/index.vue'
import myPartnerAutocomplete from '@/components/common/myPartnerAutocomplete/index.vue'
import myTimeTextField from '@/components/common/myTimeTextField/index.vue'
import myCarAutocomplete from '@/components/common/myCarAutocomplete/index.vue'
import dateTimeRow from './dateTimeRow'
import dateTimeRange from '@/components/common/dateTimeRange'
import { createOrderTemplateMutation } from '@/gql/orders'
import { mapGetters } from 'vuex'
export default {
  model: {
    prop: 'editedOrder',
    event: 'change'
  },
  computed: {
    ...mapGetters([
      'timeZones',
      'statuses',
      'currentUser',
      'vehicleType',
      'orderTemplates'
    ]),
    isNewOrder() {
      return !this.editedOrder.id
    }
  },
  components: {
    dateTimeRange,
    myDatePicker,
    myPartnerAutocomplete,
    myTimeTextField,
    myCarAutocomplete,
    dateTimeRow
  },
  data: () => ({
    templateModal: false,
    templateName: ''
  }),
  props: {
    editedOrder: {
      type: Object
    }
  },
  methods: {
    clearTemplateSelect() {
      this.$store.commit('clearTemplateId')
    },
    changeTemplate(val) {
      if (val) {
        this.$store.commit('fillByTemplate', val)
      }
    },
    cancel() {
      this.$emit('cancelEdit')
    },
    save() {
      if (this.isNewOrder) {
        this.$emit('createOrder')
      } else {
        this.$emit('updateOrder')
      }
    },
    openTemplateModal() {
      this.templateModal = true
    },
    templateModalCancel() {
      this.templateName = ''
      this.templateModal = false
    },
    templateModalSave() {
      this.$apollo
        .mutate({
          mutation: createOrderTemplateMutation,
          variables: {
            carType: this.editedOrder.carType,
            status: this.editedOrder.status,
            shipperId: this.editedOrder.shipperId,
            consigneeId: this.editedOrder.consigneeId,
            note: this.editedOrder.note,
            templateName: this.templateName,
            lengthCell: this.editedOrder.lengthCell
          }
        })
        .then(() => {
          this.templateName = ''
          this.templateModal = false
        })
        .catch(e => {
          this.$store.dispatch('setError', e.message)
        })
    }
  }
}
</script>

<style></style>
