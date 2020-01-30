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
    ) {
      id
      number
      carId
      dateRange {
        value
      }
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
  ) {
    createOrderTemplate(
      carType: $carType
      shipperId: $shipperId
      consigneeId: $consigneeId
      status: $status
      note: $note
      templateName: $templateName
    ) {
      id
    }
  }`