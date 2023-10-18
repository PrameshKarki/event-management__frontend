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


export const CREATE_EXPENSE = gql`
mutation AddExpense($EventID:ID!,$data:ExpenseInput!){
  addExpense(eventId:$EventID,data:$data){
    success
    message
  }
}
`
export const ADD_SESSION = gql`
mutation CreateSession($eventID:ID!,$data:SessionInput!){
  createSession(eventID:$eventID,data:$data){
    success
    message
  }
}
`

export const ADD_MEMBERS_TO_THE_EVENT = gql`
mutation AddMembersToTheEvent($id:ID!,$data:AddMemberInput!){
  addMembersToEvent(id:$id,data:$data)
}
`

export const DELETE_EVENT = gql`
mutation DeleteEvent($id:ID!){
  deleteEvent(id:$id){
    success
    message
  }
}
`

export const DELETE_SESSION = gql`
mutation DeleteSession($id:ID!){
   deleteSession(id:$id){
    success
    message
  }
}`