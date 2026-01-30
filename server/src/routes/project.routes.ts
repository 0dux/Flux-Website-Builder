import { Router } from "express";
import { deleteProject, getProjectById, getProjectPreview, getPublishedProjects, makeRevisions, rollBackToVersion, saveProjectCode } from "../controllers/project.controllers.js";
import protect from "../middleware/auth.js";

const projectRouter = Router();

projectRouter.post("/revision/:projectId", protect, makeRevisions);
projectRouter.put("/save/:projectId", protect, saveProjectCode);
projectRouter.get("/rollback/:projectId/:versionId", protect, rollBackToVersion);
projectRouter.delete("/:projectId", protect, deleteProject);
projectRouter.get("/preview/:projectId", protect, getProjectPreview);
projectRouter.get("/published", getPublishedProjects);
projectRouter.get("/published/:projectId", getProjectById);

export default projectRouter;