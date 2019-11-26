import newOrder from '@/components/Order/newOrder/index.vue'
import orderList from '@/components/OrderV2/orderList'
import allOrders from '@/components/OrderV2/allOrders/index.vue'

export default [
  {
    path: 'list',
    component: allOrders
  },
  {
    path: 'newOrder',
    component: newOrder
  },
  {
    path: '10tn',
    component: orderList,
    props: {
      carType: '10tn'
    }
  },
  {
    path: '20tn',
    component: orderList,
    props: {
      carType: '20tn'
    }
  }
]
