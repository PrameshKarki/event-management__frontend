import { useQuery } from "@apollo/client";
import EventCard, { Event } from "../../components/EventCard";
import client from "../../configs/graphql";
import { GET_ACCESSIBLE_EVENTS } from "../../graphql/queries";
import DashboardLayout from "./Layout";

const Dashboard = () => {
  const { data, loading, error } = useQuery(GET_ACCESSIBLE_EVENTS, {
    client: client,
    fetchPolicy: "network-only",
  });

  return (
    <DashboardLayout>
      <h2 className="font-semibold text-xl">All Events</h2>
      <p className="mb-5 text-gray-600 text-sm">
        These are the events in which you can attend or manage.
      </p>{" "}
      <section className="flex flex-wrap gap-6">
        {data?.getAccessibleEvents?.map((event: Event) => (
          <EventCard event={event} />
        ))}
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
