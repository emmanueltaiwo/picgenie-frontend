"use client";

import { fetchAllFolders } from "@/services/folder";
import { Folder } from "@/typings";
import { useQuery } from "@tanstack/react-query";
import FolderLoader from "./FolderLoader";
import FolderCard from "./FolderCard";

const Folders = () => {
  const { data, isLoading, isError } = useQuery<string | Folder[]>({
    queryKey: ["folders"],
    queryFn: async () => await fetchAllFolders(),
  });

  const skeletonCards = Array.from({ length: 5 }, (_, index) => (
    <FolderLoader key={index} />
  ));

  if (isLoading) {
    return (
      <div className="flow-root mt-5">
        <div className="w-full grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
          {skeletonCards}
        </div>
      </div>
    );
  }

  if (isError || typeof data === "string") {
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
    <div className="mt-8 w-full grid grid-cols-1 gap-5 md:grid-cols-4 lg:grid-cols-5">
      {data
        ?.sort(
          (a: Folder, b: Folder) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .map((folder: Folder) => (
          <FolderCard key={folder.id} folder={folder} />
        ))}
    </div>
  );
};

export default Folders;
