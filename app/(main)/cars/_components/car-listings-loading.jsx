import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CarListingsLoading = () => {
  return (
    <>
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="rounded-lg border overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/5" />
                </div>
                <div className="pt-2 flex gap-2">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 flex-1" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CarListingsLoading;
