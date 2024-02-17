import React from "react";
import Image from "next/image";
import { getUserProfile } from "@/services/profile";
import GeneratedImages from "@/components/dashboard/GeneratedImages";

const Profile = async () => {
  const user = await getUserProfile();

  if ("message" in user) {
    return null;
  }

  return (
    <main>
      <div className="relative isolate pt-14 dark:bg-gray-900">
        <div
          className="absolute inset-x-0 top-[150px] -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/670] w-[16.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[36.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1%, 44.1%)",
            }}
          />
        </div>

        <div className="sm:py-4 lg:pb-40">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="w-fit h-fit p-3 rounded-full border-2 border-[#ff80b5]">
                  <Image
                    src="/logo.png"
                    width={100}
                    height={60}
                    alt="Logo"
                    className="w-[50px] md:w-[100px] h-fit"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
                    Hi, <span className="text-[#9341fd]">{user.fullName}</span>
                  </h1>

                  <p className="text-md sm:text-lg sm:leading-8 text-gray-600 dark:text-gray-300">
                    You have {user.creditsLeft}{" "}
                    {user.creditsLeft > 1 ? "credits" : "credit"} left
                  </p>
                </div>
              </div>

              <p className="mt-6 text-md sm:text-lg sm:leading-8 text-gray-600 dark:text-gray-300">
                You have generated {user.images.length}{" "}
                {user.images.length < 1 ? "image" : "images"}
              </p>
            </div>
            <GeneratedImages user={user} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
