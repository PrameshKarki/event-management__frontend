import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import client from "../configs/graphql";
import { MemberRole } from "../constants";
import {
  GET_EXPENSES_BY_CATEGORY,
  GET_EXPENSES_OF_EVENT,
} from "../graphql/queries";
import PieChart from "./PieChart";
import Table from "./Table";

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

  return (
    <section className="member-section mt-4 shadow-md px-2 py-3 w-full">
      <Table
        data={expenses?.getExpensesOfEvent ?? []}
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
