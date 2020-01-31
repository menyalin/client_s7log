import orderV3 from '@/components/OrderV3/index.vue'

export default [
  {
    path: '10tn',
    component: orderV3,
    props: {
      carType: '10tn'
    }
  },
  {
    path: '20tn',
    component: orderV3,
    props: {
      carType: '20tn'
    }
  }

]
