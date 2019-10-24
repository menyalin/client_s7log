import gql from 'graphql-tag'
export const isExistEmailQuery = gql`
  query isExistEmail($email: String!) {
    isExistEmail(email: $email)
  }
`
export const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`
export const SIGN_UP = gql`
  mutation($name: String, $email: String!, $password: String!) {
    signupUser(name: $name, email: $email, password: $password) {
      token
    }
  }
`
export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      _id
      email
      name
      avatar
      joinDate
    }
  }
`
