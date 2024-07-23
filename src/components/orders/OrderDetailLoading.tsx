export const OrderDetailLoading = () => {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={item}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 animate-pulse rounded-md bg-gray-2 dark:bg-meta-4"></div>
              <div className="h-4 w-24 animate-pulse rounded bg-gray-2 dark:bg-meta-4"></div>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-2 dark:bg-meta-4"></div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-2 dark:bg-meta-4"></div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <div className="h-4 w-12 animate-pulse rounded bg-gray-2 dark:bg-meta-4"></div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-2 dark:bg-meta-4"></div>
          </div>
        </div>
      ))}
      <div className="mt-5 px-6 pb-10 text-[18px]">
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 animate-pulse rounded bg-gray-2 dark:bg-meta-4"></div>
          <div className="h-6 w-56 animate-pulse rounded bg-gray-2 dark:bg-meta-4"></div>
        </div>
        <div className="my-2 h-6 w-64 animate-pulse rounded bg-gray-2 dark:bg-meta-4"></div>
        <div className="h-6 w-40 animate-pulse rounded bg-gray-2 dark:bg-meta-4"></div>
      </div>
    </>
  );
};
