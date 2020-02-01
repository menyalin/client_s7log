<template>
  <v-card>
    <v-card-title>
      {{ isNewItem ? 'Новый автомобиль' : `ТС: ${editedItem.title}` }}
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row no-gutters>
          <v-col>
            <v-select
              label="Тип*"
              v-model="editedItem.type"
              :items="vehicleType"
              item-value="value"
              item-text="text"
            />
          </v-col>
          <v-col class="center">
            <v-checkbox
              class="pl-4"
              color="primary"
              v-model="editedItem.isOwned"
              label="Собственная"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-text-field label="Заголовок*" v-model="editedItem.title" />
          </v-col>
          <v-col>
            <v-text-field label="Рег.номер" v-model="editedItem.regNumber" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-text-field
              label="№ в списке"
              v-model.number="editedItem.listItem"
              type="number"
            />
          </v-col>
          <v-col>
            <v-text-field
              label="Кол-во плт"
              v-model.number="editedItem.maxPltCount"
              type="number"
              min="0"
              max="66"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-text-field label="Св-во регистрации" v-model="editedItem.reg" />
          </v-col>
          <v-col>
            <v-text-field label="ПТС" v-model="editedItem.pts" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-text-field label="Примечание" v-model="editedItem.note" />
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
import { mapGetters } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapGetters(['vehicleType']),
    isNewItem() {
      return !this.editedItem.id
    },
    isValidForm() {
      return !!this.editedItem.type && !!this.editedItem.title
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
