import multer, { memoryStorage } from "multer";

const storage = memoryStorage();

export const upload = multer({ storage });
