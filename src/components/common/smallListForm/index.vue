<template>
  <v-card class="ma-1">
    <v-container class="pa-0">
      <v-row no-gutters align="center">
        <v-col class="pa-0">
          <v-subheader>{{ listTitle }}</v-subheader>
        </v-col>
        <v-spacer />
        <!-- Кнопка создания нового документа -->
      </v-row>
    </v-container>
    <div v-if="!$apollo.queries.userPhones.loading">
      <div v-if="userPhones.length">
        <v-list two-line dense class="pt-0 pb-0">
          <v-list-item v-for="phone of userPhones" :key="phone._id">
            <v-list-item-content class="pl-3">
              <v-list-item-title :class="{title: phone.isMain}" class="pa-1">{{ phone.number }}</v-list-item-title>
              <v-list-item-subtitle>
                <span>{{ phone.type }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <app-edit-phone-modal
                :newPhone="false"
                :phone="phone"
                v-on:update-phones="updatePhoneList"
              />
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
      <div v-else class="pa-3">Телефоны не указаны</div>
    </div>
    <app-small-spinner v-else />
  </v-card>
</template>
<script>
export default {
  name: 'smallListForm',
  props: ['listTitle']
}
</script>