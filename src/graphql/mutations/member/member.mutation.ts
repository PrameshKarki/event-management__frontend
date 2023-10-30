import { gql } from "@apollo/client";

export const UPDATE_MEMBER_TO_EVENT = gql` mutation UpdateMemberToEvent($eventID:ID!,$data:MemberInput!){
    updateMemberToEvent(eventID:$eventID,data:$data){
      success
      message
    }
  }`;