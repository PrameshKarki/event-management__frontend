import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation UserLogin($data:LoginInput!){
  userLogin(data:$data){
    accessToken
    id
    email
  }
}
`;


export const SIGNUP_USER = gql`
mutation UserSignUp($data:UserInput!){
  userSignUp(data:$data){
    id
    accessToken
    email
  }
}

`

export const CREATE_EVENT = gql`
mutation CreateEvent($data:EventInput!){
  createEvent(data:$data){
    id
  }
}
`