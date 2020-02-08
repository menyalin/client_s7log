<template>
  <v-card>
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item v-for="link of items" :key="link.id" :to="link.url">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: [
      { id: '01', title: 'Адреса', url: '/nsi/addresses', icon: 'mdi-city' },
      { id: '02', title: 'Машины', url: '/nsi/cars', icon: 'mdi-truck' },
      {
        id: '03',
        title: 'Водители',
        url: '/nsi/drivers',
        icon: 'mdi-human-greeting'
      },
      {
        id: '04',
        title: 'Шаблоны заказов',
        url: '/nsi/orderTemplates',
        icon: 'mdi-file-document-box'
      },
      {
        id: '05',
        title: 'График работы машин',
        url: '/nsi/carWorkSchedule',
        icon: 'mdi-calendar-text'
      }
    ]
  })
}
</script>
