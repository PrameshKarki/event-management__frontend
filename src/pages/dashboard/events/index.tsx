import { useQuery } from "@apollo/client";
import EventCard, { Event } from "../../../components/EventCard";
import client from "../../../configs/graphql";
import { MY_EVENTS } from "../../../graphql/queries";
import DashboardLayout from "../Layout";

const Events = () => {
  const { data, loading, error } = useQuery(MY_EVENTS, {
    client: client,
    fetchPolicy: "network-only",
  });

  return (
    <DashboardLayout>
      <h2 className="font-semibold text-xl">My Events</h2>
      <p className="mb-5 text-gray-600 text-sm">
        These are the events in which you have administrative permission.
      </p>
      <section className="flex flex-wrap gap-6">
        {data?.myEvents?.map((event: Event) => (
          <EventCard event={event} showActions={true} />
        ))}
      </section>
    </DashboardLayout>
  );
};

export default Events;
