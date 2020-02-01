<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          class="elevation-1"
          :items="cars"
          :items-per-page="limit"
          :headers="headers"
          dense
          align="center"
          @click:row="clickRowHandler"
          :footer-props="{
            'items-per-page-options': [40, 80, 120, -1]
          }"
        >
          <template v-slot:top>
            <v-container fluid>
              <v-row align="center">
                <v-col cols="auto">
                  <v-btn color="secondary" dark @click="newCarHandler">
                    <v-icon>mdi-plus</v-icon>Добавить
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-data-table>
        <v-dialog v-model="dialog" max-width="1024px" persistent>
          <car-work-schedule-form
            v-model="editedSchedule"
            @cancelEdit="cancelHandler"
            @createSchedule="createScheduleHandler"
            @updateSchedule="updateScheduleHandler"
            @deleteCarWorkSchedule="deleteCarWorkScheduleHandler"
          />
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CarList',
  data: () => ({
    headers: [
      { text: ' Тип', value: 'type' },
      { text: 'Заголовок', value: 'title' },
      { text: '№ списке', value: 'listItem' },
      { text: 'Собственная', value: 'isOwned' },
      { text: 'Кол-во плт', value: 'maxPltCount' },
      { text: 'Примечание', value: 'note' }
    ]
  }),
  computed: {
    ...mapGetters(['cars'])
  }
}
</script>

<style></style>
