import { FormEvent, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { ApiUrl } from "../utils/api";
import axios from "axios";
import { getAuthToken } from "../hooks/collaboration/getAuthToken";
import { useActionData, useNavigate } from "react-router";
import { uploadImage } from "../utils/sendToCloudinary";

interface PatchInvesterDto {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  profilePic: string;
}
interface PatchStartupDto {
  name: string;
  email: string;
  phone: string;
  stage: string;
  password: string;
  profilePic: string;
}

export default function SettingsPage() {
  const { userInfo, isInvestor, login } = useAuthContext();
  const [currentUserInfo, setCurrentUserInfo] = isInvestor
    ? useState({
        email: userInfo.email,
        firstName: userInfo.names.split(" ")[0],
        lastName: userInfo.names.split(" ")[1],
        phone: userInfo.phone,
        password: "",
        profilePic: new File([""], "filename"),
      })
    : useState({
        name: userInfo.names,
        email: userInfo.email,
        phone: userInfo.phone,
        stage: userInfo.stage,
        password: "",
        profilePic: new File([""], "filename"),
      });

  const navigate = useNavigate();

  function resetForm() {
    isInvestor
      ? setCurrentUserInfo({
          email: userInfo.email,
          firstName: userInfo.names.split(" ")[0],
          lastName: userInfo.names.split(" ")[1],
          phone: userInfo.phone,
          password: "",
          profilePic: new File([""], "newere"),
        })
      : setCurrentUserInfo({
          name: userInfo.names,
          email: userInfo.email,
          phone: userInfo.phone,
          stage: userInfo.stage,
          password: "",
          profilePic: new File([""], "filename"),
        });
  }

  async function handleUpdateProfile(
    e: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) {
    e.preventDefault();
    const url = `${ApiUrl}/${isInvestor ? "investor" : "business-startup"}/${
      userInfo.id
    }`;
    const token = getAuthToken();
    const imageUrl = await uploadImage(currentUserInfo.profilePic);
    const response = await axios.patch<PatchInvesterDto | PatchStartupDto>(
      url,
      { ...currentUserInfo, profilePic: imageUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      const updatedUser = response.data;
      alert("Profile updated successfully");
      login(
        {
          email: updatedUser.email,
          id: userInfo.id,
          names: isInvestor
            ? updatedUser.firstName + " " + updatedUser.lastName
            : updatedUser.name,
          phone: updatedUser.phone,
          profilePic: updatedUser.profilePic,
          token: userInfo.token,
          stage: isInvestor ? "" : updatedUser.stage,
        },
        isInvestor,
        userInfo.token
      );

      navigate("/dashboard");
    }
  }

  return (
    <article className="p-12 md:px-8 sm:px-4">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      <article className="flex justify-between gap-8 sm:flex-col">
        <section className="min-w-fit flex flex-col gap-2 items-center">
          <img
            src={userInfo?.profilePic}
            className="w-44 h-44 md:w-32 md:h-32 rounded-full object-cover"
          />
          <p className="font-semibold text-xl">{userInfo.names}</p>
          <p>{userInfo.email}</p>
        </section>
        <section className="bg-white w-4/5 rounded-2xl md:w-full">
          <h1 className="text-2xl font-bold p-8">update Profile</h1>
          <form onSubmit={handleUpdateProfile}>
            <div className="flex flex-col gap-4 p-8">
              {isInvestor ? (
                <>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={currentUserInfo.firstName}
                    onChange={(e) =>
                      setCurrentUserInfo((prev: any) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    className="p-2 border border-gray-300 rounded-xl bg-mainGreen/5 outline-none"
                  />
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="p-2 border border-gray-300 rounded-xl bg-mainGreen/5 outline-none"
                    value={currentUserInfo.lastName}
                    onChange={(e) =>
                      setCurrentUserInfo((prev: any) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="p-2 border border-gray-300 rounded-xl bg-mainGreen/5 outline-none"
                    value={currentUserInfo.email}
                    onChange={(e) =>
                      setCurrentUserInfo((prev: any) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="p-2 border border-gray-300 rounded-xl bg-mainGreen/5 outline-none"
                    value={currentUserInfo.phone}
                    onChange={(e) =>
                      setCurrentUserInfo((prev: any) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="p-2 border border-gray-300 rounded-xl bg-mainGreen/5 outline-none"
                    value={currentUserInfo.password}
                    onChange={(e) =>
                      setCurrentUserInfo((prev: any) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                  <label htmlFor="profilePic">Profile Picture</label>
                  <input
                    type="file"
                    id="profilePic"
                    name="profilePic"
                    className="p-2 border border-gray-300 rounded-xl bg-mainGreen/5 outline-none"
                    onChange={(e) =>
                      setCurrentUserInfo((prev: any) => ({
                        ...prev,
                        profilePic: e.target.value,
                      }))
                    }
                  />
                </>
              ) : (
                <>
                  <label htmlFor="lastName">Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="p-2 border border-gray-300 rounded-xl bg-mainGreen/5 outline-none"
                    value={currentUserInfo.name}
                    onChange={(e) =>
                      setCurrentUserInfo((prev: any) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="p-2 border border-gray-300 rounded-xl bg-mainGreen/5 outline-none"
                    value={currentUserInfo.email}
                    onChange={(e) =>
                      setCurrentUserInfo((prev: any) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="p-2 border border-gray-300 rounded-xl bg-mainGreen/5 outline-none"
                    value={currentUserInfo.phone}
                    onChange={(e) =>
                      setCurrentUserInfo((prev: any) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="p-2 border border-gray-300 rounded-xl bg-mainGreen/5 outline-none"
                    value={currentUserInfo.password}
                    onChange={(e) =>
                      setCurrentUserInfo((prev: any) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                  <label htmlFor="profilePic">Profile Picture</label>
                  <input
                    type="file"
                    id="profilePic"
                    name="profilePic"
                    className="p-2 border border-gray-300 rounded-xl bg-mainGreen/5 outline-none"
                    onChange={(e) =>
                      setCurrentUserInfo((prev: any) => ({
                        ...prev,
                        profilePic: e.target.value,
                      }))
                    }
                  />
                </>
              )}
              <section className="flex justify-between gap-12 mt-8">
                <button
                  type="submit"
                  className="bg-mainGreen text-white p-2 rounded-md w-full"
                  onClick={handleUpdateProfile}
                >
                  Save Changes
                </button>
                <button
                  type="reset"
                  className="bg-mainGreen text-white p-2 rounded-md w-full"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </section>
            </div>
          </form>
        </section>
      </article>
    </article>
  );
}
