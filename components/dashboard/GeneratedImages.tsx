"use client";

import { Profile } from "@/typings";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";

const GeneratedImages = ({ user }: { user: Profile }) => {
  return (
    <div className="mt-16 flow-root sm:mt-24">
      <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-gray-400/5 p-2 py-5 ring-1 ring-inset ring-gray-900/10 dark:ring-gray-500/10 lg:-m-4 lg:rounded-2xl lg:p-4">
        {user.images.length < 1 ? (
          <div className="flex flex-col gap-5 items-center justify-center">
            <h3 className="text-center">Generate some images and you&apos;ll find them here😊</h3>
            <Button asChild>
              <Link href="/dashboard">
                <ReloadIcon className="mr-2 h-4 w-4" />
                Generate Image
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <Image
              unoptimized
              src="/banner.png"
              alt="App Screnshot"
              width={2432}
              height={1442}
              className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default GeneratedImages;
