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
    ) {
      id
      number
    }
  }
`
export const orderPageQuery = gql`
  query orderPage($limit: Int, $offset: Int) {
    orderPage(offset: $offset, limit: $limit) {
      orders {
        id
        carType
        number
        status
        dateRange {
          value
          inclusive
        }
        note
        shippingDate
        shippingTime
        deliveryDate
        deliveryTime
        shipperId
        shipper {
          id
          shortName
          address
          note
          partner
        }
        consigneeId
        consignee {
          id
          shortName
          address
          note
          partner
        }
        carId
        Car {
          id
          title
          isOwned
          type
          maxPltCount
        }
        isDriverNotified
        isClientNotified
      }
      orderCount
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
    }
  }
`
export const orderTemplatesQuery = gql`
  query orderTemplates {
    orderTemplates {
      id
      templateName
      carType
      status
      note
      shipperId
      consigneeId
      lengthCell
      showInMenu
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