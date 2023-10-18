import { gql } from "@apollo/client";

export const GET_EVENTS = gql` query GetEvents{
    events{
      id
      name
      endDate
      startDate
      description
      location
      
    }
  }`;

export const MY_EVENTS = gql`query MyEvents{
    myEvents{
      id
      name
      startDate
      endDate
      description
      location
    }
  }`

export const GET_EVENT = gql`query Event($id:ID!){
    event(id:$id){
      id
      name
      startDate
      endDate
      location
      description
    }
  }`;

export const GET_MEMBERS_OF_EVENT = gql`
  query GetMembersOfEvent($eventID:ID!){
  getMembersOfEvent(id:$eventID){
    id
    name
    phoneNumber
    role
    email
    
  }
}
  `

export const GET_SESSIONS_OF_EVENT = gql`
  query GetEventSessions($id:ID!){
  getEventSessions(id:$id){
    id
    name
    startTime
    endTime
    description
  }
}
  `

export const GET_USERS = gql`
  query GetUsers{
 users{
  id
  name
  } 
}
  `

export const GET_EXPENSES_OF_EVENT = gql`
  query GetExpensesOfEvent($eventID:ID!){
  getExpensesOfEvent(eventId:$eventID){
    id
    itemName
    cost
    description
    category
  }
  
}
  `

export const GET_EXPENSES_BY_CATEGORY = gql`query GetExpensesByCategory($eventID:ID!){
    getExpensesByCategory(eventId:$eventID){
     total
      category
    }
  }`