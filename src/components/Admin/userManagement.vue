<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :items="usersForAdminPanel"
          :headers="headers"
          class="elevation-1"
        >
          <template v-slot:item.isActive="{ item }">
            <div @click="changeUserStatus(item)">
              <v-icon color="green" v-if="item.isActive">mdi-check</v-icon>
              <v-icon v-else>mdi-skull-crossbones</v-icon>
            </div>
          </template>
          <template v-slot:item.dispatcher="{ item }">
            <div @click="changeDispatcherRole(item)">
              <v-icon color="green" v-if="isDispatcher(item)">
                mdi-check
              </v-icon>
              <v-icon v-else>mdi-skull-crossbones</v-icon>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  usersForAdminPanelQuery,
  createRoleMutation,
  deleteRoleMutation,
  changeUserStatusMutation,
  changeDispatcherRoleMutation
} from '@/gql/users'

export default {
  name: 'userManagement',
  methods: {
    isDispatcher(item) {
      return item.roles && item.roles.indexOf('dispatcher') !== -1
    },
    changeUserStatus(user) {
      this.$apollo
        .mutate({
          mutation: changeUserStatusMutation,
          variables: {
            userId: user.id,
            isActive: !user.isActive
          }
        })
        .catch(e => {
          this.$store.commit('setError', e.message)
        })
    },
    changeDispatcherRole(item) {
      let mutation = null
      if (this.isDispatcher(item)) mutation = deleteRoleMutation
      else mutation = createRoleMutation
      this.$apollo
        .mutate({
          mutation,
          variables: {
            userId: item.id,
            role: 'dispatcher'
          }
        })
        .then(() => {
          if (this.isDispatcher(item)) {
            let idx = item.roles.indexOf('dispatcher')
            if (idx !== -1) item.roles.splice(idx, 1)
          } else {
            item.roles.push('dispatcher')
          }
        })
    }
  },

  data: () => ({
    usersForAdminPanel: [],
    headers: [
      { text: 'id', value: 'id' },
      { text: 'Имя', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Доступ разрешен', value: 'isActive', align: 'center' },
      { text: 'Диспетчер', value: 'dispatcher', align: 'center' }
    ]
  }),
  apollo: {
    usersForAdminPanel: {
      query: usersForAdminPanelQuery
    }
  }
}
</script>

<style></style>
