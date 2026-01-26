import {
  ArrowBigDown,
  Eye,
  EyeClosed,
  Fullscreen,
  Loader2,
  MessageSquare,
  Monitor,
  Save,
  Smartphone,
  Tablet,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dummyConversations, dummyProjects } from "../assets/assets";
import SideBar from "../components/SideBar";
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

  const saveProject = async () => {};
  const togglePublish = async () => {};
  const downloadCode = async () => {};

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
      {/* Builder Navbar */}
      <div className="flex max-sm:flex-col sm:items-center gap-4 px-4 py-2 no-scrollbar">
        {/* Left */}
        <div className="flex items-center gap-2 sm:min-w-90 text-nowrap">
          <img
            src="/favicon.svg"
            alt="Flux logo"
            onClick={() => navigate("/")}
            className="h-6 cursor-pointer"
          />
          <div className="max-w-64 sm:max-w-xs">
            <p className="text-zinc-100 text-lg font-medium capitalize truncate">
              {project.name}
            </p>
            <p className="text-zinc-400 text-sm -mt-0.5">
              Previewing last saved version
            </p>
          </div>
          <div className="sm:hidden flex flex-1 justify-end">
            {isMenuOpen ? (
              <MessageSquare
                onClick={() => setIsMenuOpen(false)}
                className="size-6 cursor-pointer"
              />
            ) : (
              <XIcon
                onClick={() => setIsMenuOpen(true)}
                className="size-6 cursor-pointer"
              />
            )}
          </div>
        </div>
        {/* Center */}
        <div className="hidden sm:flex gap-2 bg-zinc-950 p-1 rounded-md">
          <Smartphone
            onClick={() => setDevice("phone")}
            className={`size-6 cursor-pointer p-1 rounded ${device === "phone" ? "bg-zinc-700" : ""}`}
          />
          <Tablet
            onClick={() => setDevice("tablet")}
            className={`size-6 cursor-pointer p-1 rounded ${device === "tablet" ? "bg-zinc-700" : ""}`}
          />
          <Monitor
            onClick={() => setDevice("desktop")}
            className={`size-6 cursor-pointer p-1 rounded ${device === "desktop" ? "bg-zinc-700" : ""}`}
          />
        </div>
        {/* Right */}
        <div className="flex items-center justify-end gap-3 flex-1 text-xs sm:text-sm">
          <button
            onClick={() => saveProject()}
            disabled={isSaving}
            className="max-sm:hidden bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors border border-zinc-700"
          >
            {isSaving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <Save size={16} />
                Save
              </>
            )}
          </button>
          <Link
            className="px-4 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors border border-zinc-700 hover:border-zinc-500"
            to={`/preview/${projectId}`}
            target="_blank"
          >
            <Fullscreen size={16} />
            Preview
          </Link>
          <button
            onClick={() => downloadCode()}
            className="bg-linear-to-br from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-500 flex px-4 py-1 rounded items-center gap-2 sm:rounded-sm transition-colors"
          >
            <ArrowBigDown size={16} />
            Download
          </button>
          <button
            onClick={() => togglePublish()}
            className="bg-linear-to-br from-purple-500 to-purple-700 hover:from-purple-700 hover:to-purple-500 flex px-4 py-1 rounded items-center gap-2 sm:rounded-sm transition-colors"
          >
            {project.isPublished ? <EyeClosed size={16} /> : <Eye size={16} />}
            {project.isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>
      <div className="flex flex-1 overflow-auto">
        <div>
          <SideBar
            isMenuOpen={isMenuOpen}
            project={project}
            setProject={(p) => setProject(p)}
            isGenerating={generating}
            setIsGenerating={setGenerating}
          />
        </div>
        <div className="p-2 pl-0 flex-1">Project Preview</div>
      </div>
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
