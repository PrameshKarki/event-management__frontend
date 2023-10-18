import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import client from "../configs/graphql";
import { MemberRole } from "../constants";
import { GET_SESSIONS_OF_EVENT } from "../graphql/queries";
import Table from "./Table";

const EventSessions = ({
  eventID,
  role,
}: {
  eventID: string;
  role: MemberRole;
}) => {
  const router = useRouter();
  const { data: sessions, loading } = useQuery(GET_SESSIONS_OF_EVENT, {
    client: client,
    fetchPolicy: "network-only",
    variables: {
      id: eventID,
    },
  });
  return (
    <section className="member-section mt-4 shadow-md px-2 py-3 w-full">
      <Table
        data={sessions?.getEventSessions ?? []}
        description="Sessions of event"
        title="Sessions"
        keysToExclude={["__typename"]}
        loading={loading}
        action={
          [MemberRole.ADMIN, MemberRole.OWNER].includes(role)
            ? "Add"
            : undefined
        }
        onAction={() => {
          router.push(`/dashboard/sessions/add?event=${eventID}&disable=true`);
        }}
      />
    </section>
  );
};

export default EventSessions;
