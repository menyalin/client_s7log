<template>
  <v-card>
    <v-card-title>{{
      isNewItem ? 'Новый водитель' : 'Редактировать'
    }}</v-card-title>
    <v-card-text>
      <v-text-field label="Полное имя" v-model="item.fullName" />
      <v-text-field label="Сокращенное имя" v-model="item.shortName" />
      <v-text-field label="Телефон 1" v-model="item.phone1" />
      <v-text-field label="Телефон 2" v-model="item.phone2" />
      <v-text-field label="Паспорт" v-model="item.passport" />
      <v-text-field label="Вод.удостоврение" v-model="item.driversLicense" />
      <v-text-field label="Примечание" v-model="item.note" />
    </v-card-text>
    <v-card-actions>
      <v-checkbox
        v-if="!isNewItem"
        v-model="item.isActive"
        label="Запись активна"
        class="pl-3"
      />
      <v-spacer />
      <v-btn @click="$emit('cancel')" color="primary">Отмена</v-btn>
      <v-btn @click="$emit('save', isNewItem)" color="primary">Сохранить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'DriverEditFormComponent',
  model: {
    prop: 'item',
    event: 'change'
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {},
  computed: {
    isNewItem() {
      return !this.item.id
    }
  }
}
</script>

<style></style>
