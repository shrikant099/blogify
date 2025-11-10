import { BlogCard } from "@/components/BlogCards";
import { Navbar } from "@/components/Navbar";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function BlogListPage() {
  const blogData: [] = useSelector((state: RootState) => state.blog.blogData);

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <h2 className="text-2xl font-bold mt-6">Latest Blogs</h2>
      <BlogCard blogs={blogData} />
    </div>
  );
}
