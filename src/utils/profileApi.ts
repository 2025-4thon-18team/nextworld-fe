// src/utils/profileApi.ts
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const getMyProfile = async () => {
  const { data } = await axios.get(`${BASE_URL}/users/me`, {
    withCredentials: true,
  });
  return data;
};

export const updateMyProfile = async (payload: any) => {
  const { data } = await axios.put(`${BASE_URL}/users/me`, payload, {
    withCredentials: true,
  });
  return data;
};
