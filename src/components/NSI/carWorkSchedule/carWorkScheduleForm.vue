<template>
  <v-card>
    <v-card-title>
      {{ isNewItem ? 'Новая запись' : `Запись №${editedItem.id}` }}
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <my-car-autocomplete
              label="Машина"
              v-model="editedItem.carId"
              :noType="true"
            />
          </v-col>
          <v-col>
            <v-select
              label="Тип"
              v-model="editedItem.type"
              :items="carWorkScheduleTypes"
              item-value="id"
              item-text="title"
            />
          </v-col>
          <v-col>
            <v-text-field label="Заголовок" v-model="editedItem.title" />
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
import myCarAutocomplete from '@/components/common/myCarAutocomplete'
import { mapGetters } from 'vuex'
export default {
  components: {
    dateTimeRange,
    myCarAutocomplete
  },
  computed: {
    ...mapGetters(['carWorkScheduleTypes']),
    isNewItem() {
      return !this.editedItem.id
    },
    isValidForm() {
      return (
        !!this.editedItem.dateRange &&
        !!this.editedItem.carId &&
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
