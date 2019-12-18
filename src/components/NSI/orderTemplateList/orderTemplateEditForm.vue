<template>
  <v-card>
    <v-card-title>
      {{ isNewTemplate ? 'Новый шаблон' : 'Редактировать шаблон' }}
    </v-card-title>
    <v-card-text>
      <v-text-field
        label="Название шаблона"
        v-model="editedTemplate.templateName"
      />
      <v-select
        :items="vehicleType"
        label="Тип ТС"
        item-text="text"
        item-value="value"
        v-model="editedTemplate.carType"
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
      <v-checkbox
        v-model="editedTemplate.showInMenu"
        label="Показывать в меню"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="cancel">Отмена</v-btn>
      <v-btn color="primary" @click="save">{{
        isNewTemplate ? 'Создать' : 'Сохранить'
      }}</v-btn>
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
