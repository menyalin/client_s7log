import newOrder from '@/components/Order/newOrder/index.vue'
import orderList from '@/components/OrderV2/orderList'

export default [
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
