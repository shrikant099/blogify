import { Link, useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import axios from "axios";
import { toast } from "react-hot-toast";
import { auth, BaseUrl } from "@/apiEndpoints";
import { setCurrentUser, setUserData } from "@/features/userSlice";
import guestImg from "@/assets/guest.png";
import React, { useState } from "react";

export function Navbar() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout
  const logout = async () => {
    try {
      if (!currentUser) {
        toast.error("No user is currently logged in");
        return;
      }
      const response = await axios.get(`${BaseUrl}${auth.logout}`, {
        withCredentials: true,
      });
      if (!response.data.success) {
        toast.error("logout failed");
        return;
      }
      dispatch(setUserData(null));
      dispatch(setCurrentUser(null));
      toast.success("logout successful");
      navigate("/signin");
    } catch (error: any) {
      console.log("Logout error:", error);
      toast.error("An error occurred during logout");
    }
  };

  // Search Blog
  const searchBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return toast.error("Please enter a search term");
    navigate(`/search?keyword=${encodeURIComponent(input)}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-1">
        {/* Brand */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-semibold tracking-tight"
          aria-label="Blogify home"
        >
          <span className="text-xl">Blogify</span>
        </Link>

        {/* Search */}
        <div className="flex items-center gap-2">
          <form
        
            className="flex items-center gap-2"
          >
            <label htmlFor="q" className="sr-only">
              Search blogs
            </label>
            <Input
              id="q"
              name="q"
              type="search"
              onKeyDown={(e) => {
                if(e.key === "Enter"){
                  e.preventDefault()
                  searchBlog(e)
                }
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search blogs..."
              aria-label="Search blogs"
              className="w-30 md:w-72"
            />
            <Button
              type="button"
              onClick={searchBlog}
              variant="secondary"
              className="w-15 md:w-20"
            >
              Search
            </Button>
          </form>

          {/* Profile avatar + dropdown using shadcn */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Open user menu"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={currentUser?.avatar || guestImg}
                    alt={currentUser?.name || "User avatar"}
                  />
                  <AvatarFallback>
                    {currentUser?.name
                      ? currentUser.name[0].toUpperCase()
                      : "G"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-44">
              <DropdownMenuLabel>
                {currentUser ? currentUser.name : "guest"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {currentUser && (
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
              )}
              {/* <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              {currentUser && (
                <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
