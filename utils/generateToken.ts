import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

 export const getToken = (id: string) => {

  const token = jwt.sign({ id }, process.env.JWT_KEY || '', {
    expiresIn: "30d",
  });
  return token;
};



export const getPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

