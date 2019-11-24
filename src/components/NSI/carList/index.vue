<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        {{ carPage.totalCar }}
        <v-data-table
          class="elevation-1"
          hide-default-footer
          :items="carPage.cars"
          :items-per-page="limit"
          :headers="headers"
          dense
        >
          <template v-slot:item.isOwned="{ item }">
            <v-icon v-if="item.isOwned" small color="green">mdi-check</v-icon>
          </template>
        </v-data-table>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="Math.floor(carPage.totalCar / limit) + 1 || 0"
            :total-visible="7"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
const carPageQuery = gql`
  query carPage($limit: Int!, $offset: Int!) {
    carPage(limit: $limit, offset: $offset) {
      cars {
        id
        title
        reg
        pts
        isOwned
        type
        maxPltCount
        note
      }
      totalCar
    }
  }
`

export default {
  data: () => ({
    page: 1,
    limit: 50,
    carPage: {},
    headers: [
      {
        text: 'Собственная',
        value: 'isOwned',
        align: 'center',
        sortable: false,
        width: '6em'
      },
      {
        text: 'Заголовок',
        value: 'title',
        align: 'left',
        sortable: false,
        width: '8em'
      },
      {
        text: 'Тип',
        value: 'type',
        align: 'left',
        sortable: false,
        width: '8em'
      },
      {
        text: 'Кол-во плт',
        value: 'maxPltCount',
        align: 'left',
        sortable: false,
        width: '8em'
      },

      {
        text: 'Гос.номер',
        value: 'reg',
        align: 'left',
        sortable: false,
        width: '8em'
      },
      {
        text: 'ПТС',
        value: 'pts',
        align: 'left',
        sortable: false,
        width: '8em'
      },
      {
        text: 'Примечание',
        value: 'note',
        align: 'left',
        sortable: false
      }
    ]
  }),
  apollo: {
    carPage: {
      query: carPageQuery,
      variables() {
        return {
          limit: this.limit,
          offset: (this.page - 1) * this.limit
        }
      }
    }
  }
}
</script>

<style></style>
