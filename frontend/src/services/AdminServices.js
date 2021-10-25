import axios from "axios";
import { axiosInstance } from "./AxiosWrapper"

export const postProduct = async (product) => {
  try {
    const response = await axiosInstance({
      baseURL: "http://localhost:2000/product/",
      headers: { 'Content-Type': 'application/json' },
      method: "post",
      data: product
    })
    if (response.data.stat !== null) {
      return response.message;
    }
    return null
  } catch (error) {
    console.log("error: ", error);
  }
}

export const putProduct = async (product, id) => {
  try {
    const response = await axiosInstance({
      baseURL: `http://localhost:2000/products/${id}`,
      headers: { 'Content-Type': 'application/json' },
      method: "put",
      data: product
    })
    if (response !== null) {
      return response;

    }
    return null
  } catch (error) {
    console.log("error: ", error);
  }
}

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`)
    if (response.stat !== null) {
      return response.message;


    }
    return null
  } catch (error) {
    console.log("error: ", error);
  }
}

export const postPhotoProducts = async (photo) => {
  try {
    const form = new FormData();
    form.append("myImage", photo)
    const response = await axiosInstance.post(`/posts`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (response.stat !== null) {
      return response

    }
    return null
  } catch (error) {
    console.log("error", error);
  }
}

export const getArrPhotoProducts = async () => {
  try {
    const response = await axiosInstance.get(`/posts`);
    if (response.data.stat !== null) {
      return response.data.arr;
    }
    return null
  } catch (error) {
    console.log("error", error);
  }
}

export const deletePhotoProducts = async (id) => {
  try {
    const response = await axiosInstance.delete(`/posts/${id}`);
    if (response.stat !== null) {
      return response;
    }
    return null;
  } catch (error) {
    console.log("error", error);
  }
}

export const getCategorys = async () => {
  try {
    const response = await axiosInstance.get(`/categorys`);
    if (response.data.stat !== null) {
      return response.data.arr;
    }
    return null;

  } catch (error) {
    console.log("error", error);
  }
}

export const postCategorys = async (obj) => {
  try {
    const response = await axiosInstance.post(`/categorys`, obj, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.stat !== null) {
      return response.message;
    }
    return null
  } catch (error) {
    console.log("error", error);
  }
}

export const putCategorys = async (obj, id) => {
  try {
    const response = await axiosInstance.put(`/categorys/${id}`, obj, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.stat !== null) {
      return response.message;
    }
    return null
  } catch (error) {
    console.log("error", error);
  }
}

export const deleteCategorys = async (id) => {
  try {
    const response = await axiosInstance.delete(`/categorys/${id}`);
    if (response.stat !== null) {
      return response.message;
    }
    return null
  } catch (error) {
    console.log("error", error);
  }
}

export const getIdProducts = async () => {
  try {
    const response = await axiosInstance.get(`/productsId`);
    if (response.data.stat !== null) {
      return response.data.arr;
    }
    return null
  } catch (error) {
    console.log("error", error)
  }
}

//About Us

export const getTextAboutUs = async () => {
  try {
    const response = await axiosInstance.get(`/textAbout`);
    return response.data;
  } catch (error) {
    console.log("error", error)
  }
}

export const postTextAboutUs = async (obj) => {
  try {
    const response = await axiosInstance.post(`/textAbout`, obj, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log("error", error)
  }
}

//About us images


// export const postPhoto = async (photo) => {
//   try {
//     const form = new FormData();
//     console.log("photo: ", photo)
//     form.append("myImage", photo)
//     const response = await axiosInstance.post(`/posts`, form, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//     return response
//   } catch (error) {
//     console.log("error", error);
//   }
// }


export const postAboutImage = async (photo) => {
  try {
    const form = new FormData();
    console.log(form)
    form.append("aboutImage", photo)
    const response = await axiosInstance.post(`/imagesAbout`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (response.stat !== null) {
      return response;
    }
    return null;
  } catch (error) {
    console.log("error", error);
  }
}

export const getAboutArrImages = async () => {
  try {
    const response = await axiosInstance.get(`/imagesAbout`);
    if (response.data.stat !== null) {
      return response.data.arr;
    }
    return null
  } catch (error) {
    console.log("error", error);
  }
}

export const deleteAboutPhoto = async (id) => {
  try {
    const response = await axiosInstance.delete(`/imagesAbout/${id}`);
    if (response.stat !== null) {
      return response;
    }
    return null;
  } catch (error) {
    console.log("error", error);
  }
}

export const getIdAboutText = async () => {
  try {
    const response = await axiosInstance.get(`/about`);
    return response.data;
  } catch (error) {
    console.log("error", error)
  }
}

export const postAboutText = async (obj) => {
  try {
    const response = await axiosInstance.post(`/about`, obj, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.log("error", error)
  }
}
export const deleteAboutText = async (id) => {
  try {
    const response = await axiosInstance.delete(`/about/${id}`);
    return response;
  } catch (error) {
    console.log("error", error)
  }
}

export const putAboutText = async (obj, id) => {
  try {
    const response = await axiosInstance.put(`/about/${id}`, obj, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.log("error", error)
  }
}



export const postImageNews = async (image) => {
  try {
    const form = new FormData();
    form.append("imageNews", image);
    const response = axiosInstance.post("/imagesNews", form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  } catch (error) {
    console.log("error: ", error);
  }
}
export const getArrImagesNews = async () => {
  try {
    const response = await axiosInstance.get("/imagesNews");
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
}

export const deleteImageNews = async (id) => {
  try {
    const response = axiosInstance.delete(`/imagesNews/${id}`);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
}

//News

export const postNews = async (obj) => {
  try {
    const response = await axiosInstance.post("/news", obj, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
}

export const getNews = async () => {
  try {
    const response = await axiosInstance.get("/news")
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
}

export const getOneNew = async (id) => {
  try {
    const response = await axiosInstance.get(`/news/${id}`);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
}


export const putNews = async (obj, id) => {
  try {
    const response = await axiosInstance.put(`/news/${id}`, obj, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
}

export const deleteNews = async (id) => {
  try {
    const response = await axiosInstance.delete(`/news/${id}`)
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
}


export const postImageCategorys = async (image) => {
  try {
    const form = new FormData();
    form.append("CategorysPhoto", image);
    const response = await axiosInstance.post("/categorysPhoto", form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (response) {
      return response.data.message;
    }
    return null;
  } catch (error) {
    console.log("error: ", error);
  }
}
export const getArrImagesCategorys = async () => {
  try {
    const response = await axiosInstance.get("/categorysPhoto");
    if (response) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log("error: ", error);
  }
}

export const deleteImageCategorys = async (id) => {
  try {
    const response = axiosInstance.delete(`/categorysPhoto/${id}`);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
}