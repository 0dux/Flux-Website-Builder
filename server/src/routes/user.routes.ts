import { Router } from 'express';
import { createNewProject, getUserAllProjects, getUserCredits, getUserProject, purchaseCredits, togglePublish } from '../controllers/user.controllers.js';
import protect from '../middleware/auth.js';

const userRouter = Router();

userRouter.get("/credits", protect, getUserCredits);
userRouter.post("/project", protect, createNewProject);
userRouter.get("/project/:projectId", protect, getUserProject);
userRouter.get("/get-all-projects", protect, getUserAllProjects);
userRouter.get("/publish-toggle/:projectId", protect, togglePublish);
userRouter.post("/purchase-credits", protect, purchaseCredits);
// userRouter.post("/project-test", protect, test);


export default userRouter;