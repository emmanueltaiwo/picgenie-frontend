"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { DownloadIcon, EyeOpenIcon, ReloadIcon } from "@radix-ui/react-icons";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getUserGeneratedImages } from "@/services/profile";
import SkeletonLoader from "./SkeletonLoader";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const GeneratedImages = () => {
  const { data, isLoading, isError, error } = useQuery<any>({
    queryKey: ["generated-images"],
    queryFn: async () => await getUserGeneratedImages(),
  });

  const skeletonCards = Array.from({ length: 6 }, (_, index) => (
    <SkeletonLoader key={index} />
  ));

  if (isLoading) {
    return (
      <div className="mt-16 flow-root sm:mt-24">
        <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-gray-400/5 p-2 py-5 ring-1 ring-inset ring-gray-900/10 dark:ring-gray-500/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-3">
            {skeletonCards}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center font-medium text-[15px]">
        Error: {error.message}
      </p>
    );
  }

  return (
    <div>
      <p className="mt-6 text-md sm:text-lg sm:leading-8 text-gray-600 dark:text-gray-300">
        You have generated {data.length} {data.length < 2 ? "image" : "images"}
      </p>

      <div className="mt-16 flow-root sm:mt-24">
        <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-gray-400/5 p-2 py-5 ring-1 ring-inset ring-gray-900/10 dark:ring-gray-500/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          {data?.length < 1 ? (
            <div className="flex flex-col gap-5 items-center justify-center">
              <h3 className="text-center">
                Generate some images and you&apos;ll find them here😊
              </h3>
              <Button asChild>
                <Link href="/dashboard">
                  <ReloadIcon className="mr-2 h-4 w-4" />
                  Generate Image
                </Link>
              </Button>
            </div>
          ) : (
            <div
              className="w-full grid grid-cols-1 gap-5 md:grid-cols-3 
            "
            >
              {data
                ?.sort(
                  (a: any, b: any) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((image: any) => {
                  const imageUrl = `data:image/png;base64,${image.base64}`;

                  const date = formatDate(image.created_at);

                  return (
                    <div
                      key={imageUrl}
                      className="w-fit bg-gray-300 hover:bg-gray-400 dark:bg-slate-900 dark:hover:bg-[rgb(8,19,47)] rounded-lg p-5 flex justify-center flex-col gap-3 transition-all duration-500 cursor-pointer"
                    >
                      <Image
                        src={imageUrl}
                        width={300}
                        height={400}
                        alt="image"
                        className="w-fit rounded-lg mx-auto"
                      />
                      <div className="flex gap-3 md:gap-5 items-cener mx-auto">
                        <Button asChild>
                          <a href={imageUrl} download>
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
                              <AlertDialogTitle>
                                {image.prompt}
                              </AlertDialogTitle>
                              <Image
                                src={imageUrl}
                                width={300}
                                height={400}
                                alt="image"
                                className="w-fit rounded-lg mx-auto"
                              />
                              <AlertDialogDescription>
                                {date}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>

                      <h2 className="my-1 font-[300] text-[13px] text-left">
                        Prompt: {image.prompt}
                      </h2>

                      <h2 className="my-1 font-[300] text-[13px] text-left">
                        Created At: {date}
                      </h2>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratedImages;
