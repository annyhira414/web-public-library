/** @format */

import axios from "axios";
import { API_BASE_URL, getAllCookies } from "@/lib/helpers";
import { Header } from "@/lib/model";
import Cookies from "js-cookie";
const language = Cookies.get("language");

const authToken = getAllCookies();

export const getData = async (
  url: string,
  params?: any,
  lang?: string,
  token?: string
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${url}`, {
      params,
      headers: {
        Authorization: token,
        "Accept-Language": lang,
        "Request-Source": "web",
      },
    });
    // return response;

    if ([200].includes(response.status)) {
      return {
        success: true,
        data: response?.data,
        status: response?.status,
      };
    } else if ([617].includes(response.status)) {
      return {
        success: true,
        data: response?.data,
        status: response?.status,
      };
    } else if (response.status === 404) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    } else if (response.status === 500) {
      return {
        redirect: {
          destination: "/500",
          permanent: false,
        },
      };
    } else if (response.status === 401) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    } else {
      return {
        success: false,
        data: [],
      };
    }
  } catch (err: any) {
    if (err?.response?.status === 404) {
      return {
        success: false,
        data: err?.response?.data?.error,
        status: err?.response?.status,
        message: err?.response?.error,
      };
    } else {
      return {
        success: false,
        data: [],
        status: err?.response?.status,
        message: err?.response?.error,
      };
    }
  }
};

export const getPaginatedData = async (
  url: string,
  params?: any,
  lang?: string,
  token?: string
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${url}`, {
      params,
      headers: {
        Authorization: token,
        "Accept-Language": lang,
        "Request-Source": "web",
      },
    });
    // return response;
    if ([200].includes(response.status)) {
      return {
        success: true,
        data: response,
      };
    } else if (response.status === 404) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    } else if (response.status === 500) {
      return {
        redirect: {
          destination: "/500",
          permanent: false,
        },
      };
    } else if (response.status === 401) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    } else {
      return {
        success: false,
        data: [],
      };
    }
  } catch (err: any) {
    return {
      success: false,
      data: [],
      status: err?.response?.status,
      message: err?.response?.error,
    };
  }

  // } catch (err: any) {
  //   return err;
  // }
};

export const getDetails = async (
  url: string,
  id?: string | number,
  lang?: string,
  token?: string
) => {
  try {
    const modifiedUrl = id
      ? `${API_BASE_URL}/${url}/${id}`
      : `${API_BASE_URL}/${url}`;
    const response = await axios.get(modifiedUrl, {
      headers: {
        Authorization: token,
        "Accept-Language": lang,
        "Request-Source": "web",
      },
    });
    if ([200].includes(response.status)) {
      return {
        success: true,
        data: response?.data,
      };
    } else if (response.status === 404) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    } else if (response.status === 500) {
      return {
        redirect: {
          destination: "/500",
          permanent: false,
        },
      };
    } else if (response.status === 401) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    } else {
      return {
        success: false,
        data: [],
      };
    }
  } catch (err: any) {
    return {
      success: false,
      data: [],
      status: err?.response?.status,
      message: err?.response?.error,
    };
  }
};

export const postData = async (
  url: string,
  data: any,
  lang?: string,
  token?: string
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${url}`, data, {
      headers: {
        Authorization: token,
        "Accept-Language": lang,
        "Request-Source": "web",
      },
    });
    if (response.status === 201 || response.status === 200) {
      return {
        success: true,
        data: response,
      };
    } else {
      return {
        success: false,
        data: response?.data,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      data: err?.response?.data,
      status: err?.response,
      message: err?.response,
    };
  }
};

export const updateData = async (
  url: string,
  data?: any,
  id?: number | string,
  token?: string
) => {
  try {
    const putUrl = id ? `${url}/${id}` : `${url}`;
    const response = await axios.put(`${API_BASE_URL}/${putUrl}`, data, {
      headers: {
        Authorization: token,
        "Accept-Language": "en",
        "Request-Source": "web",
      },
    });
    if ([200, 2001].includes(response.status)) {
      return {
        success: true,
        data: response,
      };
    } else {
      return {
        success: false,
        data: response,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      data: {},
      status: err?.response?.status,
      message: err?.response?.data?.message,
    };
  }
};

export const deleteData = async (
  url: string,
  id?: number | string,
  token?: string
) => {
  try {
    const modifiedUrl = id
      ? `${API_BASE_URL}/${url}/${id}`
      : `${API_BASE_URL}/${url}`;
    const response = await axios.delete(modifiedUrl, {
      headers: {
        Authorization: token,
        "Accept-Language": "en",
        "Request-Source": "web",
      },
    });
    return {
      success: true,
      data: response?.data,
    };
  } catch (err: any) {
    return {
      success: false,
      data: {},
      status: err?.response?.status,
      message: err?.response?.data?.message,
    };
  }
};

export const patchData = async (
  url: string,
  params?: any,
  token?: string,
  lang?: string
) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${url}`, params, {
      headers: {
        Authorization: token,
        "Accept-Language": lang,
        "Request-Source": "web",
      },
    });

    if ([200, 2001].includes(response.status)) {
      return {
        success: true,
        data: response?.data,
      };
    } else {
      return {
        success: false,
        data: response,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      data: {},
      status: err?.response?.status,
      message: err?.response?.data?.message,
    };
  }
};

export const signInData = async (url: string, data: any, lang?: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${url}`, data, {
      headers: {
        Authorization: authToken,
      },
    });

    return response;
  } catch (err: any) {
    return {
      success: false,
      data: err?.response?.data,
      status: err?.response,
      message: err?.response,
    };
  }
};

export const getAData = async (
  url: string,
  params?: any,
  lang?: string,
  token?: string
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${url}`, {
      params,
      headers: {
        Authorization: token,
        "Accept-Language": lang,
        "Request-Source": "web",
      },
    });
    // return response;

    if ([200].includes(response.status)) {
      return {
        success: true,
        data: response?.data,
        status: response?.status,
      };
    } else {
      return {
        success: false,
        data: response?.data,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      data: [],
      status: err?.response?.status,
      message: err?.response?.error,
    };
  }
};

export const getPublicIp = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    if (response.ok) {
      const data = await response.json();
      return data.ip;
    } else {
      console.error("Failed to fetch public IP");
    }
  } catch (error) {
    console.error("Error fetching public IP:", error);
  }
};

// $2a$12$4Uqdn1215CQCXRDDnQo.JuQMw7yRZcS6LE03yCTcnWI9bGKI8XNP
// $2a$12$wJfGQyHMu56A1NqasYcKh.gaE4vnixQdga9OCAhO1MjOXf42uL0LS
