<template>
  <div class="carWorkSchedule" :class="carWorkSchedule.type" />
</template>

<script>
export default {
  props: ['carWorkSchedule']
}
</script>

<style scoped>
.carWorkSchedule {
  width: 100%;
  height: 100%;
  height: 2rem;
}
.service {
  background-color: grey;
}
.holiday {
  background-color: goldenrod;
}
</style>
