import client from "../../../../configs/graphql";
import { useMutation } from "@apollo/client";
import { CREATE_EVENT } from "../../../../graphql/mutations";
import DashboardLayout from "../../Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Calendar } from "../../../../components/ui/calendar";
import { useToast } from "../../../../components/ui/use-toast";
import { useRouter } from "next/router";

interface IEventInput {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
}

const AddEvent = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [createEvent] = useMutation(CREATE_EVENT, {
    client: client,
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IEventInput>();

  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const addEventHandler: SubmitHandler<IEventInput> = async (data) => {
    try {
      const res = await createEvent({
        variables: {
          data,
        },
      });
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
          description: "Event created successfully.",
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

  return (
    <DashboardLayout>
      <h2 className="font-semibold text-xl mb-5">Create new event</h2>
      <div>
        <form
          onSubmit={handleSubmit(addEventHandler)}
          className="mt-8 space-y-5"
        >
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
            Create Event
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddEvent;
