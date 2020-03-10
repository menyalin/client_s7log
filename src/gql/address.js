import gql from 'graphql-tag'

export const updateAddressMutation = gql`
  mutation updateAddress(
    $id: ID
    $address: String
    $partner: String
    $shortName: String
    $note: String
    $isShippingPlace: Boolean
    $isDeliveryPlace: Boolean
    $isActive: Boolean
  ) {
    updateAddress(
      id: $id
      address: $address
      partner: $partner
      shortName: $shortName
      note: $note
      isShippingPlace: $isShippingPlace
      isDeliveryPlace: $isDeliveryPlace
      isActive: $isActive
    ) {
      id
      shortName
      address
      partner
      note
      isShippingPlace
      isDeliveryPlace
      isActive
    }
  }
`

export const createAddressMutation = gql`
  mutation createAddress(
    $address: String
    $partner: String
    $shortName: String
    $note: String
    $isShippingPlace: Boolean
    $isDeliveryPlace: Boolean
  ) {
    createAddress(
      address: $address
      partner: $partner
      shortName: $shortName
      note: $note
      isShippingPlace: $isShippingPlace
      isDeliveryPlace: $isDeliveryPlace
    ) {
      id
      shortName
      address
      partner
      note
      isShippingPlace
      isDeliveryPlace
    }
  }
`