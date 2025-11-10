import React from 'react'
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    title: "Building Mental Strength in Sports",
    desc: "Discover how mindset plays the biggest role in improving your sports performance and confidence.",
    img: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
    date: "Nov 1, 2025",
  },
  {
    id: 2,
    title: "Top 5 Fitness Habits for Athletes",
    desc: "These simple daily habits can help any athlete improve endurance, strength, and focus.",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    date: "Oct 15, 2025",
  },
  {
    id: 3,
    title: "Smart Nutrition for Peak Performance",
    desc: "What you eat defines how you perform. Here’s a clean nutrition strategy designed for athletes.",
    img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    date: "Sep 27, 2025",
  },
];
const UserBlogs = () => {
  return (
    <section className="mt-16 mb-16 max-w-5xl mx-auto px-4 md:px-6">
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-10 tracking-tight">
        📝 My Blogs
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            <div className="p-5 flex flex-col justify-between min-h-[200px]">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 leading-snug hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{blog.desc}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">{blog.date}</span>
                <button className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-all">
                  Read More <FaArrowRight className="text-xs" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>  )
}

export default UserBlogs