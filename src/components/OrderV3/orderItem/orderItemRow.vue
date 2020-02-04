<template>
  <v-tooltip bottom open-delay="700" color="blue-grey darken-3">
    <template v-slot:activator="{ on }">
      <div class="row-wrapper">
        <div class="col-title" v-on="on">
          {{
          partnerId && isAddressesUpload
          ? addressById(partnerId).shortName
          : null
          }}
        </div>
        <div class="col-time">{{ time ? time.slice(0, 2) : '' }}</div>
      </div>
    </template>
    <div class="tooltip--row">{{ tooltipText }}</div>
  </v-tooltip>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['partnerId', 'time', 'date'],
  computed: {
    ...mapGetters(['isAddressesUpload', 'addressById']),
    tooltipText() {
      if (this.partnerId && this.isAddressesUpload)
        return `${this.addressById(this.partnerId).partner} - ${
          this.addressById(this.partnerId).shortName
        } - ${this.addressById(this.partnerId).address}`
      else return null
    }
  }
}
</script>

<style scoped>
.row-wrapper {
  display: flex;
  min-height: 1rem;
  flex-wrap: nowrap;
  justify-content: space-around;
  justify-items: center;
}
.col-title {
  flex: 8;
  padding-left: 1px;
  overflow: hidden;
}
.col-time {
  flex: 1;
  padding-right: 1px;
}
.tooltip--row {
  font-size: 1rem;
  min-width: 150px;
}
</style>
