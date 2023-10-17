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