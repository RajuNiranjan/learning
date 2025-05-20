import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (userPassword, dbPassword) => {
  return await bcrypt.compare(userPassword, dbPassword);
};
