<template>
  <v-dialog :value="dialog" max-width="1024" persistent>
    <v-card>
      <v-card-title class="headline">Форма редактирование заказа</v-card-title>
      <v-card-text>
        <v-container fluid fill-height class="pa-0 ma-0">
          <v-row>
            <v-col>
              <v-autocomplete label="Статус" :items="orderStatus" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancelHandler">Отмена</v-btn>
        <v-btn color="primary" text @click="acceptHandler">Ок</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['dialog', 'order'],
  data: () => ({
    orderStatus: ['Новый', 'На погрузке', 'Выполнен', 'Проблемы']
  }),
  methods: {
    acceptHandler() {
      this.$emit('change', false)
    },
    cancelHandler() {
      this.$emit('change', false)
    }
  },
  model: {
    prop: 'dialog',
    event: 'change'
  }
}
</script>

<style>
</style>