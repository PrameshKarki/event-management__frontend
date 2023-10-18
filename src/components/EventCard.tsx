import { useMutation } from "@apollo/client";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import client from "../configs/graphql";
import { DELETE_EVENT } from "../graphql/mutations";
import { GET_ACCESSIBLE_EVENTS, MY_EVENTS } from "../graphql/queries";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useToast } from "./ui/use-toast";

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
  showActions?: boolean;
}

const EventCard = (props: IProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { event, showActions } = props;
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    client: client,
    refetchQueries: [
      MY_EVENTS,
      "MyEvents",
      GET_ACCESSIBLE_EVENTS,
      "GetAccessibleEvents",
    ],
  });

  const deleteEventHandler = async (id: string) => {
    try {
      const res = await deleteEvent({
        variables: {
          id,
        },
      });
      if (res.data) {
        toast({
          title: "Success",
          description: "Event deleted successfully.",
          variant: "success",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message,
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <div className="shadow-sm px-3 min-w-[250px] min-h-[150px]">
        <Link href={`/dashboard/events/${event.id}`}>
          <h3 className="text-lg">{event.name}</h3>
          <div className="flex items-center gap-2">
            <AiOutlineClockCircle color="grey" />
            <p className="text-gray-600 text-sm">
              {dayjs(event.startDate).format("MMMM D, YYYY")}-
              {dayjs(event.endDate).format("MMMM D, YYYY")}
            </p>
          </div>
          <div className="flex items-center gap-2 my-1">
            <HiOutlineLocationMarker color="grey" />
            <p className="text-gray-600 text-sm">{event.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <CgDetailsMore color="grey" />
            <p className="text-gray-600 text-sm">{event.description}</p>
          </div>
        </Link>

        {/* Delete Button */}
        {showActions && (
          <AlertDialog>
            <AlertDialogTrigger>
              <button className="bg-red-600 text-sm text-white px-2 py-1 my-2">
                Delete
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-900"
                  onClick={() => deleteEventHandler(event.id)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </>
  );
};

export default EventCard;
