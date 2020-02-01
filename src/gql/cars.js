import gql from 'graphql-tag'

export const createCarWorkScheduleMutation = gql`
  mutation createCarWorkSchedule(
    $type: CarWorkScheduleType!
    $carId: String!
    $title: String
    $dateRange: String!
    $note: String
  ) {
    createCarWorkSchedule(
      type: $type
      carId: $carId
      title: $title
      dateRange: $dateRange
      note: $note
    ) {
      id
      type
      note
      dateRange {
        value
        inclusive
      }
      carId
    }
  }
`
export const updateCarWorkScheduleMutation = gql`
  mutation updateCarWorkSchedule(
    $id: ID!
    $type: CarWorkScheduleType!
    $title: String
    $carId: String!
    $dateRange: String!
    $note: String
  ) {
    updateCarWorkSchedule(
      id: $id
      type: $type
      title: $title
      carId: $carId
      dateRange: $dateRange
      note: $note
    ) {
      id
      type
      title
      note
      dateRange {
        value
        inclusive
      }
      carId
    }
  }
`
export const deleteCarWorkScheduleMutation = gql`
  mutation deleteCarWorkSchedule($id: ID!) {
    deleteCarWorkSchedule(id: $id)
  }
`
export const updatedCarWorkScheduleSubscription = gql`
  subscription updatedCarWorkSchedule {
    updatedCarWorkSchedule {
      id
      type
      note
      title
      dateRange {
        value
        inclusive
      }
      carId
    }
  }
`
export const deletedCarWorkScheduleSubscription = gql`
  subscription deletedCarWorkSchedule {
    deletedCarWorkSchedule
  }
`
export const carWorkScheduleForVuexQuery = gql`
  query carWorkScheduleForVuex {
    carWorkScheduleForVuex {
      id
      type
      note
      title
      dateRange {
        value
        inclusive
      }
      carId
    }
  }
`

export const carsForVuexQuery = gql`
  query allCars {
    carsForVuex {
      id
      title
      listItem
      regNumber
      isTempSlot
      reg
      pts
      isOwned
      type
      maxPltCount
      note
      isActive
    }
  }
`
export const carUpdatedSubscription = gql`
  subscription carUpdated {
    carUpdated {
      id
      title
      listItem
      regNumber
      reg
      pts
      isOwned
      type
      maxPltCount
      note
    }
  }
`
export const createCarMutation = gql`
  mutation createCar ($title: String! $listItem: Int $regNumber: String $reg: String $pts: String $isOwned: Boolean $type: String! $maxPltCount: Int $note: String){
    createCar (
      title: $title
      listItem: $listItem
      regNumber: $regNumber
      reg: $reg
      pts: $pts
      isOwned: $isOwned
      type: $type
      maxPltCount: $maxPltCount
      note: $note
    ) {
      id
    }
  }
`
