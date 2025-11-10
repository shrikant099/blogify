
"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export const SiteFooter = () => {
  return (
    <footer className="relative border-t border-primary/10 py-12 mt-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-10"
      >
        {/* Left side - Branding */}
        <div className="space-y-3 max-w-md">
          <h2 className="text-2xl font-bold text-primary">The Blog Space</h2>
          <p className="text-muted-foreground leading-relaxed">
            A modern platform to explore ideas, learn from developers, and share your own journey.  
            Built with passion, powered by creativity ✨
          </p>
        </div>

        {/* Right side - Links & social */}
        <div className="flex flex-col md:items-end gap-4">
          <div className="flex gap-6">
            {/* Icons */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: 10 }}
              className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition"
            >
              <Github className="h-5 w-5 text-primary" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: -10 }}
              className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition"
            >
              <Linkedin className="h-5 w-5 text-primary" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: 10 }}
              className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition"
            >
              <Twitter className="h-5 w-5 text-primary" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: -10 }}
              className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition"
            >
              <Mail className="h-5 w-5 text-primary" />
            </motion.a>
          </div>

          {/* Footer nav links */}
          <div className="flex gap-5 text-sm text-muted-foreground mt-4">
            <a href="#" className="hover:text-primary transition">Home</a>
            <a href="#" className="hover:text-primary transition">Blogs</a>
            <a href="#" className="hover:text-primary transition">About</a>
            <a href="#" className="hover:text-primary transition">Contact</a>
          </div>
        </div>
      </motion.div>

      {/* Bottom line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-10 text-center text-sm text-muted-foreground"
      >
        © {new Date().getFullYear()} <span className="text-primary font-medium">The Blog Space</span>.  
        All rights reserved.
      </motion.div>

      {/* Glow animation background */}
      <motion.div
        animate={{ 
          x: [0, 50, -50, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-primary/20 blur-3xl"
      ></motion.div>
    </footer>
  );
};
