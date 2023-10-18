"use client";
import Link from "next/link";

import { AiOutlineMenu } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";

const navigation = [
  {
    href: "/dashboard",
    name: "All Events",
    icon: <AiOutlineMenu size={22} color="grey" />,
  },

  {
    href: "/dashboard/events",
    name: "My Events",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
      </svg>
    ),
  },
  {
    href: "/dashboard/events/add",
    name: "Add New Event",
    icon: <GrFormAdd size={22} color="grey" />,
  },
  {
    href: "/dashboard/sessions/add",
    name: "Add Session",
    icon: <GrFormAdd size={22} color="grey" />,
  },
  {
    href: "/dashboard/expense/add",
    name: "Add Expense",
    icon: <GrFormAdd size={22} color="grey" />,
  },
];

const Sidebar = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-full border-r bg-white space-y-8 sm:w-64">
        <div className="flex flex-col h-full px-4">
          <div className="h-20 flex items-center pl-2">
            <div className="w-full flex items-center gap-x-4">
              <img
                src="https://www.lftechnology.com/images/lf-logo.svg"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <span className="block text-gray-700 text-sm font-semibold">
                  Leapfrog Technology
                </span>
                <span className="block mt-px text-gray-600 text-xs">
                  Software Company
                </span>
              </div>
            </div>
          </div>
          <div className="overflow-auto">
            <ul className="text-sm font-medium flex-1">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                  >
                    <div className="text-gray-500">{item.icon}</div>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
