import { auth, BaseUrl } from "@/apiEndpoints";
import {  setLatestSixBlogs } from "@/features/blogSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetLatestSixBlogs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BaseUrl}${auth.latestSixBlogs}`);

        if (!response.data.success) {
          throw new Error("Failed to fetch blogs");
        }

        dispatch(setLatestSixBlogs(response.data.data));
      } catch (error: any) {
        console.log(
          "fetchAllBlogs error:",
          error?.response?.data?.message || error.message
        );
      }
    };
    fetchBlogs();
  }, [dispatch]);
};
