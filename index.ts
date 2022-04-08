import * as dotenv from 'dotenv';
 import express, {  Application } from 'express'
 import cors from 'cors'
 import routes from './routes'

 const app:Application = express();
 app.use(express.json());
 dotenv.config();

 app.use(cors());

 app.use('/',routes)
 

const PORT = process.env.PORT;
 app.listen(PORT, ()=> console.log(`Server started at ${PORT}`));