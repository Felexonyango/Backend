import express from 'express';
import { Signup,SignIn } from '../controller/user/user';
import {userAddress} from '../controller/Address/address'
import {CreateBook,getBooks,getBook} from '../controller/Book/book'
const router = express.Router();

router.post('/api/users', Signup)
router.post('/api/auth',SignIn)
router.post('/api/address',userAddress)
router.post('/api/book',CreateBook)
router.post('/api/book',getBooks)
router.get('/api/book/:id',getBook)







export default router;