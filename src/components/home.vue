<template>
  <div>
    {{
      carWorkScheduleFiltered(
        '56560de5-e56a-44f2-a53e-f0ce270ad38d',
        '2019-12-26',
        '01'
      )
    }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['carWorkScheduleCells', 'carWorkScheduleFiltered'])
  }
}
</script>
