import addressList from '@/components/NSI/addressList/index.vue'
import carList from '@/components/NSI/carList/index.vue'
import orderTemplateList from '@/components/NSI/orderTemplateList/index.vue'
import carWorkSchedule from '@/components/NSI/carWorkSchedule/index.vue'
import drivers from '@/components/NSI/drivers/index.vue'

export default [
  {
    path: 'addresses',
    component: addressList
  },
  {
    path: 'cars',
    component: carList
  },
  {
    path: 'orderTemplates',
    component: orderTemplateList
  },
  {
    path: 'carWorkSchedule',
    component: carWorkSchedule
  },
  {
    path: 'drivers',
    component: drivers
  }
]
