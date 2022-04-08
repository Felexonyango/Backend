import express from 'express';
import { Signup,SignIn } from '../controller/user/user';
import {CreateBook,getBooks,getBook,UpdateBook} from '../controller/Book/book'
import {CreateProfile,UpdateProfile,DeleteProfile} from '../controller/Profile/Profile'
import {createComment,DeleteComment,EditComment} from '../controller/comment/comment'
const router = express.Router();
//user
router.post('/api/users', Signup)
router.post('/api/auth',SignIn)
//books
router.post('/api/book',CreateBook)
router.get('/api/book',getBooks)
router.get('/api/book/:id',getBook)
router.patch('/api/book/:id',UpdateBook)
//profie
router.post('/api/profile',CreateProfile)
router.put('/api/profile/:id',UpdateProfile)
router.delete('/api/profile/:id',DeleteProfile)


//comment
router.post('/api/comment',createComment)
router.put('/api/comment/:id',EditComment)
router.delete('/api/comment/:id',DeleteComment)




export default router;