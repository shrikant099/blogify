import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:py-20 overflow-hidden">
      <div className="flex flex-col items-start gap-6">

        {/* Tagline with fade-down */}
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
        >
          Modern Blogging
        </motion.span>

        {/* Hero Title with spring pop-up */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl"
        >
          Write big. Share bigger.
        </motion.h1>

        {/* Description with slight delay */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="max-w-2xl text-pretty text-muted-foreground md:text-lg"
        >
          Ek tez, saaf-suthra blog application — kahaniyan likhiye, ideas share
          kijiye, aur nayi posts discover kijiye.
        </motion.p>

        {/* Buttons with staggered appearance */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delayChildren: 0.6, staggerChildren: 0.2 },
            },
          }}
          className="flex flex-wrap items-center gap-3"
        >
          <motion.div
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          >
            <Button size="lg" asChild>
              <Link to="/createBlog">Create a Blog</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          >
            <Button size="lg" variant="secondary" asChild>
              <Link to="/blogs">Explore Posts</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
