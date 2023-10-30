"use client";
import { useRouter } from "next/router";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "universal-cookie";

const Logout = () => {
  const router = useRouter();
  const logoutHandler = () => {
    const cookies = new Cookies(null, { path: "/" });
    cookies.remove("token");
    router.push("/auth/login");
  };
  return (
    <div>
      <button
        onClick={logoutHandler}
        className="bg-red-500 w-full text-white flex justify-center items-center py-2 mb-5"
      >
        <IoIosLogOut /> <p className="ml-2">Logout</p>
      </button>
    </div>
  );
};

export default Logout;
