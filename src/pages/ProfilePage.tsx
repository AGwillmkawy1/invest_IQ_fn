import dayjs from "dayjs";
import { useAuthContext } from "../context/AuthContext";
import useGetInvestments from "../hooks/useGetInvestments";

export default function ProfilePage() {
  const { userInfo, isInvestor } = useAuthContext();
  const { investments } = useGetInvestments();
  const userInvestments = investments?.filter(
    (inv) => inv.investorId === userInfo.id || inv.businessId === userInfo.id
  );
  const totalInvestments = userInvestments?.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const totalROI = userInvestments?.reduce((acc, curr) => acc + curr.ROI, 0);
  const totalInvestmentDays = userInvestments?.reduce(
    (acc, curr) => acc + curr.numberOfDays,
    0
  );

  return (
    <div className="p-8">
      <div className="flex flex-wrap">
        <section className="w-full">
          <div className="bg-[url(/hero.webp)] bg-cover bg-center h-1/3 grid place-content-center">
            <div className="relative h-32 w-40">
              <img
                src={userInfo.profilePic}
                className="min-w-40 min-h-40 h-40 w-40 rounded-full object-cover absolute -bottom-20"
                alt=""
              />
            </div>
          </div>
          <div className="bg-white flex flex-col justify-center items-center pt-24 pb-10">
            <p className="font-semibold text-2xl">{userInfo.names}</p>
            <p className="font-lg">{userInfo.email}</p>
            <p className="text-mainGreen">
              {isInvestor ? "Investor" : "Startup"}
            </p>
          </div>
        </section>
        <section>
          <div className="my-4 flex flex-col w-full">
            <div className="w-full flex flex-col">
              <PersonalInfo
                names={userInfo.names}
                joined={dayjs("05/05/2024").fromNow()}
                mobile={userInfo.phone}
                email={userInfo.email}
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-8 mb-4">
            <h4 className="text-xl text-gray-900 font-bold">About</h4>
            <p className="mt-2 text-gray-700">
              As an investor based in Kigali, I have a keen interest in
              tech-related startups. With a passion for innovation and
              technology, I am committed to identifying and nurturing promising
              ventures that have the potential to revolutionize industries and
              drive significant growth. My investments focus on empowering
              visionary entrepreneurs to turn their groundbreaking ideas into
              successful, scalable businesses.
            </p>
          </div>
        </section>
        <div className="flex flex-col w-full">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h4 className="text-xl text-gray-900 font-bold">Statistics</h4>
            <div className="grid grid-cols-1 gap-8 mt-4">
              <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-indigo-600">
                    Total investments
                  </span>
                  <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
                    7 days
                  </span>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <svg
                      className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-end">
                      <span className="text-2xl 2xl:text-3xl font-bold">
                        ${totalInvestments}
                      </span>
                      <div className="flex items-center ml-2 mb-1">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          ></path>
                        </svg>
                        <span className="font-bold text-sm text-gray-500 ml-0.5">
                          3%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-green-600">
                    Expecter ROI
                  </span>
                  <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
                    {totalInvestmentDays} days
                  </span>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <svg
                      className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-end">
                      <span className="text-2xl 2xl:text-3xl font-bold">
                        {totalROI}
                      </span>
                      <div className="flex items-center ml-2 mb-1">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          ></path>
                        </svg>
                        <span className="font-bold text-sm text-gray-500 ml-0.5">
                          5%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PersonalInfoProps {
  names: string;
  joined: string;
  mobile: string;
  email: string;
}

function PersonalInfo({ names, joined, mobile, email }: PersonalInfoProps) {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
      <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
      <ul className="mt-2 text-gray-700">
        <li className="flex border-y py-2">
          <span className="font-bold w-24">Full name:</span>
          <span className="text-gray-700">{names}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Joined:</span>
          <span className="text-gray-700">{joined}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Mobile:</span>
          <span className="text-gray-700">{mobile}</span>
        </li>
        <li className="flex border-b py-2">
          <span className="font-bold w-24">Email:</span>
          <span className="text-gray-700">{email}</span>
        </li>
      </ul>
    </div>
  );
}
