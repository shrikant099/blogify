// uploadOnCloudinary.ts
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import path from "node:path";
import fs from "node:fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.ClOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localFilePath: string): Promise<string | null> => {
    try {
        if (!localFilePath) return null;
        const absolutePath = path.resolve(localFilePath);
        // Upload on cloudinary
        const result: UploadApiResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "blogs"
        });

        // Delete local file after successful upload
        fs.unlinkSync(absolutePath);

        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);

        const absolutePath = path.resolve(localFilePath);
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
        }

        return null;
    }
};


export  const getPublicId = (url: string) => {
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    return filename.split(".")[0];           
}

export default uploadOnCloudinary;
