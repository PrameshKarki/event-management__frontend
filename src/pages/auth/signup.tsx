"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useToast } from "../../components/ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import client from "../../configs/graphql";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../../graphql/mutations";

interface ISignupInput {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const Signup = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ISignupInput>();
  const [signupUser] = useMutation(SIGNUP_USER, {
    client: client,
  });

  const signupHandler: SubmitHandler<ISignupInput> = async (data) => {
    try {
      const res = await signupUser({
        variables: {
          data,
        },
      });
      if (res.data) {
        reset({
          email: "",
          name: "",
          password: "",
          phoneNumber: "",
        });
        toast({
          title: "Success",
          description: "Account created successfully.",
          variant: "success",
        });
        router.push("/auth/login");
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
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 shadow-sm p-4">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create a new account
            </h3>
            <p className="">
              Already have an account?{" "}
              <Link
                href={"/auth/login"}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(signupHandler)} className="mt-8 space-y-5">
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
            <label className="font-medium">Email</label>
            <input
              {...register("email")}
              type="email"
              name="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Phone Number</label>
            <input
              {...register("phoneNumber")}
              type="tel"
              name="phoneNumber"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              {...register("password")}
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signup;
