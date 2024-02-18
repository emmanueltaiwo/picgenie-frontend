import React from "react";
import { getUserProfile } from "@/services/profile";
import GeneratedImages from "@/components/dashboard/GeneratedImages";
import ProfileHeader from "@/components/dashboard/ProfileHeader";

const Profile = async () => {
  const user = await getUserProfile();

  if ("message" in user) {
    return null;
  }

  return (
    <main>
      <div className="relative isolate pt-14 dark:bg-gray-900 pb-20">
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
            <ProfileHeader user={user} />
            <GeneratedImages />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
