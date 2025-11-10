import { AuthForm } from '@/components/AuthForm'
import { Navbar } from '@/components/Navbar'
import { motion } from "framer-motion";
const SignUp = () => {
  return (
    <>
    <Navbar />
    <main className="mx-auto max-w-3xl px-4">
        <section className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <h1 className="sr-only">Create a Blogify account</h1>
            <AuthForm mode="signup" />
          </motion.div>
        </section>
      </main>
  </>  )
}

export default SignUp