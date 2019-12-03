import gql from 'graphql-tag'
export const updateOrderMutation = gql`
  mutation updateOrder(
    $id: ID
    $carType: String
    $confirmDate: String
    $confirmTime: String
    $shipperId: String
    $consigneeId: String
    $status: String
    $note: String
    $shippingDate: String
    $shippingTime: String
    $deliveryDate: String
    $deliveryTime: String
    $confirmedCarId: String
    $isDriverNotified: Boolean
    $isClientNotified: Boolean
  ) {
    updateOrder(
      id: $id
      carType: $carType
      confirmDate: $confirmDate
      confirmTime: $confirmTime
      shipperId: $shipperId
      consigneeId: $consigneeId
      status: $status
      note: $note
      shippingDate: $shippingDate
      shippingTime: $shippingTime
      deliveryDate: $deliveryDate
      deliveryTime: $deliveryTime
      confirmedCarId: $confirmedCarId
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
        confirmDate
        confirmTime
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
        managerId
        manager {
          id
          name
        }
        confirmedCarId
        confirmedCar {
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
    $confirmDate: String
    $confirmTime: String
    $shipperId: String
    $consigneeId: String
    $status: String
    $note: String
    $shippingDate: String
    $shippingTime: String
    $deliveryDate: String
    $deliveryTime: String
    $confirmedCarId: String
    $isDriverNotified: Boolean
    $isClientNotified: Boolean
  ) {
    createOrder(
      carType: $carType
      confirmDate: $confirmDate
      confirmTime: $confirmTime
      shipperId: $shipperId
      consigneeId: $consigneeId
      status: $status
      note: $note
      shippingDate: $shippingDate
      shippingTime: $shippingTime
      deliveryDate: $deliveryDate
      deliveryTime: $deliveryTime
      confirmedCarId: $confirmedCarId
      isDriverNotified: $isDriverNotified
      isClientNotified: $isClientNotified
    ) {
      id
      number
      manager {
        id
        name
      }
      managerId
    }
  }
`