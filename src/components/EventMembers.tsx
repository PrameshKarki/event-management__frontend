import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import client from "../configs/graphql";
import { MemberRole } from "../constants";
import { GET_MEMBERS_OF_EVENT } from "../graphql/queries";
import Table from "./Table";

const EventMembers = ({
  eventID,
  role,
}: {
  eventID: string;
  role: MemberRole;
}) => {
  const router = useRouter();
  const members = useQuery(GET_MEMBERS_OF_EVENT, {
    client: client,
    fetchPolicy: "network-only",
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
        action={
          [MemberRole.ADMIN, MemberRole.OWNER, MemberRole.CONTRIBUTOR].includes(
            role
          )
            ? "Add"
            : undefined
        }
        onAction={() => {
          router.push(
            `/dashboard/members/add?event=${eventID}&disable=true&role=${
              role === MemberRole.CONTRIBUTOR ? MemberRole.ATTENDEE : ""
            }`
          );
        }}
      />
    </section>
  );  
};

export default EventMembers;
