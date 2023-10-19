import { gql } from "@apollo/client";

export const UPDATE_EVENT = gql`
mutation UpdateEvent($id:ID!,$data:EventInput!){
  updateEvent(id:$id,data:$data){
    id
  }
}
`