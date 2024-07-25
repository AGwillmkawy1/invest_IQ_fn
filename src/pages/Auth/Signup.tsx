import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "react-loading";
import { signup } from "../../utils/logUser";
import {
  InvestorSignupDto,
  StartUpSignupDto,
} from "../../interfaces/interfaces";
import { uploadImage } from "../../utils/sendToCloudinary";
import { sectors, stages } from "../../interfaces/enums";

export default function Signup() {
  const [Error, setError] = useState(false);
  const [isInvestor, setIsInvestor] = useState(true);

  return (
    <article className="flex justify-between h-screen gap-8">
      <section className="w-1/2 h-full bg-mainGreen md:hidden text-white px-16 py-8">
        <img src="/white.png" className="w-32 object-contain" />
        <section className="h-4/5 flex flex-col justify-center items-center gap-4">
          <p className="font-bold text-3xl">Get Started</p>
          <p>To keep connected with us plase signup with your personal info</p>
        </section>
      </section>
      <section className="w-1/2 h-full flex flex-col justify-center items-center gap-6 text-black">
        <p className="font-bold text-4xl">Get Started</p>
        <p>Register you account</p>

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
        {isInvestor ? (
          <InvestorSignupForm setError={setError} Error={Error} />
        ) : (
          <StartupSignupForm setError={setError} Error={Error} />
        )}
        <p>
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-lg">
            Log In Here
          </Link>
        </p>
      </section>
    </article>
  );
}

function StartupSignupForm({ setError, Error }: { setError: any; Error: any }) {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<FileList | null>(null);
  const { register, handleSubmit } = useForm<StartUpSignupDto>();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignup(formData: StartUpSignupDto) {
    if (!photo?.[0]) {
      return;
    }
    setIsLoading(true);
    try {
      const imgUrl = await uploadImage(photo[0]);
      await signup({ ...formData, profilePic: imgUrl }, false);
      return navigate("/login");
    } catch (error) {
      setError(true);
      toast.error(
        Error
          ? "Error in signup, please try again"
          : "we could not sign you up, please try again"
      );
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form
      className="w-4/6 flex flex-col gap-5"
      onSubmit={handleSubmit(handleSignup)}
    >
      <div className="flex justify-between gap-4">
        <label className="flex flex-col gap-1 w-full">
          Name
          <input
            className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />
        </label>
        <label className="flex flex-col gap-1 w-full">
          Email
          <input
            className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
        </label>
      </div>
      <div className="flex justify-between gap-4">
        <label className="flex flex-col gap-1 w-full">
          Phone
          <input
            className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
            type="text"
            placeholder="Enter your phone number"
            {...register("phone")}
          />
        </label>
        <label className="flex flex-col gap-1 w-full">
          Password
          <input
            className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
        </label>
      </div>
      <label className="flex flex-col gap-1 w-full">
        Profile Picture
        <input
          className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
          type="file"
          placeholder="Enter your profile picture"
          onChange={(e) => setPhoto(e.target.files)}
        />
      </label>

      <div className="flex justify-between gap-4">
        <label className="flex flex-col gap-1 w-full">
          Location
          <input
            className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
            type="text"
            placeholder="Enter your location"
            {...register("location")}
          />
        </label>
        <label className="flex flex-col gap-1 w-full">
          Stage
          <select
            className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
            {...register("stage")}
          >
            {stages.map((stage) => (
              <option value={stage}>{stage}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex justify-between gap-4">
        <label className="flex flex-col gap-1 w-full">
          Business Type
          <select
            className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
            {...register("businessType")}
          >
            {sectors.map((sector) => (
              <option value={sector}>{sector}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 w-full">
          Growth Rate
          <input
            className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
            type="number"
            placeholder="Enter your growth rate"
            {...register("growthRate")}
          />
        </label>
      </div>
      <div className="flex justify-between gap-4">
        <label className="flex flex-col gap-1 w-full">
          Cost
          <input
            className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
            type="number"
            placeholder="Enter your cost"
            {...register("cost")}
          />
        </label>
        <label className="flex flex-col gap-1 w-full">
          Capital
          <input
            className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
            type="number"
            placeholder="Enter your capital"
            {...register("capital")}
          />
        </label>
      </div>
      <button className="font-bold text-xl py-1 rounded-2xl grid place-content-center text-white px-10 bg-mainGreen">
        {isLoading ? (
          <Loading type="spin" color="#191919" width={30} height={30} />
        ) : (
          "sign Up"
        )}
      </button>
    </form>
  );
}

function InvestorSignupForm({
  setError,
  Error,
}: {
  setError: any;
  Error: any;
}) {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<FileList | null>(null);
  const { register, handleSubmit } = useForm<InvestorSignupDto>();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignup(formData: InvestorSignupDto) {
    if (!photo?.[0]) {
      return;
    }
    setIsLoading(true);
    try {
      const imgUrl = await uploadImage(photo[0]);
      await signup({ ...formData, profilePic: imgUrl }, true);
      return navigate("/login");
    } catch (error) {
      setError(true);
      toast.error(
        Error
          ? "Error in signup, please try again"
          : "we could not sign you up, please try again"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="w-4/6 flex flex-col gap-5"
      onSubmit={handleSubmit(handleSignup)}
    >
      <label className="flex flex-col gap-1 w-full">
        First Name
        <input
          className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
          type="text"
          placeholder="Enter your first name"
          {...register("firstName")}
        />
      </label>
      <label className="flex flex-col gap-1 w-full">
        Last Name
        <input
          className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
          type="text"
          placeholder="Enter your last name"
          {...register("lastName")}
        />
      </label>
      <label className="flex flex-col gap-1 w-full">
        Email
        <input
          className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
      </label>
      <label className="flex flex-col gap-1 w-full">
        Phone
        <input
          className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
          type="text"
          placeholder="Enter your phone number"
          {...register("phone")}
        />
      </label>

      <label className="flex flex-col gap-1 w-full">
        Password
        <input
          className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
        />
      </label>
      <label className="flex flex-col gap-1 w-full">
        Profile Picture
        <input
          className="bg-mainGreen/5 border border-black/40 rounded-lg px-4 py-1 outline-none"
          type="file"
          placeholder="Enter your profile picture"
          onChange={(e) => setPhoto(e.target.files)}
        />
      </label>

      <button className="font-bold text-xl py-1 rounded-2xl grid place-content-center text-white px-10 bg-mainGreen">
        {isLoading ? (
          <Loading type="spin" color="#191919" width={30} height={30} />
        ) : (
          "sign Up"
        )}
      </button>
    </form>
  );
}
