<template>
  <v-card>
    <v-card-title>{{ isNewTemplate ? 'Новый шаблон' : 'Редактировать шаблон' }}</v-card-title>
    <v-card-text>
      <v-text-field label="Название шаблона" v-model="editedTemplate.templateName" />
      <v-select
        :items="vehicleType"
        label="Тип ТС"
        item-text="text"
        item-value="value"
        v-model="editedTemplate.carType"
      />
      <v-text-field
        label="Кол-во ячеек"
        type="number"
        min="1"
        v-model.number="editedTemplate.lengthCell"
      />
      <v-select
        :items="statuses"
        label="Статус"
        item-text="title"
        item-value="id"
        v-model="editedTemplate.status"
      />
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
      <v-text-field label="Примечание" v-model="editedTemplate.note" />
      <v-checkbox color="primary" v-model="editedTemplate.showInMenu" label="Показывать в меню" />
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="!isNewItem" color="warning" fab small dark @click="deleteHandler">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn color="primary" @click="cancel">Отмена</v-btn>
      <v-btn color="primary" @click="save">
        {{
        isNewTemplate ? 'Создать' : 'Сохранить'
        }}
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
    isNewTemplate() {
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
      this.$emit(this.isNewTemplate ? 'createTemplate' : 'updateTemplate')
    }
  }
}
</script>

<style></style>
