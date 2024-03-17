import { Folder } from "@/typings";
import React from "react";

const FolderHeader = ({ folder }: { folder: Folder | undefined }) => {
  if (!folder) return <p>Folder not found</p>
   
  return (
    <div className="max-w-3xl">
      <h1 className="text-[15px] md:text-[35px] font-[800]">
        {folder.folderName}
      </h1>
      <p className="dark:text-gray-400 text-gray-700 text-sm">
        You have {folder.images?.length} image in this folder
      </p>
    </div>
  );
};

export default FolderHeader;
