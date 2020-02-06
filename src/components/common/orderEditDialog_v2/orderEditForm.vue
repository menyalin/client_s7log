<template>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <!-- Строка заголовка формы -->
        <v-row align="center">
          <v-col dense>
            <h3>Заголовок формы</h3>
          </v-col>
          <v-spacer />
          <v-col cols="auto" class="car-type-wrapper">
            <v-select label="Тип ТС*" dense hide-details />
          </v-col>
          <v-col cols="auto" class="hidden-sm-and-down">
            <v-select label="Заполнить из шаблона" dense hide-details />
          </v-col>
          <v-col cols="auto" class="length-count-wrapper">
            <v-text-field
              label="Ячеек"
              dense
              type="number"
              min="1"
              hide-details
            />
          </v-col>
        </v-row>
        <!-- Строка информации о местах погрузки и времени выгрузки -->
        <v-row>
          <v-col>
            <div class="main-section">
              <div class="status-block">
                <v-card>
                  <v-card-text>
                    <v-select label="Статус рейса" hide-details />
                  </v-card-text>
                </v-card>
              </div>
              <div class="place-block">
                <v-card>
                  <v-card-text>
                    <my-partner-autocomplete
                      label="Место погрузки"
                      placeType="shippingPlace"
                    />
                    <my-partner-autocomplete
                      label="Место выгрузки"
                      placeType="deliveryPlace"
                      hide-details
                    />
                  </v-card-text>
                </v-card>
              </div>
              <div class="date-block">
                <v-card>
                  <v-card-text>
                    <date-time-control label="План погрузки" dense />
                    <date-time-control label="План выгрузки" />
                    <date-time-control label="Прибытие на погрузку" />
                    <date-time-control label="Окончание погрузки" />
                    <date-time-control label="Прибытие на выгрузку" />
                    <date-time-control label="Окончание выгрузки" />
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" @click="openTemplateModal"
        >Сохранить как шаблон</v-btn
      >
      <v-spacer />
      <v-btn color="primary" @click="save" :loading="$apollo.loading"
        >Сохранить</v-btn
      >
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
          <v-btn color="green darken-3" text @click="templateModalCancel">
            Отмена
          </v-btn>
          <v-btn
            color="green darken-3"
            text
            @click="templateModalSave"
            :disabled="!templateName"
            >Сохранить</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import dateTimeControl from '@/components/common/dateTimeControl'
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
    dateTimeControl,
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

<style scoped>
.car-type-wrapper {
  max-width: 8rem;
}
.length-count-wrapper {
  max-width: 8rem;
}
.main-section {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 1em;
}
@media (min-width: 95em) {
  .status-block {
    background-color: blue;
    grid-column: 1/5;
    grid-row: 1/4;
  }
  .place-block {
    grid-column: 5/10;
    grid-row: 1/4;
  }
  .date-block {
    grid-column: 10/13;
    grid-row: 1/4;
  }
}

@media (min-width: 40em) and (max-width: 95em) {
  .status-block {
    background-color: green;
    grid-column: 1/8;
    grid-row: 1/2;
  }
  .place-block {
    grid-column: 1/8;
    grid-row: 2/4;
  }
  .date-block {
    grid-column: 8/13;
    grid-row: 1/4;
  }
}
@media (max-width: 40em) {
  .status-block {
    background-color: red;
  }
}
</style>
