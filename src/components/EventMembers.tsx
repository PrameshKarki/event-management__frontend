import React from "react";
import Table from "./Table";
import { useQuery } from "@apollo/client";
import { GET_MEMBERS_OF_EVENT } from "../graphql/queries";
import client from "../configs/graphql";

const EventMembers = ({ eventID }: { eventID: string }) => {
  const members = useQuery(GET_MEMBERS_OF_EVENT, {
    client: client,
    fetchPolicy:"network-only",
    variables: {
      eventID,
    },
    
  });

  return (
    <section className="member-section mt-4 shadow-md px-2 py-3 w-full">
      <Table
        data={members?.data?.getMembersOfEvent ?? []}
        description="Members of event"
        title="Members"
        keysToExclude={["__typename"]}
      />
    </section>
  );
};

export default EventMembers;
