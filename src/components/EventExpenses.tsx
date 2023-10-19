import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import client from "../configs/graphql";
import { MemberRole } from "../constants";
import { DELETE_EXPENSE } from "../graphql/mutations";
import {
  GET_EXPENSES_BY_CATEGORY,
  GET_EXPENSES_OF_EVENT,
} from "../graphql/queries";
import PieChart from "./PieChart";
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

const EventExpenses = ({
  eventID,
  role,
}: {
  eventID: string;
  role: MemberRole;
}) => {
  const router = useRouter();
  const { data: expenses, loading } = useQuery(GET_EXPENSES_OF_EVENT, {
    client: client,
    fetchPolicy: "network-only",
    variables: {
      eventID,
    },
  });

  const { data: expensesByCategory } = useQuery(GET_EXPENSES_BY_CATEGORY, {
    client: client,
    fetchPolicy: "network-only",
    variables: {
      eventID,
    },
  });
  const categoriesWiseExpenses = expensesByCategory?.getExpensesByCategory;

  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    client: client,
    refetchQueries: [GET_EXPENSES_OF_EVENT, "GetExpensesOfEvent"],
  });
  const { toast } = useToast();

  const deleteExpenseHandler = async (id: string) => {
    try {
      const res = await deleteExpense({
        variables: {
          id,
        },
      });
      if (res.data) {
        toast({
          title: "Success",
          description: "Expense deleted successfully.",
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
  if (expenses?.getExpensesOfEvent?.length > 0) {
    data = expenses?.getExpensesOfEvent?.map((el: any) => {
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
                      deleteExpenseHandler(el.id);
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
        description="Expenses of event"
        title="Expenses"
        keysToExclude={["__typename"]}
        loading={loading}
        action={
          [MemberRole.ADMIN, MemberRole.OWNER].includes(role)
            ? "Add"
            : undefined
        }
        onAction={() => {
          router.push(`/dashboard/expense/add?event=${eventID}&disable=true`);
        }}
      />
      <div className="flex justify-center">
        <PieChart
          label="Rs."
          title="Expenses Breakdown By Category"
          data={categoriesWiseExpenses?.map((el: any) => {
            return {
              key: el.category,
              value: el.total,
            };
          })}
        />
      </div>
    </section>
  );
};

export default EventExpenses;
