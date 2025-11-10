import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl, auth } from "@/apiEndpoints";
import { Loader2, Heart, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { motion, AnimatePresence } from "framer-motion";

const SlugBlog: React.FC = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (slug) fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BaseUrl}${auth.getBlogWithSlug}/${slug}`);
      setBlog(res.data.data);
    } catch (err) {
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gray-50 dark:bg-background">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
          </div>
        ) : blog ? (
          <>
            {/* Animated Top Image */}
            <motion.div
              className="w-full h-[400px] md:h-[500px] relative overflow-hidden"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <img
                src={blog.image || "/assets/blog-placeholder.jpg"}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg text-center px-4"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {blog.title}
                </motion.h1>
              </div>
            </motion.div>

            {/* Blog Content Section */}
            <motion.div
              className="max-w-4xl mx-auto px-6 py-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <p className="text-blue-600 font-semibold uppercase tracking-wide mb-4">
                {blog.category}
              </p>

              <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg space-y-6">
                {blog.content}
              </div>

              {/* Like and Comment Buttons */}
              <div className="flex items-center gap-6 mt-10 border-t pt-6">
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  onClick={handleLike}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
                >
                  <Heart
                    className={`h-6 w-6 ${
                      liked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span>{liked ? "Liked" : "Like"}</span>
                </motion.button>

                <button
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span>{comments.length} Comments</span>
                </button>
              </div>

              {/* Comment Input */}
              <AnimatePresence>
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Write your comment..."
                  ></textarea>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={handleComment}
                    className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Post Comment
                  </motion.button>
                </motion.div>
              </AnimatePresence>

              {/* Display Comments */}
              {comments.length > 0 && (
                <motion.div
                  className="mt-8 space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-xl font-semibold">Comments</h3>
                  {comments.map((cmt, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <p className="text-gray-800 dark:text-gray-200">{cmt}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-20">Blog not found.</p>
        )}
      </section>
      <SiteFooter />
    </>
  );
};

export default SlugBlog;
