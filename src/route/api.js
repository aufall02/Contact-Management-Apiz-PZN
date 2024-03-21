import {Router} from "express";
import userController from "../controllers/user-controller.js";
import contactController from "../controllers/contact-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = Router()
userRouter.use(authMiddleware);

// USER API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);


// CONTACT API
userRouter.post('/api/contacts', contactController.create)






export { userRouter };