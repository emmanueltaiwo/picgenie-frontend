"use client";

import React from "react";
import ImageCard from "../ImageCard";
import { Folder, ImageGenerated } from "@/typings";
import { useQuery } from "@tanstack/react-query";
import { fetchFolderById } from "@/services/folder";
import FolderHeader from "./FolderHeader";
import SkeletonLoader from "../SkeletonLoader";

const FolderDetails = ({ folderId }: { folderId: string }) => {
  const { data, isLoading, isError } = useQuery<string | Folder>({
    queryKey: ["generated-images"],
    queryFn: async () => await fetchFolderById(folderId),
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

  if (typeof data === "string") return null;

  return (
    <section>
      <FolderHeader folder={data} />

      <div className="mt-10 flow-root sm:mt-22">
        <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-gray-400/5 p-2 py-5 ring-1 ring-inset ring-gray-900/10 dark:ring-gray-500/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data?.images && data.images.length < 1 ? (
              <h3 className="text-center">This folder is empty</h3>
            ) : (
              data?.images
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((image: ImageGenerated) => (
                  <ImageCard
                    folderId={data.id}
                    isFolderPage={true}
                    key={image.imageUrl}
                    data={image}
                    newImage={false}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FolderDetails;
