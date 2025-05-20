import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_SECRET,
} from "./envVar.js";

cloudinary.config({
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
  cloud_name: CLOUDINARY_CLOUD_NAME,
});

export const uploadImage = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  const upload = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "blinkit" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);
  });

  return upload;
};
