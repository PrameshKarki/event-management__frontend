import React from "react";
import client from "../../configs/graphql";
import { useQuery } from "@apollo/client";
import { GET_EVENTS, MY_EVENTS } from "../../graphql/queries";
import DashboardLayout from "./Layout";
import EventCard, { Event } from "./components/EventCard";

const Dashboard = () => {
  const { data, loading, error } = useQuery(GET_EVENTS, {
    client: client,
    fetchPolicy: "network-only",
  });

  return (
    <DashboardLayout>
      <h2 className="font-semibold text-xl mb-5">All Events</h2>
      <section className="flex flex-wrap gap-6">
        {data?.events?.map((event: Event) => (
          <EventCard event={event} />
        ))}
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
