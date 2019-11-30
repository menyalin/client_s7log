<template>
  <div>
    <my-car-autocomplete label="Машина" v-model="shipper" />
    {{ shipper }}
  </div>
</template>

<script>
import myCarAutocomplete from '@/components/common/myCarAutocomplete'

export default {
  components: {
    myCarAutocomplete
  },
  data: () => ({
    shipper: ''
  })
}
</script>
