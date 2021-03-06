import  {Request,Response ,NextFunction} from 'express'
import { PrismaClient } from '@prisma/client'



const {book} =new   PrismaClient()
export const CreateBook =async(req:Request, res:Response,next:Function) => {
      
  const {bookList} = req.body
    try{

        const  userbooks = await book.createMany({
        data:bookList
        
        })
        res.json(userbooks)
    }
    catch(error) {
   next(error)
    }


}
export const getBooks = async(req: Request, res: Response,next: NextFunction) =>{
    try{
const getbooks= await book.findMany({})
return res.json(getbooks)


    }
    catch(err){
        next(err)
    }

}
export const getBook = async(req: Request, res: Response,next: NextFunction) =>{
    try{
        const {id}=req.params

const getbook= await book.findUnique({
    where: {
        id:Number(id)
    }
})
return res.json(getbook)


    }
    catch(err){
        next(err)
    }

}
export const UpdateBook = async(req: Request, res: Response,next: NextFunction) =>{
    try{
        const {id}=req.params

const updatebook= await book.update({
    where: {
        id:Number(id)
    },
    data:req.body
})
return res.json(updatebook)


    }
    catch(err){
        next(err)
    }

}