"use client";

import React from "react";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { Button } from "../ui/button";
import { DownloadIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const NewImage = () => {
  const image = useAppSelector((state) => state.image.imageGenerated);

  return (
    <div className="w-full">
      {!image || image.length < 1 ? (
        <p className="text-center">Generate Some Images</p>
      ) : (
        <div
          className={`w-full grid grid-cols-1 gap-5 ${
            image.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"
          } `}
        >
          {image &&
            image.map((i: string) => (
              <div
                key={i}
                className="w-fit bg-slate-900 rounded-lg p-5 flex items-center justify-center flex-col gap-3"
              >
                <Image
                  src={i}
                  width={400}
                  height={400}
                  alt="image"
                  className="w-fit rounded-lg"
                />
                <div className="flex gap-3 md:gap-5 items-cener">
                  <Button asChild>
                    <a href={i} download>
                      <DownloadIcon className="mr-2 w-4 h-4" />
                      Download
                    </a>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button>
                        <EyeOpenIcon className="mr-2 w-4 h-4" />
                        View
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <Image
                          src={i}
                          width={450}
                          height={400}
                          alt="image"
                          className="w-fit rounded-lg mx-auto"
                        />
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default NewImage;
