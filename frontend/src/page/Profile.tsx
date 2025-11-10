import React from "react";
import { Navbar } from "@/components/Navbar";
import UserProfileCard from "@/components/UserProfileCard";
import UserBlogs from "@/components/UserBlogs";



const Profile = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-20 px-4">
        <div className="max-w-2xl mx-auto">
          <UserProfileCard />
        </div>

        <UserBlogs />
      </main>
    </>
  );
};

export default Profile;
