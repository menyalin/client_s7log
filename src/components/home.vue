<template>
  <v-container>
    <v-row>
      <v-col>
        <orderEditDialog />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import orderEditDialog from '@/components/common/orderEditDialog_v2'
import { mapGetters } from 'vuex'

export default {
  data: () => ({}),
  components: {
    orderEditDialog
  },
  computed: {
    ...mapGetters([])
  },
  methods: {}
}
</script>
