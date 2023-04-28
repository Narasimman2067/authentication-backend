
import  express  from 'express';
import { Register, getAllUsers, logOut, loginUser, setAvatar } from '../Controllers/userControl.js';




export const userRouter=express.Router()



userRouter.post("/register",Register)
userRouter.post("/login",loginUser)
userRouter.post("/setavatar/:id",setAvatar)
userRouter.get("/allusers/:id",getAllUsers)
userRouter.post("/logout/:id", logOut);

export default userRouter;


