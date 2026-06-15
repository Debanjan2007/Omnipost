import express from 'express';
import { globalErrHandler } from './utils/globalError'
import cookieParser from 'cookie-parser';
import router from './routes/basic.routes';
import userRouter from './routes/user.router';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/v1/auth', router)
// this router is for authorised user routes
app.use('/api/v1/user' , userRouter)
// here come other routes
app.use(globalErrHandler) // last middleware

export default app;