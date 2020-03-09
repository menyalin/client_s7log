<template>
  <v-card>
    <v-card-title>
      {{ isNewItem ? 'Новая сцепка' : 'Редактировать' }}
    </v-card-title>
    <v-card-text class="control--wrapper">
      <date-time-range v-model="editedItem.dateRange" isOpenRange />
      <car-autocomplete
        v-model="editedItem.truckId"
        :types="['20tn', '10tn']"
        label="Грузовик"
        :carList="freeCars"
        :disabled="!editedItem.dateRange"
        @change="changeTrackIdHandler($event)"
      />
      <car-autocomplete
        :types="['trailer']"
        label="Прицеп"
        v-model="editedItem.trailerId"
        :carList="freeCars"
        :disabled="trailerDisabled"
      />
      <driver-autocomplete
        v-model="editedItem.driver1Id"
        label="Водитель 1"
        :driverList="freeDrivers"
        :disabled="!editedItem.dateRange"
      />
      <driver-autocomplete
        label="Водитель 2"
        v-model="editedItem.driver2Id"
        :driverList="freeDrivers"
        :disabled="!editedItem.driver1Id"
      />
      <v-text-field label="Примечание" hide-details v-model="editedItem.note" />
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="!isNewItem"
        color="warning"
        fab
        small
        dark
        @click="deleteHandler"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn color="primary" @click="cancel">Отмена</v-btn>
      <v-btn color="primary" @click="save" :disabled="!isValidForm">
        {{ isNewItem ? 'Создать' : 'Сохранить' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { freeDriversQuery } from '@/gql/drivers'
import { freeCarsQuery } from '@/gql/cars'

import dateTimeRange from '@/components/common/dateTimeRange'
import carAutocomplete from '@/components/common/carAutocomplete'
import driverAutocomplete from '@/components/common/driverAutocomplete'
import moment from 'moment'

export default {
  components: {
    carAutocomplete,
    driverAutocomplete,
    dateTimeRange
  },
  computed: {
    ...mapGetters(['carById']),
    isNewItem() {
      return !this.editedItem.id
    },
    isValidForm() {
      let {
        dateRange,
        truckId,
        driver1Id,
        driver2Id,
        trailerId
      } = this.editedItem
      return (
        !!dateRange &&
        !!truckId &&
        !!driver1Id &&
        driver1Id !== driver2Id &&
        (trailerId || this.trailerDisabled)
      )
    },
    trailerDisabled() {
      return (
        !this.editedItem.truckId ||
        this.$store.getters.carById(this.editedItem.truckId).type !== '20tn'
      )
    }
  },
  data: () => ({
    freeDrivers: [],
    freeCars: [],
    driver1Search: ''
  }),
  model: {
    prop: 'editedItem',
    event: 'change'
  },
  props: ['editedItem'],
  methods: {
    changeTrackIdHandler(val) {
      if (this.carById(val) && this.carById(val).type === '10tn') {
        this.editedItem.trailerId = ''
      }
    },
    dateRangeForQuery(range) {
      const dateFormat = 'YYYY-MM-DD HH:mm'
      if (typeof range === 'string') return range
      else if (range.length && range[1].value)
        return `[${moment(+range[0].value).format(dateFormat)},${moment(
          +range[1].value
        ).format(dateFormat)}]`
      else if (range.length && !range[1].value)
        return `[${moment(+range[0].value).format(dateFormat)},]`
    },
    save() {
      this.$emit(this.isNewItem ? 'createCarUnit' : 'updateCarUnit')
    },
    cancel() {
      this.$emit('cancel_edit')
    },
    async deleteHandler() {
      const res = await this.$confirm('Вы уверены? Отменить будет нельзя!', {
        title: 'Удаление записи'
      })
      if (res) this.$emit('deleteCarUnit')
    }
  },
  apollo: {
    freeDrivers: {
      query: freeDriversQuery,
      variables() {
        return {
          dateRange: this.dateRangeForQuery(this.editedItem.dateRange),
          carUnitId: this.editedItem.id || null,
          driver1Id: this.editedItem.driver1Id || null,
          driver2Id: this.editedItem.driver2Id || null
        }
      },
      fetchPolicy: 'no-cache',
      skip() {
        return !this.editedItem.dateRange
      }
    },
    freeCars: {
      query: freeCarsQuery,
      variables() {
        return {
          dateRange: this.dateRangeForQuery(this.editedItem.dateRange),
          carUnitId: this.editedItem.id || null,
          trailerId: this.editedItem.trailerId || null,
          truckId: this.editedItem.truckId || null
        }
      },
      fetchPolicy: 'no-cache',
      skip() {
        return !this.editedItem.dateRange
      }
    }
  }
}
</script>

<style scoped>
.control--wrapper {
  display: flex;
  flex-direction: column;
  justify-content: baseline;
}
.control--wrapper > * {
  padding: 0.8em;
}
</style>
