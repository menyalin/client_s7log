import gql from 'graphql-tag'

export const createDriverMutation = gql`
  mutation createDriver ($fullName: String, $shortName: String, $phone1: String, $phone2: String, $passport: String, $driversLicense: String, $note: String) {
    createDriver (fullName: $fullName, shortName: $shortName, phone1: $phone1, phone2: $phone2, passport: $passport, driversLicense: $driversLicense, note: $note) {
      id     
    }
  }
`
export const updateDriverMutation = gql`
  mutation updateDriver ($id: ID!, $fullName: String, $shortName: String, $phone1: String, $phone2: String, $passport: String, $driversLicense: String, $note: String) {
    updateDriver (id: $id, fullName: $fullName, shortName: $shortName, phone1: $phone1, phone2: $phone2, passport: $passport, driversLicense: $driversLicense, note: $note) {
      id     
    }
  }
`
export const driverUpdatedSubscription = gql`
  subscription {
    driverUpdated {
      id
      fullName
      shortName
      phone1
      phone2
      passport
      driversLicense
      note
      isActive
    }
  }
`
export const deleteDriverMutation = gql`
  mutation deleteDriver ($id: ID!) {
    deleteDriver(id: $id)
  }
`
export const driverDeletedSubscription = gql`
  subscription {
    driverDeleted {
      id
    }
  }
`

export const freeDriversQuery = gql`
  query freeDrivers ($dateRange: String! $carUnitId: String){
    freeDrivers (dateRange: $dateRange carUnitId: $carUnitId){
      id
      shortName
      phone1
      phone2
      passport
      driversLicense
      note
      isActive
    }
}
`