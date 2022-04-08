import  {Request,Response ,NextFunction} from 'express'
import { PrismaClient } from '@prisma/client'
import {getToken,getPassword} from '../../utils/generateToken'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Iuser,Body} from '../../type'

const {user} =new   PrismaClient()


export const Signup = async(req:Request, res:Response,next:NextFunction)=>{
 const {id} = req.params
try{
    const {name,email,password}=req.body as Iuser

    const hashedPassword = await getPassword(password)
const users =await user.create({
    data:{
        name,
        email,
        password:hashedPassword
        
    },
    select:{
        id:true,
        email:true,
        name:true,
    }
})

res.status(201).json({ success: true, users: {
    name:users.name,
    email:users.email,
    token:getToken(id)

} });

}
catch(err){
res.status(400).json({ message:"user already exists"})

}

}
export const SignIn  =async(req: Request,res: Response,next: NextFunction)=>{
 
    const { email, password } = req.body as Body
    try{
   

    const users = await user.findUnique({
        where:{
            email: email,
        }
        
    })
    if (!users) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User with this email is not found" }] });
      }

      const isMatch = await bcrypt.compare(password, users.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid password" }] });
      }

      const payload = {
        users: {
          id: users.id
        }
      };
      jwt.sign(
        payload,
        process.env.JWT_KEY || '',
        {    expiresIn: "7d",},
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
   
    
    }
    catch(err){
      res.status(400).json({ message:"Server error"})

    }
}