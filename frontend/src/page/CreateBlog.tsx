import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BaseUrl, auth } from "@/apiEndpoints";
import { Loader2, Upload, X } from "lucide-react";
import { motion } from "framer-motion";

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle Image Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Add tag
  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  // Remove tag
  const handleTagRemove = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !content || !image) {
      alert("Please fill all fields and upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("tags", JSON.stringify(tags));
    console.log(tags);
    try {
      setLoading(true);
      const res = await axios.post(`${BaseUrl}${auth.createBlog}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Blog created successfully!");
      console.log(res.data);

      // Reset form
      setTitle("");
      setCategory("");
      setContent("");
      setTags([]);
      setTagInput("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-10"
        >
          <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            Create a New Blog
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring" }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Blog Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title..."
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </motion.div>

            {/* Category */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring" }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Technology, Travel, Health..."
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </motion.div>

            {/* Tags */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring" }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                {tags.map((tag, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <X
                      size={14}
                      onClick={() => handleTagRemove(tag)}
                      className="cursor-pointer hover:text-red-500"
                    />
                  </motion.span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagAdd}
                  placeholder="Type tag & press Enter"
                  className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-100"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring" }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                placeholder="Write your blog content here..."
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
              ></textarea>
            </motion.div>

            {/* Image Upload */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring" }}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-6 hover:border-blue-500 transition"
            >
              <label
                htmlFor="fileUpload"
                className="flex flex-col items-center cursor-pointer"
              >
                {preview ? (
                  <motion.img
                    src={preview}
                    alt="Preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-72 h-44 object-cover rounded-xl mb-4 shadow-lg"
                  />
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Click to upload an image
                    </p>
                  </>
                )}
                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring" }}
            >
              <div className="text-center">
                <Button
                  type="submit"
                  className="px-8 py-3 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center mx-auto shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                  ) : (
                    "Publish Blog "
                  )}
                </Button>
              </div>
            </motion.div>
          </form>
        </motion.div>
      </section>

      <SiteFooter />
    </>
  );
};

export default CreateBlog;
