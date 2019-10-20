<template>
  <v-card>
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item v-for="link of items" :key="link.id" :to="link.url">
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
      { id: '01', title: 'Новая заявка', url: '/orders/newOrder', icon: '' },
      { id: '02', title: 'Список заявок', url: '/orders/orderList', icon: '' }
    ]
  })
}
</script>