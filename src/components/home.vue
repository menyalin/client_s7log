<template>
  <div>
    <my-partner-autocomplete
      label="Погрузка"
      v-model="shipper"
      placeType="deliveryPlace"
    />
    {{ shipper }}
  </div>
</template>

<script>
import myPartnerAutocomplete from '@/components/common/myPartnerAutocomplete'

export default {
  components: {
    myPartnerAutocomplete
  },
  data: () => ({
    shipper: null
  })
}
</script>
