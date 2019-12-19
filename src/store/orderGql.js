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
      carType
      confirmDate
      confirmTime
      confirmedCarId
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
      managerId
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
  }
  
  `