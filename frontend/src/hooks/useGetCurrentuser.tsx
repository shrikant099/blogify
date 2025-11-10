"use client";

import { auth, BaseUrl } from "@/apiEndpoints";
import type { ApiResponse, User } from "@/types/user/user";
import axios from "axios";

export const fetchCurrentUser = async (): Promise<User | null> => {

    try {
      const response = await axios.get<ApiResponse>(
        `${BaseUrl}${auth.getCurrentUser}`,
        { withCredentials: true } 
      );
      return response.data.data;
    } catch (error: any) {
      console.log("fetchCurrentUser error:", error?.response?.data?.message || error.message);
      return null; // fail silently, static content will not block
    }
  };
  