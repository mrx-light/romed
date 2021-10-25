import { axiosInstance } from "./AxiosWrapper";

export const getProduct = async (element) => {
  try {
    const response = await axiosInstance.get(`/product/${element}`);
    if (response.data.stat !== null) {
      return response.data.arr;
    }
    return null
  } catch (error) {
    console.log("error: ", error);
  }
}

export const getThreeProducts = async () => {
  try {
    const response = await axiosInstance.get(`/threeProducts`);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
}

export const getProducts = async (limit) => {
  try {
    const response = await axiosInstance.get(`/products/${limit}`);
    if (response.data.stat !== null) {
      return response.data.arr;

    }
    return null
  } catch (error) {
    console.log("error:", error);
  }
}


export const getLatestUplodedProducts = async () => {
  try {
    const response = await axiosInstance.get(`/productsLatest`);
    if (response) {
      return response.data;
    }
    return null
  } catch (error) {
    console.log("error: ", error);
  }
}

export const getTopFiveProducts = async () => {
  try {
    const response = await axiosInstance.get(`/topFiveProducts`);
    if (response) {
      return response.data;
    }
    return null
  } catch (error) {
    console.log("error: ", error);
  }
}
