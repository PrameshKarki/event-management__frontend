import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "../../components/ui/use-toast";
import client from "../../configs/graphql";
import { LOGIN_USER } from "../../graphql/mutations";

interface ILoginInput {
  email: string;
  password: string;
}
export interface User {
  email: string;
  id: string;
  accessToken: string;
}

const Login = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ILoginInput>();
  const [userLogin, { data, loading }] = useMutation(LOGIN_USER, {
    client: client,
  });

  const loginHandler: SubmitHandler<ILoginInput> = async (data) => {
    try {
      const res = await userLogin({
        variables: {
          data,
        },
      });
      if (res.data) {
        localStorage.setItem("token", res?.data?.userLogin?.accessToken ?? "");
        toast({
          title: "Success",
          description: "Logged in successfully.",
          variant: "success",
        });

        reset({
          email: "",
          password: "",
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

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 shadow-sm p-4">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(loginHandler)} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Email</label>

            <input
              {...register("email")}
              type="email"
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
            Sign in
          </button>
          <div className="text-center">
            <a href="javascript:void(0)" className="hover:text-indigo-600">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
