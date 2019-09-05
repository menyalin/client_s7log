import gql from 'graphql-tag'

export const GET_POSTS = gql`
    query {
        getPosts {
            _id
            title
            imageUrl
            description
        }
    } `

export const isExistEmailQuery = gql`
    query isExistEmail ($email: String!) {
        isExistEmail(email: $email)
    }
`

export const SIGN_IN = gql`
    mutation ($email: String!, $password: String!) {
        signinUser(email: $email, password: $password) {
            token
        }
    }
`

export const SIGN_UP = gql`
    mutation ($name: String, $email: String!, $password: String!) {
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
            favorites {
                _id
                title
                imageUrl
                categories
            }
        }
    }
`

export const ChatMessageAdddedSubscription = gql`
    subscription subsc {
        chatMessageAdded {
            _id
            text
        }
    }
`
export const getMessages = gql`
    query getMessages {
        getMessages {
            _id
            text
        }
    }
`
export const getActiveUsers = gql`
    query getActiveUsers {
        getActiveUsers {
            socketId
            user{
                _id
                name
            }
        }
    }
`
export const changeActiveUsers = gql`
    subscription changeActiveUsers {
        changeActiveUsers {
            socketId
        }
    }
`
