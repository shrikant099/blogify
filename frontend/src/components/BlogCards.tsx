"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import toast from "react-hot-toast";
import axios from "axios";
import { auth, BaseUrl } from "@/apiEndpoints";
import { setBlogData } from "@/features/blogSlice";
import { Loader2 } from "lucide-react";   

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  author: {
    name: string;
    avatar: string;
    _id: string;
  };
  tags?: string[];
  category?: string;
  createdAt: string;
}

interface BlogCardProps {
  blogs: Blog[];
}

export function BlogCard({ blogs = [] }: BlogCardProps) {
  const userData = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null); // ✅ delete loading per blog

  // ✅ Toggle menu open/close
  const handleToggleMenu = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  // ✅ Handle delete
  const handleDelete = async (id: string) => {
    setLoadingId(id);
    try {
      const response = await axios.delete(
        `${BaseUrl}${auth.deleteBlog}/${id}`,
        { withCredentials: true }
      );

      if (!response.data.success) {
        toast.error("Failed to delete blog");
        throw new Error("Failed to delete blog");
      }

      // ✅ Real-time update: Redux से उसी blog को remove करो
      dispatch(setBlogData((prev: Blog[]) => prev.filter((b) => b._id !== id)));

      toast.success("Blog Deleted Successfully");
    } catch (error: any) {
      toast.error("Something Went Wrong");
      console.error("handleDelete error:", error?.message || error);
    } finally {
      setLoadingId(null);
      setOpenMenuId(null);
    }
  };

  return (
    <motion.section
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.15 }}
      variants={{ hidden: {}, visible: {} }}
    >
      {blogs.map((blog) => {
        const isAuthor = blog.author?._id === userData?._id;

        return (
          <motion.article
            key={blog._id}
            aria-label={blog.title}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -10, scale: 1.03 }}
          >
            <motion.div className="relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-md backdrop-blur-md transition-all hover:shadow-xl">
              {/* ✅ Accent Bar */}
              <motion.div
                className="absolute left-0 top-0 h-full w-1 bg-primary"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* ✅ Click Menu (3 Dots) */}
              {isAuthor && (
                <div className="absolute top-3 right-3 z-20">
                  <button
                    onClick={() => handleToggleMenu(blog._id)}
                    className="p-2 rounded-full bg-background/80 hover:bg-muted/60 transition"
                    aria-label="Options"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12h.01M12 12h.01M18 12h.01"
                      />
                    </svg>
                  </button>

                  {/* ✅ AnimatePresence for smooth opening */}
                  <AnimatePresence>
                    {openMenuId === blog._id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-28 bg-card border rounded-xl shadow-lg overflow-hidden"
                      >
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-left text-sm text-destructive hover:bg-muted transition"
                          disabled={loadingId === blog._id}
                        >
                          {loadingId === blog._id ? (
                            <motion.div
                              initial={{ rotate: 0 }}
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.8,
                                ease: "linear",
                              }}
                            >
                              <Loader2 className="h-4 w-4 animate-spin" />
                            </motion.div>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* ✅ Blog Image */}
              {blog.image && (
                <motion.div className="relative w-full h-48 overflow-hidden">
                  <motion.img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700"
                    initial={{ scale: 1.05, opacity: 0.9 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"></div>
                </motion.div>
              )}

              {/* ✅ Author Info */}
              <div className="flex items-center gap-3 px-5 pt-5 relative z-10">
                <Avatar className="h-10 w-10 ring-1 ring-border">
                  <AvatarImage
                    src={blog.author?.avatar}
                    alt={blog.author?.name || "Author"}
                  />
                  <AvatarFallback>
                    {blog.author?.name
                      ? blog.author.name.slice(0, 2).toUpperCase()
                      : "AU"}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {blog.author?.name || "Unknown Author"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {blog.category && (
                  <span className="ml-auto rounded-full bg-secondary/70 px-2.5 py-1 text-[10px] font-medium text-secondary-foreground">
                    {blog.category}
                  </span>
                )}
              </div>

              {/* ✅ Blog Content */}
              <CardContent className="px-5 pb-6 pt-4 relative z-10">
                <motion.h3 className="mb-2 text-lg font-semibold leading-snug line-clamp-2 text-foreground hover:text-primary transition-colors duration-300">
                  {blog.title}
                </motion.h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {blog.content}
                </p>

                {/* ✅ Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blog.tags.map((tag, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="rounded-md bg-muted/70 px-2 py-1 text-xs text-muted-foreground"
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </div>
                )}

                {/* ✅ Like Icon */}
                <div className="mt-3 flex items-center gap-2 text-red-500 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0-010-6.364z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Like</span>
                </div>

                {/* ✅ Read More */}
                <motion.div
                  className="mt-5 flex items-center gap-2 text-sm font-medium cursor-pointer text-primary"
                  whileHover={{ x: 4 }}
                >
                  <Link to={`/blog/${blog.slug}`} className="inline-block">
                    Read more
                  </Link>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </CardContent>
            </motion.div>
          </motion.article>
        );
      })}
    </motion.section>
  );
}
