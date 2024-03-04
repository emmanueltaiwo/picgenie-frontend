"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { getUserGeneratedImages } from "@/services/profile";
import SkeletonLoader from "./SkeletonLoader";
import { ImageGenerated } from "@/typings";
import ImageCard from "./ImageCard";

const GeneratedImages = () => {
  const { data, isLoading, isError } = useQuery<ImageGenerated[]>({
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
          <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skeletonCards}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-16 flow-root sm:mt-24">
        <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-gray-400/5 p-2 py-5 ring-1 ring-inset ring-gray-900/10 dark:ring-gray-500/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          <h3 className="text-center text-red-500 font-medium">
            An Error Occured! Check Your Internet Connection And Refresh The
            Page.
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mt-6 text-md sm:text-lg sm:leading-8 text-gray-600 dark:text-gray-300">
        You have generated{" "}
        <span className="text-[#b925e6] font-bold">{data?.length}</span>{" "}
        {data && data.length < 2 ? "image" : "images"}
      </p>

      <div className="mt-10 flow-root sm:mt-24">
        <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-gray-400/5 p-2 py-5 ring-1 ring-inset ring-gray-900/10 dark:ring-gray-500/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          {data && data.length < 1 ? (
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
              className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 
            "
            >
              {data
                ?.sort(
                  (a: ImageGenerated, b: ImageGenerated) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((image: ImageGenerated) => (
                  <ImageCard
                    key={image.imageUrl}
                    data={image}
                    newImage={false}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratedImages;
