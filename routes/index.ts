import express from 'express';
import { Signup,SignIn } from '../controller/user/user';

import {CreateBook,getBooks,getBook,UpdateBook} from '../controller/Book/book'
const router = express.Router();
//user
router.post('/api/users', Signup)
router.post('/api/auth',SignIn)
//books
router.post('/api/book',CreateBook)
router.post('/api/book',getBooks)
router.get('/api/book/:id',getBook)
router.patch('/api/book/:id',UpdateBook)
//profie



//comment




export default router;