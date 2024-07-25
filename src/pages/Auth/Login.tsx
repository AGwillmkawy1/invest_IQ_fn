import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "react-loading";
import { useAuthContext } from "../../context/AuthContext";
import { handleLogin } from "../../utils/logUser";
import { LoginReqDto } from "../../interfaces/interfaces";

export default function Login() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvestor, setIsInvestor] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { register, handleSubmit } = useForm<LoginReqDto>();

  async function handleLoginFunc(formData: LoginReqDto) {
    setIsLoading(true);
    try {
      const user = await handleLogin({ ...formData, isInvestor });
      if (user) {
        login(user, isInvestor, user.token);
        navigate("/dashboard");
      } else {
        setError(true);
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error in handleLoginFunc:", error);
      setError(true);
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <article className="flex justify-between h-screen gap-8">
      <section className="w-1/2 h-full bg-mainGreen md:hidden text-white px-16 py-8">
        <img src="/white.png" className="w-32 object-contain" />
        <section className="h-4/5 flex flex-col justify-center items-center gap-4">
          <p className="font-bold text-3xl">Welcome Back</p>
          <p>To keep connected with us please login with your personal info</p>
        </section>
      </section>
      <section className="w-1/2 h-full flex flex-col justify-center items-center gap-6 text-black">
        <p className="font-bold text-4xl">Welcome Back</p>
        <p>Welcome back! Please enter your credentials</p>
        <form
          className="w-4/6 flex flex-col gap-5"
          onSubmit={handleSubmit(handleLoginFunc)}
        >
          <label className="flex flex-col gap-1">
            Choose Account Type
            <select
              className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
              onChange={(e) => setIsInvestor(e.target.value === "true")}
            >
              <option value="true">Investor</option>
              <option value="false">Startup</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 w-full">
            Email
            <input
              className=" bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
          </label>
          <label className="flex flex-col gap-1">
            Password
            <input
              className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
          </label>
          {error && (
            <p className="text-sm text-red-500">Invalid Username or Password</p>
          )}

          <Link className="self-end -mt-2" to="forgot">
            Forgot Password?
          </Link>
          <button className="font-bold text-xl py-1 rounded-2xl grid place-content-center text-white px-10 bg-mainGreen">
            {isLoading ? (
              <Loading type="spin" color="#191919" width={30} height={30} />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p>
          don't have an account?{" "}
          <Link to="/signup" className="font-bold text-lg">
            Sign up for free
          </Link>
        </p>
      </section>
    </article>
  );
}
