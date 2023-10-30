import { FetchResult, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { Event } from "../../../../components/EventCard";
import { useToast } from "../../../../components/ui/use-toast";
import client from "../../../../configs/graphql";
import { MemberRole } from "../../../../constants";
import { ADD_MEMBERS_TO_THE_EVENT } from "../../../../graphql/mutations";
import { UPDATE_MEMBER_TO_EVENT } from "../../../../graphql/mutations/member/member.mutation";
import { GET_ACCESSIBLE_EVENTS, GET_USERS } from "../../../../graphql/queries";
import { ROUTE_PATH } from "../../../../routes/route";
import DashboardLayout from "../../Layout";

interface IMemberInput {
  id: string;
  role: string;
}

interface IAddMemberInput {
  id: string;
  members: IMemberInput[];
}

const AddMember = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_ACCESSIBLE_EVENTS, {
    client: client,
    fetchPolicy: "network-only",
  });
  const { data: users } = useQuery(GET_USERS, {
    client: client,
    fetchPolicy: "network-only",
  });

  const isEditMode = router?.query?.mode === "edit";

  const { toast } = useToast();
  const [addMembers] = useMutation(ADD_MEMBERS_TO_THE_EVENT, {
    client: client,
  });
  const [updateMember] = useMutation(UPDATE_MEMBER_TO_EVENT, {
    client: client,
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm<IAddMemberInput>({
    defaultValues: {
      id: (router?.query?.event as string) ?? "",
      members: [
        {
          id: (router?.query?.id as string) ?? "",
          role: Boolean(router?.query?.role?.length)
            ? (router?.query?.role as string)
            : "",
        },
      ],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "members",
    rules: {
      required: true,
    },
  });

  const addHandler: SubmitHandler<IAddMemberInput> = async (data) => {
    let res: FetchResult<any>;
    try {
      if (!isEditMode) {
        res = await addMembers({
          variables: {
            id: data.id,
            data: {
              members: data.members,
            },
          },
        });
      } else {
        res = await updateMember({
          variables: {
            eventID: data.id,
            // There always exist only one item in array
            data: data.members[0],
          },
        });
      }
      if (res.data) {
        reset({
          id: "",
          members: [
            {
              id: "",
              role: "",
            },
          ],
        });
        toast({
          title: "Success",
          description: `Members ${
            isEditMode ? "edited " : "added "
          } successfully.`,
          variant: "success",
        });
        router.push(ROUTE_PATH.DASHBOARD.EVENT.ROOT);
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message,
        variant: "destructive",
      });
    }
  };

  const myEvents = data?.getAccessibleEvents as Event[];
  const eligibleUsers = users?.users;

  return (
    <DashboardLayout>
      <h2 className="font-semibold text-xl mb-5">
        {isEditMode ? "Update Member" : "Add Members"}
      </h2>
      <div>
        <form onSubmit={handleSubmit(addHandler)} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Event</label>
            <select
              {...register("id")}
              name="id"
              id="id"
              className="block w-full bg-gray-100 px-2 py-3 my-2"
              value={router?.query?.event}
              disabled={router?.query?.disable === "true"}
              onChange={(e) => {
                replace([
                  {
                    id: "",
                    role: "",
                  },
                ]);
              }}
            >
              <option value="">Select Event</option>
              {myEvents?.map((el) => {
                return (
                  <option value={el.id}>{el?.name?.toLocaleLowerCase()}</option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="font-medium">Members</label>
            {fields.map((item, index) => (
              <div key={item.id} className="flex gap-2 items-center">
                <select
                  {...register(`members.${index}.role`)}
                  className="block w-full bg-gray-100 px-2 py-3 my-2"
                  value={
                    !isEditMode && Boolean(router?.query?.role)
                      ? router?.query?.role
                      : undefined
                  }
                  disabled={
                    !isEditMode &&
                    router?.query?.disable == "true" &&
                    Boolean(router?.query?.role?.length)
                  }
                >
                  <option value="">Select Role</option>
                  {Object.keys(MemberRole)?.map((el) => {
                    return <option value={el}>{el.toLocaleLowerCase()}</option>;
                  })}
                </select>
                <select
                  {...register(`members.${index}.id`)}
                  className="block w-full bg-gray-100 px-2 py-3 my-2"
                  disabled={isEditMode}
                  value={isEditMode ? router?.query?.id : undefined}
                >
                  <option value="">Select User</option>
                  {eligibleUsers?.map((el: any) => {
                    return <option value={el.id}>{el?.name}</option>;
                  })}
                </select>
                {!isEditMode && (
                  <AiOutlinePlus
                    className="cursor-pointer"
                    size={40}
                    onClick={() =>
                      append({
                        id: "",
                        role: "",
                      })
                    }
                  >
                    Add
                  </AiOutlinePlus>
                )}
                {fields.length !== 1 && (
                  <AiOutlineDelete
                    className="cursor-pointer"
                    size={40}
                    onClick={() => remove(index)}
                  >
                    Delete
                  </AiOutlineDelete>
                )}{" "}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            {isEditMode ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddMember;
