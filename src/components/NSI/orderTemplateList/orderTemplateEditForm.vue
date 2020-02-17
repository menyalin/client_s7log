<template>
  <v-card>
    <v-card-title>{{
      isNewItem ? 'Новый шаблон' : 'Редактировать шаблон'
    }}</v-card-title>
    <v-card-text>
      <v-text-field
        label="Название шаблона"
        v-model="editedTemplate.templateName"
      />
      <div class="car-types-wrapper">
        <v-select
          :items="vehicleType"
          label="Тип ТС"
          item-text="text"
          item-value="value"
          v-model="editedTemplate.carType"
        />
        <v-select
          :items="vehicleType"
          label="Тип ТС (План)"
          item-text="text"
          item-value="value"
          v-model="editedTemplate.plannedCarType"
        />
      </div>

      <div class="status-wrapper">
        <v-select
          :items="statuses"
          label="Статус"
          item-text="title"
          item-value="id"
          v-model="editedTemplate.status"
        />
        <v-text-field
          label="Кол-во ячеек"
          type="number"
          min="1"
          v-model.number="editedTemplate.lengthCell"
        />
      </div>

      <my-partner-autocomplete
        label="Погрузка"
        placeType="shippingPlace"
        v-model="editedTemplate.shipperId"
      />
      <my-partner-autocomplete
        label="Разгрузка"
        placeType="deliveryPlace"
        v-model="editedTemplate.consigneeId"
      />
      <div class="dop-info-wrapper">
        <v-text-field label="Вес" v-model.number="editedTemplate.weight" />
        <v-text-field
          label="Кол-во ПЛТ"
          v-model.number="editedTemplate.pltCount"
        />
        <v-text-field label="Стоимость" v-model.number="editedTemplate.price" />
      </div>
      <v-text-field label="Примечание" v-model="editedTemplate.note" />
      <v-checkbox
        color="primary"
        v-model="editedTemplate.showInMenu"
        label="Показывать в меню"
      />
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
import myPartnerAutocomplete from '@/components/common/myPartnerAutocomplete/index.vue'
import { mapGetters } from 'vuex'

export default {
  model: {
    prop: 'editedTemplate',
    event: 'change'
  },
  props: ['editedTemplate'],
  components: {
    myPartnerAutocomplete
  },
  computed: {
    ...mapGetters(['statuses', 'vehicleType']),
    isNewItem() {
      return !this.editedTemplate.id
    }
  },
  methods: {
    async deleteHandler() {
      const res = await this.$confirm('Вы уверены? Отменить будет нельзя!', {
        title: 'Удаление записи'
      })
      if (res) this.$emit('deleteOrderTemplate')
    },
    cancel() {
      this.$emit('cancelOrderTemplateEdit')
    },
    save() {
      this.$emit(this.isNewItem ? 'createTemplate' : 'updateTemplate')
    }
  }
}
</script>

<style scoped>
.car-types-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.status-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
.dop-info-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
