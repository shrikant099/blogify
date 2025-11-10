import { auth, BaseUrl } from "@/apiEndpoints";
import { setBlogData } from "@/features/blogSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetAllBlogs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get(`${BaseUrl}${auth.getAllBlogs}`);

        if (!response.data.success) {
          throw new Error("Failed to fetch blogs");
        }

        dispatch(setBlogData(response.data.data));
      } catch (error: any) {
        console.log(
          "fetchAllBlogs error:",
          error?.response?.data?.message || error.message
        );
      }
    };
    fetchAllBlogs();
  }, [dispatch]);
};
