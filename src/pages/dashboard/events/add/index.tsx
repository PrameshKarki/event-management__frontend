import { FetchResult, useMutation } from "@apollo/client";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "../../../../components/ui/use-toast";
import client from "../../../../configs/graphql";
import { CREATE_EVENT } from "../../../../graphql/mutations";
import { UPDATE_EVENT } from "../../../../graphql/mutations/event/event.mutation";
import { ROUTE_PATH } from "../../../../routes/route";
import DashboardLayout from "../../Layout";

interface IEventInput {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
}

const AddEvent = () => {
  const router = useRouter();
  const isEditMode = router.query.mode === "edit";
  const { toast } = useToast();
  const [createEvent] = useMutation(CREATE_EVENT, {
    client: client,
  });
  const [updateEvent] = useMutation(UPDATE_EVENT, {
    client: client,
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IEventInput>({
    defaultValues: {
      name: (router?.query?.name as string) ?? "",
      location: (router?.query?.location as string) ?? "",
      description: (router?.query?.description as string) ?? "",
      startDate: router?.query?.startDate
        ? dayjs(router?.query?.startDate as string).format("YYYY-MM-DD")
        : "",
      endDate: router?.query?.endDate
        ? dayjs(router?.query?.endDate as string).format("YYYY-MM-DD")
        : "",
    },
  });

  const eventHandler: SubmitHandler<IEventInput> = async (data) => {
    try {
      let res: FetchResult<any>;

      if (!isEditMode) {
        res = await createEvent({
          variables: {
            data,
          },
        });
      } else {
        res = await updateEvent({
          variables: {
            data,
            id: router.query.id,
          },
        });
      }

      if (res.data) {
        reset({
          name: "",
          location: "",
          description: "",
          startDate: "",
          endDate: "",
        });
        toast({
          title: "Success",
          description: `Event ${
            isEditMode ? "updated" : "created"
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

  return (
    <DashboardLayout>
      <h2 className="font-semibold text-xl mb-5">
        {isEditMode ? "Edit Event" : "Create new event"}
      </h2>
      <div>
        <form onSubmit={handleSubmit(eventHandler)} className="mt-8 space-y-5">
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
            <label className="font-medium">Location</label>
            <input
              {...register("location")}
              type="text"
              name="location"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Start Date</label>
            <input
              {...register("startDate")}
              type="date"
              name="startDate"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">End Date</label>
            <input
              {...register("endDate")}
              name="endDate"
              type="date"
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

export default AddEvent;
