import { FetchResult, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Event } from "../../../../components/EventCard";
import { useToast } from "../../../../components/ui/use-toast";
import client from "../../../../configs/graphql";
import { ExpenseCategory } from "../../../../constants";
import { CREATE_EXPENSE } from "../../../../graphql/mutations";
import { UPDATE_EXPENSE } from "../../../../graphql/mutations/expense/expense.mutation";
import { GET_ACCESSIBLE_EVENTS } from "../../../../graphql/queries";
import DashboardLayout from "../../Layout";

interface IExpenseInput {
  eventID: string;
  itemName: string;
  cost: string;
  description: string;
  category: string;
}

const AddExpense = () => {
  const router = useRouter();
  const isEditMode = router?.query?.mode === "edit";
  const { toast } = useToast();
  const { data, loading, error } = useQuery(GET_ACCESSIBLE_EVENTS, {
    client: client,
    fetchPolicy: "network-only",
  });

  const [createExpense] = useMutation(CREATE_EXPENSE, {
    client: client,
  });
  const [updateExpense] = useMutation(UPDATE_EXPENSE, {
    client: client,
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IExpenseInput>({
    defaultValues: {
      eventID: (router?.query?.event as string) ?? "",
      itemName: (router?.query?.itemName as string) ?? "",
      cost: (router?.query?.cost as string) ?? "",
      description: (router?.query?.description as string) ?? "",
      category: (router?.query?.category as string) ?? "",
    },
  });

  const expenseHandler: SubmitHandler<IExpenseInput> = async (data) => {
    let res: FetchResult<any>;
    try {
      const { eventID, ...rest } = data;
      if (!isEditMode) {
        res = await createExpense({
          variables: {
            EventID: data.eventID,
            data: rest,
          },
        });
      } else {
        res = await updateExpense({
          variables: {
            id: router?.query?.id as string,
            data: rest,
          },
        });
      }
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
          description: `Expense ${
            isEditMode ? "updated " : "added "
          } successfully.`,
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
        {isEditMode ? "Update Expense" : "Add Expense"}
      </h2>
      <div>
        <form
          onSubmit={handleSubmit(expenseHandler)}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="font-medium">Event</label>
            <select
              value={router?.query?.event}
              {...register("eventID")}
              name="eventID"
              id="eventID"
              className="block w-full bg-gray-100 px-2 py-3 my-2"
              disabled={router?.query?.disable === "true"}
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
            {isEditMode ? "Update" : "Add"} Expense
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddExpense;
