"use client";
import { getAllCategories } from "@/services";
import { CategoryProps } from "@/types";
import React, { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import useSWR from "swr";

interface IProps {
  register: UseFormRegisterReturn<any>;
  initCategory?: string;
}

const CategorySelect = ({ register, initCategory }: IProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    initCategory || "",
  );
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const { data, isLoading, error } = useSWR(
    "get-all-category",
    getAllCategories,
  );

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  useEffect(() => {
    if (!isLoading && !error && data) {
      setCategories(data);
    }
  }, [data, error, isLoading]);

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {" "}
        Category <span className="text-meta-1">*</span>
      </label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={selectedOption}
          {...register}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          required
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            isOptionSelected ? "text-black dark:text-white" : ""
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select product&apos;s category
          </option>
          {categories &&
            categories.map(
              (category) =>
                category.parent && (
                  <option
                    key={category.id}
                    value={category.id}
                    className="text-body dark:text-bodydark"
                  >
                    {category.name}
                  </option>
                ),
            )}
          {/* <option value="USA" className="text-body dark:text-bodydark">
            USA
          </option>
          <option value="UK" className="text-body dark:text-bodydark">
            UK
          </option>
          <option value="Canada" className="text-body dark:text-bodydark">
            Canada
          </option> */}
        </select>

        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default CategorySelect;
