import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl, auth } from "@/apiEndpoints";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "@/features/blogSlice";
import type { RootState } from "@/store/store";

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchData = useSelector((state: RootState) => state.blog.searchData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (keyword) fetchBlogs();
  }, [keyword]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${BaseUrl}${auth.search}?keyword=${keyword}`);
      dispatch(setSearchData(res.data.data));
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      setError("No blogs found for your search.");
    } finally {
      setLoading(false);
    }
  };

  const readMoreButton = (slug: string) => {
    navigate(`/blog/${slug}`);
  } 
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gray-50 dark:bg-background py-10 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Search Results for "<span className="text-blue-600">{keyword}</span>"
        </h2>

        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
          </div>
        ) : error ? (
          <p className="text-center text-gray-500 mt-10">{error}</p>
        ) : !searchData || searchData.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No blogs found. Try another keyword.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {searchData.map((blog: any) => (
              <div
                key={blog._id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                {/* Blog Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={blog.image || "/assets/blog-placeholder.jpg"}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-blue-500 mb-3 font-medium uppercase tracking-wide">
                    {blog.category}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {blog.content?.slice(0, 100)}...
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-4 w-full rounded-xl"
                    onClick={() => readMoreButton(blog.slug)}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <SiteFooter />
    </>
  );
};

export default Search;
