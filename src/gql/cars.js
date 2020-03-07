import gql from 'graphql-tag'

export const createCarWorkScheduleMutation = gql`
  mutation createCarWorkSchedule(
    $type: CarWorkScheduleType!
    $carId: String
    $trailerId: String
    $driverId: String
    $title: String
    $dateRange: String!
    $note: String
  ) {
    createCarWorkSchedule(
      type: $type
      carId: $carId
      trailerId: $trailerId
      driverId: $driverId
      title: $title
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
      trailerId
      driverId
    }
  }
`
export const updateCarWorkScheduleMutation = gql`
  mutation updateCarWorkSchedule(
    $id: ID!
    $type: CarWorkScheduleType!
    $title: String
    $carId: String
    $trailerId: String
    $driverId: String
    $dateRange: String!
    $note: String
  ) {
    updateCarWorkSchedule(
      id: $id
      type: $type
      title: $title
      carId: $carId
      trailerId: $trailerId
      driverId: $driverId
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
      trailerId
      driverId
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
      trailerId
      driverId
    }
  }
`
export const deletedCarWorkScheduleSubscription = gql`
  subscription deletedCarWorkSchedule {
    deletedCarWorkSchedule
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
      dateRange {
        value
        inclusive
      }
      truckId
      driver1Id
      driver2Id
      trailerId
      isActive
      note
    }
}
`
export const carUnitUpdatedSubscription = gql`
  subscription carUnitUpdated{
    carUnitUpdated {
      id
      dateRange {
        value
        inclusive
      }
      truckId
      driver1Id
      driver2Id
      trailerId
      isActive
      note
    }
  }
`
export const carUnitDeletedSubscription = gql`
  subscription carUnitDeleted {
    carUnitDeleted
  }
`
export const carUnitsPageQuery = gql`
  query carUnitsPage ($offset: Int $limit: Int, $driver: String $truckId: String $trailerId: String $date: String) {
    carUnitsPage(offset: $offset limit: $limit driver:$driver truckId: $truckId trailerId: $trailerId date: $date) {
      carUnits {
        id
        dateRange {
          value
          inclusive
        }
        truckId
        driver1Id
        driver2Id
        trailerId
        isActive
        note
      }
      count
    } 
  }
`
export const carWorkSchedulePagesQuery = gql`
  query CarWorkSchedulePages($offset:Int $limit:Int!) {
    carWorkSchedulePage(offset: $offset limit: $limit) {
      carWorkSchedule{ 
        id
        carId
        trailerId
        driverId
        type
        dateRange {
          value
        }
        title
        note
      }
      count
    }
  }
`

export const createCarUnitMutation = gql`
  mutation createCarUnit ($dateRange: String! $truckId: String! $trailerId: String $driver1Id:String! $driver2Id:String $note:String) {
    createCarUnit (dateRange: $dateRange truckId: $truckId trailerId: $trailerId driver1Id: $driver1Id driver2Id: $driver2Id note: $note ) {
      id
      dateRange {
        value
        inclusive
      }
      truckId
      driver1Id
      driver2Id
      trailerId
      isActive
      note
    }
  }
`

export const updateCarUnitMutation = gql`
  mutation updateCarUnit ($id: ID! $dateRange: String! $truckId: String! $trailerId: String $driver1Id:String! $driver2Id:String $note:String) {
    updateCarUnit (id: $id dateRange: $dateRange truckId: $truckId trailerId: $trailerId driver1Id: $driver1Id driver2Id: $driver2Id note: $note ) {
      id
      dateRange {
        value
        inclusive
      }
      truckId
      driver1Id
      driver2Id
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

export const freeCarsQuery = gql`
  query freeCars ($dateRange: String! $carUnitId: String){
    freeCars (dateRange: $dateRange carUnitId: $carUnitId){
      id
      title
      listItem
      regNumber
      reg
      pts
      isTempSlot
      isOwned
      owner
      type
      maxPltCount
      note
      isActive
      createdAt
      updatedAt
    }
}
`