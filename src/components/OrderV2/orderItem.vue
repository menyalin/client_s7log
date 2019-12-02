<template>
  <div
    class="order-container"
    :draggable="true"
    @dragstart="dragStartHandler($event, JSON.stringify(order))"
    @dblclick="dblClickHandler"
    :class="classes"
  >
    <v-dialog v-model="dialog" max-width="1024px" persistent>
      <order-edit-form
        v-model="order"
        @cancelEdit="cancelFormHandler"
        @createOrder="createOrderHandler"
        @updateOrder="updateOrderHandler"
      />
    </v-dialog>

    <div class="row-wrapper">
      <div class="col-title">
        <small>
          {{
            order.shipperId && isAddressesUpload
              ? addressById(order.shipperId).shortName
              : null
          }}
        </small>
      </div>
      <div class="col-time"></div>
    </div>
    <div>
      <div class="row-wrapper">
        <div class="col-title">
          <small>
            {{
              order.shipperId && isAddressesUpload
                ? addressById(order.consigneeId).shortName
                : null
            }}
          </small>
        </div>
        <div class="col-time"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import orderEditForm from './allOrders/orderEditForm.vue'

export default {
  name: 'orderItem',
  props: ['order'],
  components: {
    orderEditForm
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapGetters(['addressById', 'isAddressesUpload']),
    classes() {
      let resArr = []
      switch (this.order.status) {
        case 'Проблема': {
          resArr.push('problems')
          break
        }
        case 'На погрузке': {
          resArr.push('in-process')
          break
        }
        case 'Выполнен': {
          resArr.push('finished')
          break
        }
      }
      return resArr
    }
  },
  methods: {
    dragStartHandler(event, item) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('order', item)
    },
    cancelFormHandler() {
      this.dialog = false
    },
    dblClickHandler() {
      this.dialog = true
    }
  }
}
</script>

<style scoped>
.order-container {
  background-color: white;
  font-size: 0.7rem;
  color: black;
  width: 100%;
  max-width: 9em;
  height: 2rem;
  border-radius: 0.2em;
  display: flex;
  flex-direction: column;
  border: 1px grey solid;
  overflow: hidden;
  z-index: 4;
}
.col-title {
  flex: 5;
  padding-left: 2px;
  overflow: hidden;
}
.col-time {
  flex: 1;
}
.order-container:hover {
  box-shadow: 1px 1px 1px 1px rgba(5, 5, 5, 0.3);
}
.row-wrapper {
  display: flex;
  justify-content: space-around;
  justify-items: center;
}
.problems {
  background-color: rgba(248, 93, 21, 0.452);
}
.in-process {
  background-color: rgba(8, 153, 8, 0.596);
}
.finished {
  background-color: rgba(169, 169, 169, 0.349);
}
.tooltip-information {
  display: flex;
  font-size: 1.5em;
  flex-direction: column;
}
</style>
