import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyConversations, dummyProjects } from "../assets/assets";
import type { Project } from "../types";

const Projects = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const [generating, setGenerating] = useState(true);
  const [device, setDevice] = useState<"phone" | "tablet" | "desktop">(
    "desktop",
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProject = async () => {
    const project = dummyProjects.find((proj) => proj.id === projectId);
    setTimeout(() => {
      if (project) {
        setProject({ ...project, conversation: dummyConversations });
        setLoading(false);
        setGenerating(project.current_code ? false : true);
      }
    }, 2 * 1000);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="size-8 animate-spin text-violet-200" />
      </div>
    );
  }

  return project ? (
    <div className="bg-zinc-900 flex flex-col h-screen w-full text-zinc-100">
      Projects
    </div>
  ) : (
    <div className="h-[80vh] flex items-center justify-center w-full">
      <p className="text-2xl font-medium text-zinc-200">
        Unable to load project!
      </p>
    </div>
  );
};

export default Projects;
