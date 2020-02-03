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
              <v-icon
                color="green"
                v-if="item.roles && item.roles.indexOf('dispatcher') !== -1"
              >
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
  changeUserStatusMutation,
  changeDispatcherRoleMutation
} from '@/gql/users'

export default {
  name: 'userManagement',
  methods: {
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
      this.$apollo.mutate({
        mutation: changeDispatcherRoleMutation,
        variables: {
          userId: item.id,
          isDispatcher: !(item.roles && item.roles.indexOf('dispatcher') !== -1)
        },
        update: (store, { data: { changeDispatcherRole } }) => {
          const data = store.readQuery({ query: usersForAdminPanelQuery })
          const tmpUser = data.usersForAdminPanel.find(
            item => item.id === changeDispatcherRole.userId
          )
          if (changeDispatcherRole.isActive) {
            tmpUser.roles.push('dispatcher')
          } else tmpUser.roles.splice(tmpUser.roles.indexOf('dispatcher'), 1)
        }
      })
    }
  },
  computed: {
    isDispatcher(item) {
      return item.roles && item.roles.indexOf('dispatcher') !== -1
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
