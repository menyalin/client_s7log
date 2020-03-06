<template>
  <v-card>
    <v-card-title>
      {{ isNewItem ? 'Новая запись' : `Запись №${editedItem.id}` }}
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <car-autocomplete
              label="Грузовик"
              v-model="editedItem.carId"
              :types="['20tn', '10tn']"
            />
          </v-col>
          <v-col>
            <car-autocomplete
              label="Прицеп"
              v-model="editedItem.trailerId"
              :types="['trailer']"
            />
          </v-col>
          <v-col>
            <driver-autocomplete
              v-model="editedItem.driverId"
              label="Водитель"
            />
          </v-col>
          <v-col>
            <v-select
              label="Тип"
              v-model="editedItem.type"
              :items="carWorkScheduleTypes"
              item-value="id"
              item-text="title"
              hide-details
            />
          </v-col>
          <v-col>
            <v-text-field
              label="Заголовок"
              v-model="editedItem.title"
              hide-details
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <date-time-range v-model="editedItem.dateRange" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Комментарий" v-model="editedItem.note" />
          </v-col>
        </v-row>
      </v-container>
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
import dateTimeRange from '@/components/common/dateTimeRange'
import driverAutocomplete from '@/components/common/driverAutocomplete'
import carAutocomplete from '@/components/common/carAutocomplete'
import { mapGetters } from 'vuex'
export default {
  components: {
    dateTimeRange,
    carAutocomplete,
    driverAutocomplete
  },
  computed: {
    ...mapGetters(['carWorkScheduleTypes']),
    isNewItem() {
      return !this.editedItem.id
    },
    isValidForm() {
      return (
        !!this.editedItem.dateRange &&
        (this.editedItem.carId ||
          this.editedItem.trailerId ||
          this.editedItem.driverId) &&
        !!this.editedItem.type
      )
    }
  },
  model: {
    prop: 'editedItem',
    event: 'change'
  },
  props: ['editedItem'],
  methods: {
    save() {
      this.$emit(this.isNewItem ? 'createSchedule' : 'updateSchedule')
    },
    cancel() {
      this.$emit('cancelEdit')
    },
    async deleteHandler() {
      const res = await this.$confirm('Вы уверены? Отменить будет нельзя!', {
        title: 'Удаление записи'
      })
      if (res) this.$emit('deleteCarWorkSchedule')
    }
  }
}
</script>

<style></style>
