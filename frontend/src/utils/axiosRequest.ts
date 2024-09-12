import axios from "axios";

import settings from "@/config";

import { HttpMethods } from "@/constants";

const axiosRequest = async (
  method: HttpMethods,
  path: string,
  data = {}
): Promise<{
  status: number;
  data: any;
  error: any;
}> => {
  // get token from local storage
  const token = localStorage.getItem("token");
  const url = settings.API_URL + "v1" + path;
  try {
    const response = await axios({
      method,
      url,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
      params: method === HttpMethods.GET ? data : {},
    });
    return {
      status: response.status,
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    // Error handling
    console.error("Error en la solicitud:", error);
    if (!error.response) {
      return {
        status: 500,
        data: null,
        error: "Error en la solicitud",
      };
    }
    return {
      status: error.response.status,
      data: null,
      error: error.response.data.message,
    };
  }
};

export default axiosRequest;
