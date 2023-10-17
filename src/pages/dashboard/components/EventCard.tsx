import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";
import dayjs from "dayjs";

export interface Event {
  id: string;
  name: string;
  endDate: string;
  startDate: string;
  description: string;
  location: string;
  __typename: string;
}

interface IProps {
  event: Event;
}

const EventCard = (props: IProps) => {
  const { event } = props;
  return (
    <div className="shadow-sm px-3 min-w-[250px] min-h-[150px]">
      <h3 className="text-lg">{event.name}</h3>
      <div className="flex items-center gap-2">
        <AiOutlineClockCircle color="grey" />
        <p className="text-gray-600 text-sm">
          {dayjs(event.startDate).format("MMMM D, YYYY")}-
          {dayjs(event.endDate).format("MMMM D, YYYY")}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <HiOutlineLocationMarker color="grey" />
        <p className="text-gray-600 text-sm">{event.location}</p>
      </div>
      <div className="flex items-center gap-2">
        <CgDetailsMore color="grey" />
        <p className="text-gray-600 text-sm">{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;
