// middleware/upload.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
const avatarStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "avatars",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});
const productStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "product",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});
const uploadAvatar = multer({ storage: avatarStorage });
const uploadProduct = multer({ storage: productStorage });
export { uploadAvatar, uploadProduct };
