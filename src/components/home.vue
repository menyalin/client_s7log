<template>
  <div>
    <test-component label="Машины" v-model="shipper" />
    {{ shipper }}

    {{ dispatchersStaff }}
  </div>
</template>

<script>
import testComponent from '@/components/common/myCarAutocomplete/index.vue'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['dispatchersStaff'])
  },
  components: {
    testComponent
  },
  data: () => ({
    shipper: ''
  })
}
</script>
