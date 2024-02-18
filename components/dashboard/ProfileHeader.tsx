"use client";

import { updateUserCredits } from "@/services/profile";
import { Profile } from "@/typings";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const ProfileHeader = ({ user }: { user: Profile }) => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const { toast } = useToast();

  useEffect(() => {
    const verifyAndUpdateCredit = async () => {
      try {
        if (status !== user.id) return;

        let creditsBoughtString = localStorage.getItem("credits-bought");

        if (!creditsBoughtString) {
          creditsBoughtString = "0";
        }

        const creditsBought = parseInt(creditsBoughtString);

        if (creditsBought === 0) {
          return;
        }

        const response = await updateUserCredits(creditsBought);
        localStorage.removeItem("credits-bought");

        if (response.message !== "Credit Updated Successfully") {
          return toast({
            title: response.message,
            description: response.message,
          });
        }

        return toast({
          title: response.message,
          description: "Refresh The Page For Changes To Begin",
        });
      } catch (error: any) {
        throw new Error(error);
      }
    };

    verifyAndUpdateCredit();
  }, [status, toast, user]);

  return (
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
    </div>
  );
};

export default ProfileHeader;
