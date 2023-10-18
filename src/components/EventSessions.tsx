import { useQuery } from "@apollo/client";
import client from "../configs/graphql";
import { GET_SESSIONS_OF_EVENT } from "../graphql/queries";
import Table from "./Table";

const EventSessions = ({ eventID }: { eventID: string }) => {
  const { data: sessions, loading } = useQuery(GET_SESSIONS_OF_EVENT, {
    client: client,
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
      />
    </section>
  );
};

export default EventSessions;
