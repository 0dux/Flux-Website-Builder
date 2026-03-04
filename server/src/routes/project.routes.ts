import { Router } from "express";
import { deleteProject, getProjectById, getProjectPreview, getPublishedProjects, makeRevisions, rollBackToVersion, saveProjectCode } from "../controllers/project.controllers.js";
import protect from "../middleware/auth.js";

const projectRouter = Router();

projectRouter.get("/published", getPublishedProjects);
projectRouter.get("/published/:projectId", getProjectById);
projectRouter.post("/revision/:projectId", protect, makeRevisions);
projectRouter.put("/save/:projectId", protect, saveProjectCode);
projectRouter.put("/rollback/:projectId/:versionId", protect, rollBackToVersion);
projectRouter.delete("/:projectId", protect, deleteProject);
projectRouter.get("/preview/:projectId", protect, getProjectPreview);

export default projectRouter;