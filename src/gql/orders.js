import gql from 'graphql-tag'
export const updateOrderMutation = gql`
  mutation updateOrder(
    $id: ID!
    $carType: String!
    $dateRange: String!
    $shipperId: String
    $consigneeId: String
    $status: String
    $note: String
    $shippingDate: String
    $shippingTime: String
    $deliveryDate: String
    $deliveryTime: String
    $carId: String
    $isDriverNotified: Boolean
    $isClientNotified: Boolean
    $lengthCell: Int
    $templateId: String
    $attention: Boolean
    $driverId1: String
    $driverId2: String
    $trailerId: String
  ) {
    updateOrder(
      id: $id
      carType: $carType
      dateRange: $dateRange
      shipperId: $shipperId
      consigneeId: $consigneeId
      status: $status
      note: $note
      lengthCell: $lengthCell
      shippingDate: $shippingDate
      shippingTime: $shippingTime
      deliveryDate: $deliveryDate
      deliveryTime: $deliveryTime
      carId: $carId
      isDriverNotified: $isDriverNotified
      isClientNotified: $isClientNotified
      templateId: $templateId
      attention: $attention
      driverId1: $driverId1 
      driverId2: $driverId2
      trailerId: $trailerId
    ) {
      id
      number
    }
  }
`
// --------------------------------
export const confirmOrderMutation = gql`
  mutation confirmOrder(
    $id: ID!
    $carType: String!
    $dateRange: String!
    $carId: String
  ) {
    confirmOrder(
      id: $id
      carType: $carType
      dateRange: $dateRange
      carId: $carId
    ) {
      id
      number
    }
  }
`

export const createOrderMutation = gql`
  mutation createOrder(
    $carType: String!
    $dateRange: String!
    $shipperId: String
    $consigneeId: String
    $status: String
    $note: String
    $shippingDate: String
    $shippingTime: String
    $deliveryDate: String
    $deliveryTime: String
    $carId: String
    $lengthCell: Int
    $isDriverNotified: Boolean
    $isClientNotified: Boolean
    $templateId: String
    $attention: Boolean
      $driverId1: String
    $driverId2: String
    $trailerId: String
  ) {
    createOrder(
      carType: $carType
      dateRange: $dateRange
      shipperId: $shipperId
      consigneeId: $consigneeId
      status: $status
      note: $note
      shippingDate: $shippingDate
      shippingTime: $shippingTime
      deliveryDate: $deliveryDate
      deliveryTime: $deliveryTime
      lengthCell: $lengthCell
      carId: $carId
      isDriverNotified: $isDriverNotified
      isClientNotified: $isClientNotified
      templateId: $templateId
      attention: $attention
      driverId1: $driverId1 
      driverId2: $driverId2
      trailerId: $trailerId
    ) {
      id
    }
  }
`
export const createOrderTemplateMutation = gql`
  mutation createOrderTemplate(
    $carType: String!
    $shipperId: String
    $consigneeId: String
    $status: String
    $note: String
    $templateName: String
    $lengthCell: Int!
  ) {
    createOrderTemplate(
      carType: $carType
      shipperId: $shipperId
      consigneeId: $consigneeId
      status: $status
      note: $note
      templateName: $templateName
      lengthCell: $lengthCell
    ) {
      id
    }
  }`

export const ordersForVuexQuery = gql`
  query ordersForVuex($startDate: String, $endDate: String) {
    ordersForVuex(startDate: $startDate, endDate: $endDate) {
      id
      carType
      number
      status
      dateRange {
        value
        inclusive
      }
      shipperId
      consigneeId
      carId
      note
      shippingDate
      shippingTime
      deliveryDate
      deliveryTime
      lengthCell
      isDriverNotified
      isClientNotified
      templateId
      attention
      driverId1
      driverId2
      trailerId
    }
  }
`
export const orderAddedSubscription = gql`
  subscription orderAdded {
    orderAdded {
      id
      number
      carType
      status
      shipperId
      consigneeId
      note
      dateRange {
        value
        inclusive
      }
      shippingDate
      shippingTime
      deliveryDate
      deliveryTime
      isDriverNotified
      isClientNotified
      carId
      lengthCell
      templateId
      attention
      driverId1
      driverId2
      trailerId
    }
  }
`
export const orderUpdatedSubscription = gql`
  subscription orderUpdated {
    orderUpdated {
      id
      number
      carType
      status
      shipperId
      consigneeId
      note
      dateRange {
        value
        inclusive
      }
      shippingDate
      shippingTime
      deliveryDate
      deliveryTime
      isDriverNotified
      isClientNotified
      carId
      lengthCell
      templateId
      attention
      driverId1
      driverId2
      trailerId
    }
  }
`
export const updateTemplateMutation = gql`
  mutation updateTemplate(
    $id: ID!
    $carType: String!
    $lengthCell: Int!
    $shipperId: String
    $consigneeId: String
    $status: String
    $note: String
    $templateName: String
    $showInMenu: Boolean
  ) {
    updateTemplate(
      id: $id
      lengthCell: $lengthCell
      carType: $carType
      shipperId: $shipperId
      consigneeId: $consigneeId
      status: $status
      note: $note
      templateName: $templateName
      showInMenu: $showInMenu
    ) {
      id
    }
  }
`

export const orderTemplateUpdatedSubscription = gql`
  subscription orderTemplateUpdated {
    orderTemplateUpdated {
      id
      templateName
      carType
      status
      note
      shipperId
      consigneeId
      showInMenu
      lengthCell
    }
  }
`
export const deleteOrderTemplateMutation = gql`
  mutation deleteOrderTemplate($id: ID! ) { 
    deleteOrderTemplate(id: $id) 
    }
`
export const orderTemplateDeletedSubscription = gql`
  subscription orderTemplateDeleted {
    orderTemplateDeleted
  }
`