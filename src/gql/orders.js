import gql from 'graphql-tag'
export const deleteOrderMutation = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder (id: $id) {
      id
    }
  }
`
export const orderDeletedSubscription = gql`
  subscription orderDeleted {
    orderDeleted {
      id
    }
  }
`

export const updateOrderMutation = gql`
  mutation updateOrder(
    $id: ID!
    $carType: String!
    $dateRange: String!
    $shipperId: String
    $consigneeId: String
    $status: String
    $note: String
    $plannedShippingDate: String
    $plannedDeliveryDate: String
    $loadingStart: String
    $loadingEnd: String
    $unLoadingStart: String
    $unLoadingEnd: String
    $carId: String
    $isDriverNotified: Boolean
    $isClientNotified: Boolean
    $lengthCell: Int
    $templateId: String
    $attention: Boolean
    $driver1Id: String
    $driver2Id: String
    $trailerId: String
    $plannedCarType: String
    $weight: String
    $pltCount: String
    $price: String
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
      plannedShippingDate: $plannedShippingDate
      plannedDeliveryDate: $plannedDeliveryDate
      loadingStart: $loadingStart
      loadingEnd: $loadingEnd
      unLoadingStart: $unLoadingStart
      unLoadingEnd: $unLoadingEnd
      carId: $carId
      isDriverNotified: $isDriverNotified
      isClientNotified: $isClientNotified
      templateId: $templateId
      attention: $attention
      driver1Id: $driver1Id 
      driver2Id: $driver2Id
      trailerId: $trailerId
      plannedCarType: $plannedCarType
      weight: $weight
      pltCount: $pltCount
      price: $price
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
    $plannedShippingDate: String
    $plannedDeliveryDate: String
    $loadingStart: String
    $loadingEnd: String
    $unLoadingStart: String
    $unLoadingEnd: String
    $carId: String
    $lengthCell: Int
    $isDriverNotified: Boolean
    $isClientNotified: Boolean
    $templateId: String
    $attention: Boolean
    $driver1Id: String
    $driver2Id: String
    $trailerId: String
    $plannedCarType: String
    $weight: String
    $pltCount: String
    $price: String
  ) {
    createOrder(
      carType: $carType
      dateRange: $dateRange
      shipperId: $shipperId
      consigneeId: $consigneeId
      status: $status
      note: $note
      plannedShippingDate: $plannedShippingDate
      plannedDeliveryDate: $plannedDeliveryDate
      loadingStart: $loadingStart
      loadingEnd: $loadingEnd
       unLoadingStart: $unLoadingStart
      unLoadingEnd: $unLoadingEnd
      lengthCell: $lengthCell
      carId: $carId
      isDriverNotified: $isDriverNotified
      isClientNotified: $isClientNotified
      templateId: $templateId
      attention: $attention
      driver1Id: $driver1Id 
      driver2Id: $driver2Id
      trailerId: $trailerId
      plannedCarType: $plannedCarType
      weight: $weight
      pltCount: $pltCount
      price: $price
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
    $plannedCarType: String
    $weight: String
    $pltCount: String
    $price: String
  ) {
    createOrderTemplate(
      carType: $carType
      shipperId: $shipperId
      consigneeId: $consigneeId
      status: $status
      note: $note
      templateName: $templateName
      lengthCell: $lengthCell
      plannedCarType: $plannedCarType
      weight: $weight
      pltCount: $pltCount
      price: $price
    ) {
      id
    }
  }`


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
      plannedShippingDate
      plannedDeliveryDate
      loadingStart
      loadingEnd
      unLoadingStart
      unLoadingEnd
      isDriverNotified
      isClientNotified
      carId
      lengthCell
      templateId
      attention
      driver1Id
      driver2Id
      trailerId
      plannedCarType
      weight
      pltCount
      price
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
      plannedShippingDate
      plannedDeliveryDate
      loadingStart
      loadingEnd
      unLoadingStart
      unLoadingEnd
      isDriverNotified
      isClientNotified
      carId
      lengthCell
      templateId
      attention
      driver1Id
      driver2Id
      trailerId
      plannedCarType
      weight
      pltCount
      price
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
     $plannedCarType: String
    $weight: String
    $pltCount: String
    $price: String
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
      plannedCarType: $plannedCarType
      weight: $weight
      pltCount: $pltCount
      price: $price
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
      plannedCarType
      weight
      pltCount
      price
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