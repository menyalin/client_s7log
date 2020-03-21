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
        <div class="col-time">{{ timeForRow }}</div>
      </div>
    </template>
    <div class="tooltip--row">{{ tooltipText }} : {{ formatedDate }}</div>
  </v-tooltip>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: ['partnerId', 'date'],
  computed: {
    ...mapGetters(['isAddressesUpload', 'addressById']),
    tooltipText() {
      if (this.partnerId && this.isAddressesUpload)
        return `${this.addressById(this.partnerId).partner} - ${
          this.addressById(this.partnerId).shortName
        } - ${this.addressById(this.partnerId).address}`
      else return null
    },
    formatedDate() {
      if (this.date)
        return moment(+this.date || this.date).format('DD.MM.YYYY HH:mm')
      else return null
    },
    timeForRow() {
      if (this.date) {
        let tmpDate = moment(+this.date || this.date)
        if (tmpDate._isValid) {
          return tmpDate.format('HH:mm') !== '00:00'
            ? tmpDate.format('HH')
            : null
        } else return null
      } else return null
    }
  }
}
</script>

<style scoped>
.row-wrapper {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  justify-items: center;
}
.col-title {
  flex: 8;
  padding-left: 1px;
  overflow: hidden;
  white-space: nowrap;
}
.col-time {
  flex: 1;
  padding-right: 2px;
  text-align: right;
}
.tooltip--row {
  font-size: 0.8rem;
  min-width: 150px;
}
</style>
