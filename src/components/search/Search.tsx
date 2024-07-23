/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useDebounce from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const debounceValue = useDebounce(query, 500);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (query) {
      router.push(pathname + `?q=${query}`);
    } else if (searchParams.get("q")) {
      router.push(pathname);
    }
  }, [debounceValue]);
  return (
    <div className="mx-6 mb-6 w-[600px] max-w-[100%]">
      <input
        type="text"
        placeholder="Tìm kiếm"
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
  );
};

export default Search;
