import { gql } from "@apollo/client";

export const UPDATE_EXPENSE = gql`
mutation UpdateExpense($id:ID!,$data:ExpenseInput!){
  updateExpense(id:$id,data:$data){
    success
    message
  }
}
`