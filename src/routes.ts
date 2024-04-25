import { register } from './controller/Auth.js';
import { Router } from 'express';
 const router = Router();
 router.post("/auth/register",register)
 
export default router