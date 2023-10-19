import { FetchResult, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Event } from "../../../../components/EventCard";
import { useToast } from "../../../../components/ui/use-toast";
import client from "../../../../configs/graphql";
import { ADD_SESSION } from "../../../../graphql/mutations";
import { UPDATE_SESSION } from "../../../../graphql/mutations/session/session.mutation";
import { GET_ACCESSIBLE_EVENTS } from "../../../../graphql/queries";
import DashboardLayout from "../../Layout";

interface ISessionInput {
  eventID: string;
  name: string;
  startTime: string;
  endTime: string;
  description: string;
}

const AddSession = () => {
  const router = useRouter();
  const isEditMode = router?.query?.mode === "edit";
  const { data, loading, error } = useQuery(GET_ACCESSIBLE_EVENTS, {
    client: client,
    fetchPolicy: "network-only",
  });

  const { toast } = useToast();
  const [createSession] = useMutation(ADD_SESSION, {
    client: client,
  });
  const [updateSession] = useMutation(UPDATE_SESSION, {
    client: client,
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ISessionInput>({
    defaultValues: {
      eventID: (router?.query?.event as string) ?? "",
      name: (router?.query?.name as string) ?? "",
      description: (router?.query?.description as string) ?? "",
      endTime: (router?.query?.endTime as string) ?? "",
      startTime: (router?.query?.startTime as string) ?? "",
    },
  });

  const addSessionHandler: SubmitHandler<ISessionInput> = async (data) => {
    const { eventID, ...rest } = data;
    let res: FetchResult<any>;
    try {
      if (!isEditMode) {
        res = await createSession({
          variables: {
            eventID: data.eventID,
            data: rest,
          },
        });
      } else {
        res = await updateSession({
          variables: {
            id: router?.query?.id,
            data: rest,
          },
        });
      }
      if (res.data) {
        reset({
          eventID: "",
          name: "",
          startTime: "",
          endTime: "",
          description: "",
        });
        toast({
          title: "Success",
          description: `Session ${
            isEditMode ? "updated " : "added "
          }successfully.`,
          variant: "success",
        });
        router.push("/dashboard/events");
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
  return (
    <DashboardLayout>
      <h2 className="font-semibold text-xl mb-5">
        {isEditMode ? "Update Session" : "Add New Session"}
      </h2>
      <div>
        <form
          onSubmit={handleSubmit(addSessionHandler)}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="font-medium">Event</label>
            <select
              {...register("eventID")}
              name="eventID"
              id="eventID"
              className="block w-full bg-gray-100 px-2 py-3 my-2"
              value={router?.query?.event}
              disabled={router?.query?.disable === "true"}
            >
              <option value="">Select Event</option>
              {myEvents?.map((el) => {
                return (
                  <option value={el.id}>
                    {el?.name?.toLocaleLowerCase()}{" "}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="font-medium">Name</label>
            <input
              {...register("name")}
              type="text"
              name="name"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Start Time</label>
            <input
              {...register("startTime")}
              type="time"
              name="startTime"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">End Time</label>
            <input
              {...register("endTime")}
              name="endTime"
              type="time"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>

          <div>
            <label className="font-medium">Description</label>
            <textarea
              style={{
                resize: "none",
              }}
              {...register("description")}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            {isEditMode ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddSession;
