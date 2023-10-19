import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import client from "../configs/graphql";
import { MemberRole } from "../constants";
import { DELETE_SESSION } from "../graphql/mutations";
import { GET_SESSIONS_OF_EVENT } from "../graphql/queries";
import { ROUTE_PATH } from "../routes/route";
import Table from "./Table";
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
const ALLOWED_ROLES = [MemberRole.ADMIN, MemberRole.OWNER];

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

  const [deleteSession] = useMutation(DELETE_SESSION, {
    client: client,
    refetchQueries: [GET_SESSIONS_OF_EVENT, "GetSessionsOfEvent"],
  });

  const { toast } = useToast();
  const deleteSessionHandler = async (id: string) => {
    try {
      const res = await deleteSession({
        variables: {
          id,
        },
      });
      if (res.data) {
        toast({
          title: "Success",
          description: "Session deleted successfully.",
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

  const editHandler = (data: any) => {
    router.push({
      pathname: ROUTE_PATH.DASHBOARD.SESSION.ADD,
      query: {
        event: eventID,
        disable: true,
        mode: "edit",
        ...data,
      },
    });
  };

  let data = [];
  if (sessions?.getEventSessions?.length > 0) {
    data = sessions?.getEventSessions?.map((el: any) => {
      if (!ALLOWED_ROLES.includes(role)) return el;
      return {
        ...el,
        action: (
          <>
            <button
              onClick={() => editHandler(el)}
              className="bg-indigo-600 p-1 text-sm text-white px-2 py-1 m-2"
            >
              <BiEdit size={18} />
            </button>
            <AlertDialog>
              <AlertDialogTrigger>
                <button className="bg-red-600 p-1 text-sm text-white px-2 py-1 my-2">
                  <AiOutlineDelete size={18} />
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
                    onClick={() => {
                      deleteSessionHandler(el.id);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ),
      };
    });
  }

  return (
    <section className="member-section mt-4 shadow-md px-2 py-3 w-full">
      <Table
        data={data}
        description="Sessions of event"
        title="Sessions"
        keysToExclude={["__typename"]}
        loading={loading}
        action={ALLOWED_ROLES.includes(role) ? "Add" : undefined}
        onAction={() => {
          router.push(`/dashboard/sessions/add?event=${eventID}&disable=true`);
        }}
      />
    </section>
  );
};

export default EventSessions;
