<template>
  <v-container>
    <v-row>
      <v-col>
        <date-time-range v-model="input1" />
        input 1: {{ input1 || 'null' }}
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col>
        <date-time-range v-model="input2" />
        input 2: {{ input2 || 'null' }}
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col>
        <date-time-range v-model="input3" />
        input 3: {{ input3 || 'null' }}
      </v-col>
    </v-row>
    <v-divider />
  </v-container>
</template>

<script>
import dateTimeRange from '@/components/common/dateTimeRange'
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    input1: null,
    input2: '[2019-12-01,2020-02-01]',
    input3: [
      {
        value: '1575752400000',
        inclusive: true
      },
      {
        value: '1577998800000',
        inclusive: true
      }
    ],
    input4: []
  }),
  components: {
    dateTimeRange
  },
  computed: {
    ...mapGetters([])
  }
}
</script>
