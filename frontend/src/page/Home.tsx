import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/HeroSection";
import { motion } from "framer-motion";
import { BlogCard } from "@/components/BlogCards";
import { AboutSection } from "@/components/About";
import { SiteFooter } from "@/components/SiteFooter";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
// const blogs = [
//   {
//     _id: "1",
//     title: "Mastering Backend with Node.js",
//     slug: "mastering-backend-nodejs",
//     content: "Learn how to build scalable APIs using Express and MongoDB...",
//     author: { name: "Shrikant Soni", avatar: "/shrikant.jpg" },
//     tags: ["nodejs", "backend", "express"],
//     category: "Programming",
//     createdAt: "2025-10-09T08:30:00Z",
//     image:
//       "https://images.unsplash.com/photo-1760164142066-1ac379c057f5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=400",
//   },
//   {
//     _id: "2",
//     title: "Mastering Backend with Node.js",
//     slug: "mastering-backend-nodejs",
//     content: "Learn how to build scalable APIs using Express and MongoDB...",
//     author: { name: "Shrikant Soni", avatar: "/shrikant.jpg" },
//     tags: ["nodejs", "backend", "express"],
//     category: "Programming",
//     image: "https://images.unsplash.com/photo-1757495152235-e6a79bcf7ea2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=400",
//     createdAt: "2025-10-09T08:30:00Z",
//   },
//   {
//     _id: "3",
//     title: "Mastering Backend with Node.js",
//     slug: "mastering-backend-nodejs",
//     content: "Learn how to build scalable APIs using Express and MongoDB...",
//     author: { name: "Shrikant Soni", avatar: "/shrikant.jpg" },
//     tags: ["nodejs", "backend", "express"],
//     category: "Programming",
//     image: "https://plus.unsplash.com/premium_photo-1759661469246-3258ad3797a6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=400",
//     createdAt: "2025-10-09T08:30:00Z",
//   },
//   {
//     _id: "4",
//     title: "Mastering Backend with Node.js",
//     slug: "mastering-backend-nodejs",
//     content: "Learn how to build scalable APIs using Express and MongoDB...",
//     author: { name: "Shrikant Soni", avatar: "/shrikant.jpg" },
//     tags: ["nodejs", "backend", "express"],
//     category: "Programming",
//     image: "https://images.unsplash.com/photo-1760126130338-4e6c9043ee2d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=400",
//     createdAt: "2025-10-09T08:30:00Z",
//   },
//   {
//     _id: "5",
//     title: "Mastering Backend with Node.js",
//     slug: "mastering-backend-nodejs",
//     content: "Learn how to build scalable APIs using Express and MongoDB...",
//     author: { name: "Shrikant Soni", avatar: "/shrikant.jpg" },
//     tags: ["nodejs", "backend", "express"],
//     category: "Programming",
//     image: "https://images.unsplash.com/photo-1758846182585-c37d8c2946c2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=400",
//     createdAt: "2025-10-09T08:30:00Z",
//   },
// ];
const Home = () => {
  const latestSix = useSelector((state: RootState) => state.blog.latestSix);

  return (
    <div className="max-w-7xl mx-auto p-1 md:p-4">
      <Navbar />
      <Hero />
      <AboutSection />

      {/* Blogs */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h1 className="text-gray-800 font-bold text-2xl text-center mb-6">
          Latest Blogs
        </h1>
        <BlogCard blogs={latestSix} />
      </motion.div>

      {/*  Footer  */}
      <SiteFooter />
    </div>
  );
};

export default Home;
