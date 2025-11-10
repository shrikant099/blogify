import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import SignUp from "./page/SignUp";
import LoginPage from "./page/Login";
import { Toaster } from "react-hot-toast";
import BlogListPage from "./page/Blog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "./hooks/useGetCurrentuser";
import { setCurrentUser } from "./features/userSlice";
import type { RootState } from "./store/store";
import Profile from "./page/Profile";
import { useGetAllBlogs } from "./hooks/useGetAllBlogs";
import { useGetLatestSixBlogs } from "./hooks/useLatestSixBlogs";
import Search from "./page/Search"
import SlugBlog from "./page/SlugBlog";
import CreateBlog from "./page/CreateBlog";
function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const userData = useSelector((state: RootState) => state.user.userData);

  // fetch current user
  useEffect(() => {
    if (currentUser) return;

    fetchCurrentUser().then((user) => {
      if (user) dispatch(setCurrentUser(user));
    });
  }, [currentUser, dispatch]);

  // Fetch Blog
  useGetAllBlogs();
  // latest six blogs
  useGetLatestSixBlogs();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <BrowserRouter>
        {/*  Toaster configration */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />

        <Routes>
          <Route path="/" element={userData ? <Home /> : <Navigate to={"/signin"}/>} />
          <Route
            path="/signup"
            element={currentUser ? <Navigate to="/" /> : <SignUp />}
          />
           <Route
            path="/signin"
            element={currentUser ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/blog/:slug" element={<SlugBlog />} />
          <Route path="/createBlog" element={<CreateBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
