<template>
  <v-card>
    <v-card-title>
      {{ isNewItem ? 'Новая сцепка' : 'Редактировать' }}
    </v-card-title>
    <v-card-text class="control--wrapper">
      <date-time-control v-model="editedItem.startDate" label="Дата" />
      <car-autocomplete
        v-model="editedItem.truckId"
        :types="['20tn', '10tn']"
        label="Грузовик"
      />
      <car-autocomplete
        :types="['trailer']"
        label="Прицеп"
        v-model="editedItem.trailerId"
        :disabled="trailerDisabled"
      />
      <driver-autocomplete v-model="editedItem.driverId1" label="Водитель 1" />
      <driver-autocomplete
        label="Водитель 2"
        v-model="editedItem.driverId2"
        :disabled="!editedItem.driverId1"
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
import dateTimeControl from '@/components/common/dateTimeControl'
import timeInput from '@/components/common/timeInput'
import carAutocomplete from '@/components/common/carAutocomplete'
import driverAutocomplete from '@/components/common/driverAutocomplete'

export default {
  components: {
    dateTimeControl,
    carAutocomplete,
    driverAutocomplete
  },
  computed: {
    ...mapGetters(['']),
    isNewItem() {
      return !this.editedItem.id
    },
    isValidForm() {
      let { startDate, truckId, driverId1 } = this.editedItem
      return !!startDate && !!truckId && !!driverId1
    },
    trailerDisabled() {
      return (
        !this.editedItem.truckId ||
        this.$store.getters.carById(this.editedItem.truckId).type !== '20tn'
      )
    }
  },
  data: () => ({}),
  model: {
    prop: 'editedItem',
    event: 'change'
  },
  props: ['editedItem'],
  methods: {
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
