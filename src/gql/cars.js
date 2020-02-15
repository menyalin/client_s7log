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
      owner
      type
      maxPltCount
      note
      isActive
    }
  }
`
export const createCarMutation = gql`
  mutation createCar ($title: String! $listItem: Int $owner: String $regNumber: String $reg: String $pts: String $isOwned: Boolean $type: String! $maxPltCount: Int $note: String){
    createCar (
      title: $title
      listItem: $listItem
      regNumber: $regNumber
      reg: $reg
      pts: $pts
      owner: $owner
      isOwned: $isOwned
      type: $type
      maxPltCount: $maxPltCount
      note: $note
    ) {
      id
    }
  }
`
export const updateCarMutation = gql`
  mutation updateCar ($id: ID! $title: String! $listItem: Int $regNumber: String $isActive: Boolean $owner: String
                      $reg: String $pts: String $isOwned: Boolean $type: String! $maxPltCount: Int $note: String){
    updateCar (
      id: $id
      title: $title
      listItem: $listItem
      regNumber: $regNumber
      reg: $reg
      pts: $pts
      owner: $owner
      isOwned: $isOwned
      type: $type
      maxPltCount: $maxPltCount
      note: $note
      isActive: $isActive
    ) {
      id
    }
  }
`
export const carUnitQuery = gql`
  query getCarUnit ($date: String!  $truckId: String!) {
    carUnit (date: $date, truckId: $truckId) {
      id
      startDate
      truckId
      driverId1
      driverId2
      trailerId
      isActive
      note
    }
}
`
export const carUnitsPageQuery = gql`
  query carUnitsPage ($offset: Int $limit: Int) {
    carUnitsPage(offset: $offset limit: $limit) {
      carUnits {
        id
        startDate
        truckId
        driverId1
        driverId2
        trailerId
        isActive
        note
      }
      count
    } 
  }
`
export const createNewCarUnitMutation = gql`
  mutation createCarUnit ($startDate: String! $truckId: String! $trailerId: String $driverId1:String! $driverId2:String $note:String) {
    createCarUnit (startDate: $startDate truckId: $truckId trailerId: $trailerId driverId1: $driverId1 driverId2: $driverId2 note: $note ) {
      id
      startDate
      truckId
      driverId1
      driverId2
      trailerId
      isActive
      note
    }
  }
`

export const updateCarUnitMutation = gql`
  mutation updateCarUnit ($id: ID! $startDate: String! $truckId: String! $trailerId: String $driverId1:String! $driverId2:String $note:String) {
    updateCarUnit (id: $id startDate: $startDate truckId: $truckId trailerId: $trailerId driverId1: $driverId1 driverId2: $driverId2 note: $note ) {
      id
      startDate
      truckId
      driverId1
      driverId2
      trailerId
      isActive
      note
    }
  }
`
export const deleteCarUnitMutation = gql`
  mutation deleteCarUnit($id: ID!) {
    deleteCarUnit (id: $id) 
  }
`