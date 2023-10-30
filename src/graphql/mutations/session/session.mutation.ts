import { gql } from "@apollo/client";

export const UPDATE_SESSION = gql`
mutation UpdateSession($id:ID!,$data:SessionInput!){
  updateSession(id:$id,data:$data){
    success
    message
  }
}
`