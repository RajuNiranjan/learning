import { v2 as cloudinary } from "cloudinary";
import { ENV_VARIABLES } from "./env.js";
cloudinary.config({
  cloud_name: ENV_VARIABLES.CLOUDINARY_CLOUD_NAME,
  api_key: ENV_VARIABLES.CLOUDINARY_API_KEY,
  api_secret: ENV_VARIABLES.CLOUDINARY_API_SECRET,
});

export const cloudinaryAvatarUploader = async (file) => {
  try {
    const buffer = file.buffer || Buffer.from(await file.arrayBuffer());

    const uploadImg = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "user",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            if (result && result.secure_url) {
              resolve(result.secure_url);
            } else {
              reject(new Error("Failed to get secure URL from upload"));
            }
          }
        )
        .end(buffer);
    });

    return uploadImg;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw error to be handled by caller
  }
};
