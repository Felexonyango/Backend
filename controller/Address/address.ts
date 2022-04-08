import  {Request,Response ,NextFunction} from 'express'
import { PrismaClient } from '@prisma/client'
const {address,user} =new   PrismaClient()
export const userAddress =async(req:Request, res:Response) => {
      
    const {country,city,street,userId}=req.body
    try{

 const userExists = await user.findUnique({
     where: {
         id: userId
     },
     select: {
         id: userId
     }
 })
 if(!userExists){
     return res.status(404).json({msg: "User not found"})
 }
 
res.json(userExists)
  
        const  useraddress = await address.create({
            data:{
                country,
                city,
                street,
                userId

            }
        })
        res.json(useraddress)
     
    }
    catch(error) {
        console.error(error)
    }


}