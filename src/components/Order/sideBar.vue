<template>
  <v-card>
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item to="/orders/newOrder" round>
          <v-list-item-content>
            <v-list-item-title>New Order</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/orders/2">
          <v-list-item-content>
            <v-list-item-title>new order2</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  date: () => ({
    items: []
  })
}
</script>