import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const JWT_KEY="5f53f5b35a4f82003d3e8061"
 export const getToken = (id: string) => {

  const token = jwt.sign({ id },JWT_KEY , {
    expiresIn: "30d",
  });
  return token;
};



export const getPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

