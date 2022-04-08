import  {Request,Response ,NextFunction} from 'express'
import { PrismaClient } from '@prisma/client'

const {comment} =new   PrismaClient()
export const createComment =async(req:Request, res:Response,next: NextFunction) => {
      try{
       const {  Comment ,WrittenById}=req.body

        const userComment = await comment.findUnique({
            where:{
                id:WrittenById
            }
        })
        if(!userComment){
            return res.status(404).json({msg: "User not found"})
        }
        
       res.json(userComment)

       const  createComment = await comment.create({
        data:{
            Comment,
            WrittenById
        }
    })
    res.json(createComment)
 
      }
catch(err){
res.status(400).json({ message:"comments not created"})

}

}
export const DeleteComment = async(req: Request, res: Response,next: NextFunction) =>{
    try{
        const {id}=req.params

const deletes= await comment.findUnique({
    where: {
        id:Number(id)
    }
})
return res.status(204).json({success: true,deletes})


    }
    catch(err){
        res.status(400).json({ message:"comments not deleted"})
    }

}
export const EditComment = async(req: Request, res: Response,next: NextFunction) =>{
    try{
        const {id}=req.params

const editcomment= await comment.findUnique({
    where: {
        id:Number(id)
    }
})
return res.status(204).json({success: true,editcomment})


    }
    catch(err){
        res.status(400).json({ message:"comments not edited"})
    }

}