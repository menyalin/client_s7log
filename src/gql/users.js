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