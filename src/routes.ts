import { getAllUsers, deleteUser, getUser, updateUser } from './controller/Users.js';
import { register, login} from './controller/Auth.js';
import { Router } from 'express';
import { isAuthenticated, isOwner } from './middlewares/index.js';
 const router = Router();
 router.post("/auth/register",register);
 router.post("/auth/login",login);


 router.get("/users", isAuthenticated, getAllUsers)
 router.get("/users/:id", isAuthenticated, getUser)
 router.delete("/users/:id", isAuthenticated, isOwner, deleteUser)
 router.patch("/users/:id", isAuthenticated, isOwner, updateUser)
 
export default router