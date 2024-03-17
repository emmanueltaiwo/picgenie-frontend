import { Skeleton } from "@/components/ui/skeleton";

const FolderLoader = () => {
  return (
    <div className="w-full h-[200px] flex flex-col gap-3">
      <Skeleton className="w-full h-[150px] mx-auto rounded-lg" />
      <Skeleton className="w-[50%] h-[10px] mx-auto" />
      <Skeleton className="w-[50%] h-[10px] mx-auto" />
    </div>
  );
};

export default FolderLoader;
