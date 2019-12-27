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
        </v-row>
        <v-row>
          <v-col>
            <date-time-row>
              <template v-slot:date>
                <my-date-picker
                  v-model="editedItem.startDate"
                  label="Дата начала"
                />
              </template>
              <template v-slot:time>
                <v-select
                  :items="timeZones"
                  item-text="title"
                  item-value="id"
                  clearable
                  label="Время начала"
                  hide-details
                  class="pt-0 mt-0"
                  v-model="editedItem.startTime"
                />
              </template>
            </date-time-row>
          </v-col>
          <v-col
            ><date-time-row>
              <template v-slot:date>
                <my-date-picker
                  v-model="editedItem.endDate"
                  label="Дата завершения"
                />
              </template>
              <template v-slot:time>
                <v-select
                  :items="timeZones"
                  item-text="title"
                  item-value="id"
                  clearable
                  label="Время завершения"
                  hide-details
                  class="pt-0 mt-0"
                  v-model="editedItem.endTime"
                />
              </template>
            </date-time-row>
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
      <v-btn color="primary" @click="save">
        {{ isNewItem ? 'Создать' : 'Сохранить' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import myDatePicker from '@/components/common/myDatePicker'
import myTimeTextField from '@/components/common/myTimeTextField'
import myCarAutocomplete from '@/components/common/myCarAutocomplete'
import dateTimeRow from '@/components/common/dateTimeRow'
import { mapGetters } from 'vuex'
export default {
  components: {
    dateTimeRow,
    myCarAutocomplete,
    myDatePicker
  },
  computed: {
    ...mapGetters(['carWorkScheduleTypes', 'timeZones']),
    isNewItem() {
      return !this.editedItem.id
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
