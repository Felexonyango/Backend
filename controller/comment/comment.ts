import  {Request,Response ,NextFunction} from 'express'
import { PrismaClient } from '@prisma/client'

const {comment} =new   PrismaClient()
export const createComment =async(req:Request, res:Response,next: NextFunction) => {
      try{
        const {CommentList} = req.body

   

       const  createComment = await comment.createMany({
        data:CommentList
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

const deletes= await comment.delete({
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
    const {Comment, WrittenById}=req.body
    try{
     

const editcomment= await comment.update({
    where: {
        id:WrittenById
    },
    data:{
        Comment:Comment
    }
})
return res.status(204).json({success: true,editcomment})


    }
    catch(err){
        res.status(400).json({ message:"comments not edited"})
    }

}
export const GetComments = async(req: Request, res: Response,next: NextFunction) =>{
 
    try{
     

const getcoments= await comment.findMany({})

return res.status(204).json({success: true,getcoments})


    }
    catch(err){
        res.status(400).json({ message:"comments not edited"})
    }

}