import React from "react";
import DashboardLayout from "../Layout";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  GET_EVENT,
  GET_MEMBERS_OF_EVENT,
  GET_SESSIONS_OF_EVENT,
} from "../../../graphql/queries";
import client from "../../../configs/graphql";
import dayjs from "dayjs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";
import { Event } from "../../../components/EventCard";
import Table from "../../../components/Table";
import EventMembers from "../../../components/EventMembers";
import EventSessions from "../../../components/EventSessions";

const EventDetails = () => {
  const router = useRouter();
  const data = useQuery(GET_EVENT, {
    client: client,
    variables: {
      id: router.query.id,
    },
  });

  const event = data?.data?.event as Event;
  return (
    <DashboardLayout>
      <h2 className="font-semibold text-xl mb-5">{event?.name}</h2>
      <div className="flex items-center gap-2">
        <AiOutlineClockCircle color="grey" />
        <p className="text-gray-600 text-sm">
          {dayjs(event?.startDate).format("MMMM D, YYYY")}-
          {dayjs(event?.endDate).format("MMMM D, YYYY")}
        </p>
      </div>
      <div className="flex items-center gap-2 my-1">
        <HiOutlineLocationMarker color="grey" />
        <p className="text-gray-600 text-sm">{event?.location}</p>
      </div>
      <div className="flex items-center gap-2">
        <CgDetailsMore color="grey" />
        <p className="text-gray-600 text-sm">{event?.description}</p>
      </div>
      <EventMembers eventID={event?.id} />
      <EventSessions eventID={event?.id} />
    </DashboardLayout>
  );
};

export default EventDetails;
