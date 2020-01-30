<template>
  <v-container>
    <v-row>
      <v-col>
      
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  data: () => ({}),
  created() {
    this.$store.commit('openEditOrderForm')
  },
  components: {
    
  },
  computed: {
    ...mapGetters(['editedOrder'])
  },
  methods: {
    clickHandler() {
      this.$store.commit('openEditOrderForm')
    }
  }
}
</script>
