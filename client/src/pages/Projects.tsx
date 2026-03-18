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
      <div className="flex h-[80vh] items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-accent" />
      </div>
    );
  }

  return project ? (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      {/* Builder Navbar */}
      <div className="flex gap-4 border-b border-border bg-card px-4 py-3 max-sm:flex-col sm:items-center sm:justify-between no-scrollbar">
        {/* Left */}
        <div className="flex items-center gap-3 text-nowrap sm:min-w-0 sm:flex-1">
          <img
            src="/favicon.png"
            alt="Flux logo"
            onClick={() => navigate("/")}
            className="h-6 cursor-pointer"
          />
          <div className="max-w-64 sm:max-w-xs">
            <p className="truncate text-lg font-medium capitalize text-foreground">
              {project.name}
            </p>
            <p className="-mt-0.5 text-sm text-muted-foreground">
              Previewing last saved version
            </p>
          </div>
          <div className="flex flex-1 justify-end sm:hidden">
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
        <div className="hidden shrink-0 gap-2 border border-border bg-background p-1 shadow-sm sm:flex">
          <Smartphone
            onClick={() => setDevice("phone")}
            className={`size-7 cursor-pointer border p-1 transition-colors active:shadow-none ${device === "phone" ? "border-border bg-muted shadow-sm" : "border-transparent bg-transparent"}`}
          />
          <Tablet
            onClick={() => setDevice("tablet")}
            className={`size-7 cursor-pointer border p-1 transition-colors active:shadow-none ${device === "tablet" ? "border-border bg-muted shadow-sm" : "border-transparent bg-transparent"}`}
          />
          <Monitor
            onClick={() => setDevice("desktop")}
            className={`size-7 cursor-pointer border p-1 transition-colors active:shadow-none ${device === "desktop" ? "border-border bg-muted shadow-sm" : "border-transparent bg-transparent"}`}
          />
        </div>
        {/* Right */}
        <div className="flex flex-1 flex-wrap items-center justify-end gap-3 text-xs sm:text-sm">
          <button
            onClick={() => saveProject()}
            disabled={isSaving}
            className="max-sm:hidden flex items-center gap-2 border border-border bg-card px-4 py-1 text-foreground shadow-sm active:shadow-none transition-colors hover:bg-muted disabled:opacity-60"
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
            className="flex items-center gap-2 border border-border bg-card px-4 py-1 text-foreground shadow-sm active:shadow-none transition-colors hover:bg-muted"
            to={`/preview/${projectId}`}
            target="_blank"
          >
            <Fullscreen size={16} />
            Preview
          </Link>
          <button
            onClick={() => downloadCode()}
            className="flex items-center gap-2 border border-border bg-secondary px-4 py-1 text-secondary-foreground shadow-sm active:shadow-none transition-colors hover:bg-secondary/90"
          >
            <ArrowBigDown size={16} />
            Download
          </button>
          <button
            onClick={() => togglePublish()}
            className="flex items-center gap-2 border border-border bg-accent px-4 py-1 text-accent-foreground shadow-sm active:shadow-none transition-colors hover:bg-accent/90"
          >
            {project.isPublished ? <EyeClosed size={16} /> : <Eye size={16} />}
            {project.isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>
      <div className="flex flex-1 overflow-auto bg-muted/40 p-3">
        <div>
          <SideBar
            isMenuOpen={isMenuOpen}
            project={project}
            setProject={(p) => setProject(p)}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
        </div>
        <div className="flex-1 pl-0 sm:pl-3">
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
    <div className="flex h-[80vh] w-full items-center justify-center bg-background">
      <p className="text-2xl font-medium text-muted-foreground">
        Unable to load project!
      </p>
    </div>
  );
};

export default Projects;
