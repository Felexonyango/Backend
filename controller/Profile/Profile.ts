import  {Request,Response ,NextFunction} from 'express'
import { PrismaClient } from '@prisma/client'

const {profile} =new   PrismaClient()
export const CreateProfile =async(req:Request, res:Response,next: NextFunction) => {
      try{
       const {Bio,userId}=req.body

        const profiles = await profile.findUnique({
            where:{
                id: userId
            }
        })
        if(!profiles){
            return res.status(404).json({msg: "User not found"})
        }
        
       res.json(profiles)

       const  useraddress = await profile.create({
        data:{
            Bio,
            userId
       

        }
    })
    res.json(useraddress)
 
      }
catch(err){
next(err)

}

}
export const UpdateProfile = async(req: Request, res: Response,next: NextFunction) =>{
    try{
        const {id}=req.params

const update= await profile.findUnique({
    where: {
        id:Number(id)
    }
})
return res.json(update)


    }
    catch(err){
        next(err)
    }

}
export const DeleteProfile = async(req: Request, res: Response,next: NextFunction) =>{
    try{
        const {id}=req.params

const deletes= await profile.findUnique({
    where: {
        id:Number(id)
    }
})
return res.json(deletes)


    }
    catch(err){
        next(err)
    }

}