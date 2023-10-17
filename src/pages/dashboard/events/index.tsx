import React from "react";
import DashboardLayout from "../Layout";
import { useQuery } from "@apollo/client";
import { GET_EVENTS, MY_EVENTS } from "../../../graphql/queries";
import client from "../../../configs/graphql";
import EventCard, { Event } from "../../../components/EventCard";

const Events = () => {
  const { data, loading, error } = useQuery(MY_EVENTS, {
    client: client,
    fetchPolicy: "network-only",
  });

  return (
    <DashboardLayout>
      <h2 className="font-semibold text-xl mb-5">My Events</h2>
      <section className="flex flex-wrap gap-6">
        {data?.myEvents?.map((event: Event) => (
          <EventCard event={event} />
        ))}
      </section>
    </DashboardLayout>
  );
};

export default Events;
