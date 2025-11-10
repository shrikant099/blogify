import React from "react";
import { motion } from "framer-motion";
import { Edit2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import guestImg from "@/assets/guest.png";
import { EditProfileModal } from "./EditProfile";
import { setCurrentUser } from "@/features/userSlice";
import axios from "axios";
import { auth, BaseUrl } from "@/apiEndpoints";
import { toast } from "react-hot-toast";
const UserProfileCard = () => {
  const [isItOpen, setIsItOpen] = React.useState(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  // Handle profile edit
  const handleEditClick = async (
    updateData: { name: string; file?: File },
    setLoading: (val: boolean) => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", updateData.name);
      if (updateData.file) formData.append("avatar", updateData.file);

      const response = await axios.post(
        `${BaseUrl}${auth.updateUserProfile}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        dispatch(setCurrentUser(response.data.user));
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed");
    } finally {
      setLoading(false); // loader off
      setIsItOpen(false); // modal close
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsItOpen(true)}
          className="absolute top-6 right-6 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          aria-label="Edit profile"
        >
          <Edit2 size={20} />
        </motion.button>

        {/* Profile content */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative flex-shrink-0"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
              <img
                src={currentUser.avatar || guestImg}
                alt={currentUser.name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {currentUser.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {currentUser.email}
            </p>
            {/* <div className="inline-block px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm font-semibold text-primary capitalize">
                {user.role}
              </p>
            </div> */}
          </motion.div>
        </div>
      </motion.div>

      <EditProfileModal
        isOpen={isItOpen}
        onClose={() => setIsItOpen(false)}
        onSave={handleEditClick}
        currentAvatar={currentUser?.avatar}
        currentName={currentUser.name}
      />
    </>
  );
};

export default UserProfileCard;
