import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import client from "../configs/graphql";
import { MemberRole } from "../constants";
import { DELETE_EVENT_MEMBER } from "../graphql/mutations";
import { GET_MEMBERS_OF_EVENT } from "../graphql/queries";
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

const EventMembers = ({
  eventID,
  role,
}: {
  eventID: string;
  role: MemberRole;
}) => {
  const router = useRouter();
  const members = useQuery(GET_MEMBERS_OF_EVENT, {
    client: client,
    fetchPolicy: "network-only",
    variables: {
      eventID,
    },
  });

  const [deleteMember] = useMutation(DELETE_EVENT_MEMBER, {
    client: client,
    refetchQueries: [GET_MEMBERS_OF_EVENT, "GetMembersOfEvent"],
  });
  const { toast } = useToast();

  const deleteMemberHandler = async (id: string) => {
    try {
      const res = await deleteMember({
        variables: {
          eventID,
          memberID: id,
        },
      });
      if (res.data) {
        toast({
          title: "Success",
          description: "Member deleted successfully.",
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

  let data = [];

  if (members?.data?.getMembersOfEvent?.length > 0) {
    data = members?.data?.getMembersOfEvent?.map((el: any) => {
      return {
        ...el,
        action: (
          <>
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
                      deleteMemberHandler(el.id);
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
        description="Members of event"
        title="Members"
        keysToExclude={["__typename"]}
        action={
          [MemberRole.ADMIN, MemberRole.OWNER, MemberRole.CONTRIBUTOR].includes(
            role
          )
            ? "Add"
            : undefined
        }
        onAction={() => {
          router.push(
            `/dashboard/members/add?event=${eventID}&disable=true&role=${
              role === MemberRole.CONTRIBUTOR ? MemberRole.ATTENDEE : ""
            }`
          );
        }}
      ></Table>
    </section>
  );
};

export default EventMembers;
