<template>
  <div class="carWorkSchedule" :class="carWorkSchedule.type">
    <div>{{ carWorkSchedule.title }}</div>
  </div>
</template>

<script>
export default {
  props: ['carWorkSchedule'],
  name: 'car-work-schedule'
}
</script>

<style scoped>
.carWorkSchedule {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 3rem;
  height: 1.7rem;
  overflow: hidden;
  font-size: 0.7em;
  border: 1px solid black;
}
.service {
  background-color: grey;
  color: #fff;
}
.holiday {
  background-color: goldenrod;
  color: #000;
}
</style>
