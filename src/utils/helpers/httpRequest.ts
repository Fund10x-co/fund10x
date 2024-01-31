import { AxiosResponse } from "axios";
import axiosInstance from "../config/axios";

export const handleAxiosGetRequest = async (url: string) => {
  return await axiosInstance
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(handleError(error)?.error?.message);
    });
  // try {
  //   const result: any = await axiosInstance.get(url).then((response) => {
  //     return response.data;
  //   });

  //   return result;
  // } catch (error) {}
};

export const handleAxiosPOSTRequest = async (url: string, payload: any) => {
  return await axiosInstance
    .post(url, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("error", error);
      throw new Error(handleError(error)?.error?.message);
    });
};

function handleError(error: any) {
  if (error?.response) {
    return {
      error: {
        status: error?.response?.status,
        message: error?.response?.data[0],
      },
      status: error?.response?.status,
      message: error?.response?.message,
      headers: error?.response?.headers,
    };
  } else if (error?.request) {
    return {
      error: {
        status: 404,
        message: error?.message,
      },
    };
  } else {
    return {
      error: {
        status: 404,
        message: error?.message,
      },
    };
  }
}
