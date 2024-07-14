"use server";
const baseURL = process.env.NEXT_PUBLIC_PRODUCT_BACK_END_URL;

export const createNewProduct = async (payload: any) => {
  try {
    const response = await fetch(`${baseURL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getAllProduct = async () => {
  try {
    const response = await fetch(`${baseURL}/get-all-products`);
    const data = await response.json();
    return {
      code: 1,
      data,
    };
  } catch (e) {
    console.log(e);
    return {
      code: -1,
      msg: e,
    };
  }
};

export const getAllVariants = async () => {
  try {
    const response = await fetch(`${baseURL}/get-all-variants`);
    const data = await response.json();
    return {
      code: 1,
      data,
    };
  } catch (e) {
    console.log(e);
    return {
      code: -1,
      msg: e,
    };
  }
};

export const updateProduct = async (payload: any) => {
  try {
    const response = await fetch(`${baseURL}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
