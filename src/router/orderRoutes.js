import newOrder from '@/components/Order/newOrder/index.vue'
import orderList from '@/components/OrderV3/index.vue'
import allOrders from '@/components/OrderV2/allOrders/index.vue'
import orderV3 from '@/components/OrderV3/index.vue'


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
  },
  {
    path: 'tests',
    component: orderV3
  }

]
