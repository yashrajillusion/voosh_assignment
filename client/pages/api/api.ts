import axios, { AxiosInstance } from "axios";
import {
  AuthUserData,
  CommonApiResponse,
  CreateOrderReqData,
  LoginReqData,
  Orders,
  RegisterReqData,
} from "./types";
import { getGlobalItem } from "@/utils/local-storage";
const accessToken = getGlobalItem("user")?.access_token;

export const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    authorization: "Bearer " + accessToken,
  },
});

export const setInstance = (instance: AxiosInstance) => {
  instance.defaults.headers["authorization"] =
    "Bearer " + getGlobalItem("user")?.access_token;
};

export const login = async (
  loginData: LoginReqData,
  login_by = "normal"
): Promise<CommonApiResponse<AuthUserData>> => {
  const { data } = await instance.post(`login-user/${login_by}`, loginData);
  return data;
};

export const registerAccount = async (
  registerData: RegisterReqData
): Promise<CommonApiResponse<AuthUserData>> => {
  const { data } = await instance.post("add-user", registerData);
  return data;
};

export const getAllOrder = async (
  userId: string
): Promise<CommonApiResponse<Orders[]>> => {
  const { data } = await instance.get("get-order", {
    params: {
      user_id: userId,
    },
  });
  return data;
};

export const createOrder = async (
  orderData: CreateOrderReqData
): Promise<CommonApiResponse<Orders>> => {
  const { data } = await instance.post("add-order", orderData);
  return data;
};
