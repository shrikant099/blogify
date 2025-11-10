"use client";
import { motion } from "framer-motion";
import { Code2, Globe, Rocket } from "lucide-react";

export const AboutSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden ">
      <div className="max-w-7xl mx-auto px-6 space-y-8 text-left">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold tracking-tight"
        >
          About <span className="text-primary">Our Blog Platform</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-muted-foreground max-w-3xl leading-relaxed"
        >
          Welcome to our <span className="font-semibold text-foreground">Blog Application</span> — 
          a creative platform built to share knowledge, experiences, and fresh perspectives with the world.  
          Here, writers and readers connect through stories that inspire, educate, and engage.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-muted-foreground max-w-3xl leading-relaxed"
        >
          Our mission is to make publishing easy and reading enjoyable.  
          From insightful blogs to technical guides, this platform is designed to encourage creativity and expression.  
          Whether you're a casual reader or a passionate writer, you’ll find your voice here.
        </motion.p>

        {/* Floating icons (left-aligned but subtle) */}
        <div className="relative flex gap-6 mt-10">
          <motion.div
            className="p-4 rounded-full bg-primary/10 backdrop-blur-lg shadow-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Code2 className="h-6 w-6 text-primary" />
          </motion.div>

          <motion.div
            className="p-4 rounded-full bg-primary/10 backdrop-blur-lg shadow-md"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Globe className="h-6 w-6 text-primary" />
          </motion.div>

          <motion.div
            className="p-4 rounded-full bg-primary/10 backdrop-blur-lg shadow-md"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Rocket className="h-6 w-6 text-primary" />
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          }}
          className="mt-10 inline-block bg-primary text-white font-medium px-6 py-3 rounded-full transition-all"
        >
          Explore More ↓
        </motion.button>
      </div>
    </section>
  );
};
