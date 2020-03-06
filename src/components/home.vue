<template>
  <v-container>
    <v-row>
      <v-col>
        <date-time-range v-model="range1" :isOpenRange="true" />
        range1: {{ range1 }}
        <date-time-range v-model="range2" :isOpenRange="true" />
        range2: {{ range2 }}
        <date-time-range v-model="range3" :isOpenRange="true" />
        range3: {{ range3 }}
        <date-time-range v-model="range4" :isOpenRange="true" />
        range4: {{ range4 }}
        <date-time-range v-model="range5" :isOpenRange="true" />
        range5: {{ range5 }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dateTimeRange from '@/components/common/dateTimeRange'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    range1: [
      { value: '1580958000000', inclusive: true },
      { value: '1580958000000', inclusive: true }
    ],
    range2: [
      {
        value: '1581044400000',
        inclusive: true
      },
      {
        value: null,
        inclusive: false
      }
    ],
    range3: '[2020-02-06 06:00,2020-02-06 18:00]',
    range4: '[2020-02-06 06:00,]',
    range5: null
  }),
  components: {
    dateTimeRange
  },
  computed: {
    ...mapGetters([])
  },
  methods: {}
}
</script>
