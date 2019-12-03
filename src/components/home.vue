<template>
  <div>
    <test-component label="Машины" v-model="shipper" />
    {{ shipper }}
  </div>
</template>

<script>
import testComponent from '@/components/common/myCarAutocomplete/index.vue'

export default {
  components: {
    testComponent
  },
  data: () => ({
    shipper: ''
  })
}
</script>
