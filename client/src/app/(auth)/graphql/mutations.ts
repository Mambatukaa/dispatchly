import { gql } from '@apollo/client'

export const SIGNIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
        phoneNumber
      }
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        id
        firstName
        lastName
        email
        phoneNumber
      }
    }
  }
`
