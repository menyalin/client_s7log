import gql from 'graphql-tag'

export const usersForAdminPanelQuery = gql`
  query usersForAdminPanel {
    usersForAdminPanel {
      id
      name
      email
      roles
      isActive
    }
  }
`
export const changeUserStatusMutation = gql`
  mutation changeUserStatus($userId: String!, $isActive: Boolean!) {
    changeUserStatus(userId: $userId, isActive: $isActive) {
      id
      isActive
    }
  }
`
export const changeDispatcherRoleMutation = gql`
  mutation changeDispatcherRole($userId: String!, $isDispatcher: Boolean!) {
    changeDispatcherRole(userId: $userId, isDispatcher: $isDispatcher) {
      id
      userId
      user {
        id
        name
        email
      }
      role
      isActive
    }
  }
`

export const createRoleMutation = gql`
  mutation createRole($userId: String! $role: String!){
    createRole (userId: $userId role: $role) {
      id
      userId
      user {
        id
        name
        email
      }
      role  
    }
  }
`

export const deleteRoleMutation = gql`
  mutation deleteRole($userId: String! $role: String!){
    deleteRole (userId: $userId role: $role) 
  }
`
export const deletedUserRolesSubscription = gql`
  subscription deletedUserRoles {
    deletedUserRoles
  }
`

export const createScheduleMutation = gql`
  mutation createSchedule($date: String! $userId: String! $type: String!) {
    createSchedule(date: $date userId: $userId type: $type ){
      id
    }
  }
`
export const updateScheduleMutation = gql`
  mutation updateSchedule ($id: ID! $date: String! $userId: String! $type: String!){
    updateSchedule (id: $id date: $date userId: $userId type: $type ){
      id
    }
  }
`

export const deleteScheduleMutation = gql`
  mutation deleteSchedule($id: ID!) {
    deleteSchedule(id: $id)
  }
`

export const deletedScheduleSubscription = gql`
  subscription deletedSchedule {
    deletedSchedule
  }
`
export const scheduleUpdatedSubscription = gql`
  subscription scheduleUpdated {
    scheduleUpdated {
      id
      type
      date
      user {
        id
        name
      }
    }
  }
`