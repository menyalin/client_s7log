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