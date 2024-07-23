import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
      <div className="col-span-3 flex items-center">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="h-12.5 w-15 animate-pulse rounded-md bg-gray-2 dark:bg-meta-4"></div>
          <div className="h-4 w-24 animate-pulse rounded bg-gray-2 dark:bg-meta-4"></div>
        </div>
      </div>
      <div className="col-span-1 hidden items-center sm:col-span-2 sm:flex">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-2 dark:bg-meta-4"></div>
      </div>
      <div className="col-span-1 flex flex-col justify-center sm:col-span-2">
        <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-2 dark:bg-meta-4"></div>
        <div className="h-4 w-32 animate-pulse rounded bg-gray-2 dark:bg-meta-4"></div>
      </div>
      <div className="col-span-2 flex items-center justify-end space-x-3.5 sm:col-span-1">
        <div className="h-6 w-6 animate-pulse rounded-full bg-gray-2 dark:bg-meta-4"></div>
        <div className="h-6 w-6 animate-pulse rounded-full bg-gray-2 dark:bg-meta-4"></div>
      </div>
    </div>
  );
};

export default function ProductListLoading() {
  return (
    <div>
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
    </div>
  );
}
