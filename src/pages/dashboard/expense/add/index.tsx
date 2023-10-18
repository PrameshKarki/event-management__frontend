import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Event } from "../../../../components/EventCard";
import { useToast } from "../../../../components/ui/use-toast";
import client from "../../../../configs/graphql";
import { ExpenseCategory } from "../../../../constants";
import { CREATE_EXPENSE } from "../../../../graphql/mutations";
import { MY_EVENTS } from "../../../../graphql/queries";
import DashboardLayout from "../../Layout";

interface IExpenseInput {
  eventID: string;
  itemName: string;
  cost: string;
  description: string;
  category: string;
}

const AddExpense = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { data, loading, error } = useQuery(MY_EVENTS, {
    client: client,
    fetchPolicy: "network-only",
  });

  const [createExpense] = useMutation(CREATE_EXPENSE, {
    client: client,
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IExpenseInput>();

  const addExpenseHandler: SubmitHandler<IExpenseInput> = async (data) => {
    try {
      const { eventID, ...rest } = data;
      const res = await createExpense({
        variables: {
          EventID: data.eventID,
          data: rest,
        },
      });
      if (res.data) {
        reset({
          eventID: "",
          itemName: "",
          cost: "",
          description: "",
          category: "",
        });
        toast({
          title: "Success",
          description: "Expense added successfully.",
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

  const myEvents = data?.myEvents as Event[];

  return (
    <DashboardLayout>
      <h2 className="font-semibold text-xl mb-5">Add Expense</h2>
      <div>
        <form
          onSubmit={handleSubmit(addExpenseHandler)}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="font-medium">Event</label>
            <select
              {...register("eventID")}
              name="eventID"
              id="eventID"
              className="block w-full bg-gray-100 px-2 py-3 my-2"
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
            <label className="font-medium">Name</label>
            <input
              {...register("itemName")}
              type="text"
              name="itemName"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Category</label>
            <select
              {...register("category")}
              name="category"
              id="category"
              className="block w-full bg-gray-100 px-2 py-3 my-2"
            >
              <option value="">Select Category</option>
              {Object.keys(ExpenseCategory).map((el) => {
                return <option value={el}>{el.toLocaleLowerCase()}</option>;
              })}
            </select>
          </div>
          <div>
            <label className="font-medium">Cost</label>
            <input
              {...register("cost")}
              type="number"
              name="cost"
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
            Add Expense
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddExpense;
