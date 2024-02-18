import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="w-full md:w-fit h-[550px] flex flex-col gap-6">
      <Skeleton className="w-[350px] h-[450px] mx-auto rounded-lg" />
      <div className="flex gap-3 md:gap-5 items-cener mx-auto">
        <Skeleton className="w-[100px] h-[40px] rounded-lg" />
        <Skeleton className="w-[100px] h-[40px] rounded-lg" />
      </div>
      <Skeleton className="w-[200px] h-[10px]" />
      <Skeleton className="w-[150px] h-[10px]" />
    </div>
  );
};

export default SkeletonLoader;
