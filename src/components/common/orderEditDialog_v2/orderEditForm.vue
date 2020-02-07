<template>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <!-- Строка заголовка формы -->
        <v-row align="center">
          <v-col dense>
            <h3>Заголовок формы</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="main-section">
              <div class="status-block">
                <v-card class="block-wrapper">
                  <v-card-text>
                    <v-radio-group class="status-group-wrapper">
                      <v-radio
                        dense
                        v-for="status in statuses"
                        :key="status.id"
                        :label="status.title"
                        :value="status.id"
                      />
                    </v-radio-group>
                    <div class="checkbox-wrapper">
                      <v-checkbox
                        label="Водитель оповещен"
                        hide-details
                        color="primary"
                      />
                      <v-checkbox
                        label="Клиент оповещен"
                        hide-details
                        color="primary"
                      />
                      <v-checkbox
                        label="На контроль"
                        hide-details
                        color="primary"
                      />
                    </div>
                  </v-card-text>
                </v-card>
              </div>
              <div class="place-block">
                <v-card>
                  <v-card-text>
                    <v-col cols="auto" class="pa-0">
                      <v-select label="Заполнить из шаблона" />
                    </v-col>
                    <my-partner-autocomplete
                      label="Место погрузки"
                      placeType="shippingPlace"
                      hide-details
                    />
                    <my-partner-autocomplete
                      label="Место выгрузки"
                      placeType="deliveryPlace"
                      hide-details
                    />
                  </v-card-text>
                </v-card>
              </div>
              <div class="info-block">
                <v-card>
                  <v-card-text class="info-controls">
                    <v-select label="Тип ТС*" hide-details />
                    <v-text-field
                      label="Ячеек"
                      type="number"
                      min="1"
                      hide-details
                    />
                  </v-card-text>
                </v-card>
              </div>
              <div class="date-block">
                <v-card class="block-wrapper">
                  <v-card-text class="date-controls-group">
                    <date-time-control label="План погрузки" dense />
                    <date-time-control label="План выгрузки" dense />
                    <date-time-control label="Прибытие на погрузку" dense />
                    <date-time-control label="Окончание погрузки" dense />
                    <date-time-control label="Прибытие на выгрузку" dense />
                    <date-time-control label="Окончание выгрузки" dense />
                  </v-card-text>
                </v-card>
              </div>
              <div class="dop-info-block">
                <v-card>
                  <v-card-text class="dop-info-control-group">
                    <v-select
                      label="Тип ТС (план)"
                      hide-details
                      class="carTypePlan"
                    />
                    <v-text-field hide-details label="Вес, тн" />
                    <v-text-field hide-details label="Кол-во ПЛТ" />
                    <v-text-field hide-details label="Стоимость" />
                  </v-card-text>
                </v-card>
              </div>
              <div class="car-block">
                <v-card>
                  <v-card-text class="car-selects-wrapper">
                    <div>
                      <v-select hide-details label="Машина" />
                    </div>
                    <div>
                      <v-select hide-details label="Прицеп" />
                    </div>
                    <div>
                      <v-select hide-details label="Водитель" />
                    </div>
                    <div>
                      <v-select hide-details label="Водитель 2" />
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              label="Комментарий"
              outlined
              dense
              no-resize
              hide-details
              height="7em"
            />
          </v-col>
          <v-col cols="auto">
            <div class="pa-1">
              <v-btn outlined color="primary" @click="openTemplateModal" small
                >Сохранить как шаблон</v-btn
              >
            </div>
            <div class="pa-1">
              <v-btn small block outlined color="primary">button2</v-btn>
            </div>
            <div class="pa-1">
              <v-btn small block outlined color="primary">button3</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn color="warning" fab small dark>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
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
          <v-btn color="green darken-3" text @click="templateModalCancel"
            >Отмена</v-btn
          >
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
.block-wrapper {
  height: 100%;
}
.info-controls {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.info-controls > * {
  max-width: 9rem;
  padding-left: 0.5em;
  padding-right: 0.5em;
}
.car-selects-wrapper > div {
  width: 50%;
}
.car-type-wrapper {
  max-width: 8rem;
}
.dop-info-control-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.dop-info-control-group > * {
  width: 9rem;
  padding-left: 0.5em;
  padding-right: 0.5em;
}
.length-count-wrapper {
  max-width: 8rem;
}
.date-controls-group {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.main-section {
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: auto;
  grid-gap: 0.7em;
}
@media (min-width: 90em) {
  .main-section {
    grid-template-rows: 5.5em 11em 6em 1fr;
  }
  .status-block {
    grid-column: 1/5;
    grid-row: 1/5;
  }
  .place-block {
    grid-column: 5/13;
    grid-row: 1/2;
  }
  .date-block {
    grid-column: 13/16;
    grid-row: 2/5;
  }
  .car-block {
    grid-column: 5/13;
    grid-row: 3;
  }
  .info-block {
    grid-column: 13/16;
    grid-row: 1;
  }
  .dop-info-block {
    grid-column: 5/13;
    grid-row: 4;
  }
  .car-selects-wrapper {
    display: flex;
    height: 100%;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .car-selects-wrapper > div {
    height: 50%;
    padding-left: 1em;
  }
  .checkbox-wrapper {
    display: flex;
    height: 100%;
    justify-content: space-evenly;
    flex-direction: row;
    flex-wrap: nowrap;
  }
}
@media (min-width: 60em) and (max-width: 89.99em) {
  .main-section {
    grid-template-rows: 5.5em 11em 10.5em 1fr;
  }
  .status-block {
    grid-column: 1/5;
    grid-row: 1/5;
  }
  .place-block {
    grid-column: 5/12;
    grid-row: 1;
  }
  .date-block {
    grid-column: 12/16;
    grid-row: 2/4;
  }
  .car-block {
    grid-column: 5/12;
    grid-row: 3;
  }
  .info-block {
    grid-column: 12/16;
    grid-row: 1;
  }
  .dop-info-block {
    grid-column: 5/16;
    grid-row: 4;
  }
  .checkbox-wrapper {
    display: flex;
    height: 100%;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: nowrap;
  }
  .checkbox-wrapper > * {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
  .car-selects-wrapper {
    display: flex;
    height: 100%;
    justify-content: space-evenly;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .car-selects-wrapper > div {
    height: 50%;
    padding-left: 1em;
  }
}
@media (max-width: 59.99em) {
  .info-block {
    grid-column: 1/16;
    grid-row: 1;
  }
  .status-block {
    grid-column: 1/16;
    grid-row: 2;
  }
  .place-block {
    grid-column: 1/16;
    grid-row: 3;
  }
  .date-block {
    grid-column: 1/16;
    grid-row: 4;
  }
  .dop-info-block {
    grid-column: 1/16;
    grid-row: 5;
  }
  .car-block {
    grid-column: 1/16;
    grid-row: 6;
  }

  .status-group-wrapper > * {
    max-width: 25%;
  }
  .status-group-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .checkbox-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .dop-info-control-group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .car-selects-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .car-selects-wrapper > * {
    padding-left: 0.5em;
    padding-right: 0.5em;
    width: 100%;
  }
}
</style>
