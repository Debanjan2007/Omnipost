import express from 'express';
import { globalErrHandler } from './utils/globalError'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// here come other routes
app.use(globalErrHandler) // last middleware

export default app;