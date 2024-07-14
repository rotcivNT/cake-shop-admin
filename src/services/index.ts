'use server'
const cateURL = process.env.NEXT_PUBLIC_CATEGORY_BACK_END_URL;
const fileURL = process.env.NEXT_PUBLIC_FILE_BACK_END_URL;

export const getAllCategories = async () => {
  try {
    const response = await fetch(`${cateURL}/get-all-category`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const uploadFile = async (payload: FormData) => {
  try {
    const response = await fetch(`${fileURL}/upload/image`, {
      method: "POST",
      body: payload,
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
