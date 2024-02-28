"use client";

import { useState, useEffect } from "react";
import { updateUserCredits } from "@/services/profile";
import { Profile } from "@/typings";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

import { useLocalStorage } from "@/hooks/useLocalStorage";

const ProfileHeader = ({ user }: { user: Profile }) => {
  const [creditPurchasModalVisible, setCreditPurchasModalVisible] =
    useState<boolean>(false);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const { getItem, removeItem } = useLocalStorage("credits-bought");
  const { toast } = useToast();

  useEffect(() => {
    const verifyAndUpdateCredit = async () => {
      try {
        if (status !== user.id) return;

        let creditsBoughtString = getItem();

        if (!creditsBoughtString) {
          creditsBoughtString = "0";
        }

        const creditsBought = parseInt(creditsBoughtString);

        if (creditsBought === 0) {
          return;
        }

        const response = await updateUserCredits(creditsBought);
        removeItem();

        if (response.message !== "Credit Updated Successfully") {
          return toast({
            title: response.message,
            description: response.message,
          });
        }
        setCreditPurchasModalVisible(true);
        return toast({
          title: response.message,
          description: "Refresh The Page For Changes To Begin",
        });
      } catch (error: any) {
        throw new Error(error);
      }
    };

    verifyAndUpdateCredit();
  }, [status, toast, user, getItem, removeItem]);

  return (
    <div className="max-w-3xl">
      {creditPurchasModalVisible && (
        <AlertDialog defaultOpen={true}>
          <AlertDialogContent className="flex flex-col gap-3 justify-center items-center text-center">
            <AlertDialogHeader>
              <Image
                src="/confetti.png"
                width={150}
                height={150}
                alt="confetti"
                className="mx-auto"
              />
              <AlertDialogTitle>YAY!</AlertDialogTitle>
              <AlertDialogDescription>
                Your credit has been purchased succesfully
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setCreditPurchasModalVisible(false)}
              >
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

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
