import ProjectPreview, {
  type ProjectPreviewRef,
} from "@/components/ProjectPreview";

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

import { useEffect, useRef, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import SideBar from "../components/SideBar";

import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import type { Project } from "../types";

const Projects = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [device, setDevice] = useState<"phone" | "tablet" | "desktop">(
    "desktop",
  );

  const previewRef = useRef<ProjectPreviewRef>(null);

  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/api/v1/user/project/${projectId}`);
      setProject(data.project);
      setIsGenerating(data.project.current_code ? false : true);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error?.reponse?.data?.message || error.message);
      console.error(error.message);
    }
  };

  const saveProject = async () => {
    if (!previewRef.current) return;
    const code = previewRef.current.getCode();
    if (!code) return;
    setIsSaving(true);
    try {
      const { data } = await api.put(`/api/v1/project/save/${projectId}`, {
        code,
      });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.reponse?.data?.message || error.message);
      console.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await api.get(
        `/api/v1/user/publish-toggle/${projectId}`,
      );
      toast.success(data.message);
      setProject((prev) =>
        prev ? { ...prev, isPublished: !prev.isPublished } : null,
      );
    } catch (error: any) {
      toast.error(error?.reponse?.data?.message || error.message);
      console.error(error.message);
    }
  };

  const downloadCode = () => {
    const code = previewRef.current?.getCode() || project?.current_code;
    if (!code) {
      if (isGenerating) {
        return;
      }
      return;
    }

    //download logic
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "index.html";
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  useEffect(() => {
    if (session?.user) {
      fetchProject();
    } else if (!isPending && !session?.user) {
      navigate("/");
      toast.message("Please login to view you projects");
    }
  }, [session?.user]);

  useEffect(() => {
    if (project && !project.current_code) {
      const interval = setInterval(() => {
        fetchProject();
      }, 10 * 1000);
      return () => clearInterval(interval);
    }
  }, [project]);

  if (isLoading) {
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
            src="/favicon.png"
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
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
        </div>
        <div className="p-2 pl-0 flex-1">
          <ProjectPreview
            project={project}
            isGenerating={isGenerating}
            device={device}
            ref={previewRef}
          />
        </div>
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
