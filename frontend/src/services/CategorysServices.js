import { axiosInstance } from "./AxiosWrapper";

export const getProductsByCategory = async (id, limit) => {
  try {
    const response = await axiosInstance.get(
      `productsByCategorys/${id}/${limit}`
    );
    if (response) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getProductsSerch = async (serch) => {
  try {
    const response = await axiosInstance.get(`productsSerch/${serch}`);
    if (response.data.stat !== null) {
      return response.data.arr;
    }
    return null;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getProductsAdd = async (wasAdded, limit, type) => {
  try {
    const response = await axiosInstance.get(
      `products/${wasAdded}/${limit}/${type}`
    );
    if (response.data.stat !== null) {
      return response.data.arr;
    }
    return null;
  } catch (error) {
    console.log("error: ", error);
  }
};
