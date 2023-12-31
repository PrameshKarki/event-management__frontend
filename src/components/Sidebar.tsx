"use client";
import Link from "next/link";
import { useRouter } from "next/router";

import { BiMessageAltAdd } from "react-icons/bi";
import { BsCalendar4Event, BsPeople } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { ROUTE_PATH } from "../routes/route";
import Logout from "./Logout";

const navigation = [
  {
    href: ROUTE_PATH.DASHBOARD.ROOT,
    name: "All Events",
    icon: <BsCalendar4Event size={18} color="grey" />,
  },

  {
    href: ROUTE_PATH.DASHBOARD.EVENT.ROOT,
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
    href: ROUTE_PATH.DASHBOARD.EVENT.ADD,
    name: "Add New Event",
    icon: <MdOutlineEventAvailable size={22} color="grey" />,
  },
  {
    href: ROUTE_PATH.DASHBOARD.MEMBER.ADD,
    name: "Add Members",
    icon: <BsPeople size={20} color="grey" />,
  },
  {
    href: ROUTE_PATH.DASHBOARD.SESSION.ADD,
    name: "Add Session",
    icon: <BiMessageAltAdd size={22} color="grey" />,
  },
  {
    href: ROUTE_PATH.DASHBOARD.EXPENSE.ADD,
    name: "Add Expense",
    icon: <GiMoneyStack size={22} color="grey" />,
  },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-full border-r bg-white space-y-8 sm:w-64">
        <div className="flex flex-col justify-between h-full px-4">
          <div className="flex flex-col">
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
                {navigation.map((item, idx) => {
                  const isSelected = router.pathname === item.href;
                  const className = isSelected
                    ? "bg-gray-100 active:bg-gray-100 duration-150"
                    : "";

                  return (
                    <li key={idx} className="my-3">
                      <Link
                        href={item.href}
                        className={`flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150 ${className} }`}
                      >
                        <div className="text-gray-500">{item.icon}</div>
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <Logout />
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
