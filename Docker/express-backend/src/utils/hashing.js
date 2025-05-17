import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

export const validatePassword = async (db_password, user_password) => {
  return await bcrypt.compare(db_password, user_password);
};
