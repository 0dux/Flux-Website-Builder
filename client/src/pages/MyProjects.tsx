import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";
import { Loader2, PlusIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Project } from "../types";

const MyProjects = () => {
  const { data: session, isPending } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const deleteProject = async (projectId: string) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this project",
      );
      if (!confirm) return;
      const { data } = await api.delete(`/api/v1/project/${projectId}`);
      toast.success(data.message);
      fetchProjects();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/api/v1/user/get-all-projects");
      setProjects(data.projects);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    if (session?.user && !isPending) {
      fetchProjects();
    }
    if (!session?.user && !isPending) {
      navigate("/");
      toast.message("Please login to view your projects");
    }
  }, [session?.user]);

  // console.log(project);
  return (
    <>
      <div className="bg-background px-4 md:px-16 lg:px-24 xl:px-32 relative min-h-[92vh]">
        {/* Zigzag Lightning - Light Pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(75, 85, 99, 0.08) 20px, rgba(75, 85, 99, 0.08) 21px),
        repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(107, 114, 128, 0.06) 30px, rgba(107, 114, 128, 0.06) 31px),
        repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(55, 65, 81, 0.05) 40px, rgba(55, 65, 81, 0.05) 41px),
        repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(31, 41, 55, 0.04) 35px, rgba(31, 41, 55, 0.04) 36px)
      `,
          }}
        />
        {isLoading ? (
          //When its loading
          <div className="flex h-[80vh] items-center justify-center">
            <Loader2 className="size-8 animate-spin text-accent" />
          </div>
        ) : projects.length > 0 ? (
          //When project length > 0 and loading === false
          <div className="min-h-[80vh] py-10">
            {/* top bar */}
            <div className="flex items-center justify-between mb-12 relative">
              <h1 className="text-2xl font-medium text-foreground">
                My Projects
              </h1>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="flex items-center gap-2 border border-border bg-accent px-3 py-2 text-sm font-medium text-accent-foreground shadow-sm active:shadow-none transition-colors hover:bg-accent/90 sm:px-6"
              >
                <PlusIcon size={18} /> Create New
              </button>
            </div>
            {/* Mapping projects */}
            <div className="flex flex-wrap gap-4">
              {projects.map((project) => (
                <div
                  onClick={() => navigate(`/projects/${project.id}`)}
                  key={project.id}
                  className="group relative w-72 cursor-pointer overflow-hidden border border-border bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg max-sm:mx-auto"
                >
                  <div className="relative h-40 w-full overflow-hidden border-b border-border bg-muted">
                    {project.current_code ? (
                      <iframe
                        srcDoc={project.current_code}
                        className="absolute top-0 left-0 w-300 h-200 origin-top-left pointer-events-none"
                        sandbox="allow-scripts allow-same-origin"
                        style={{ transform: "scale(0.25)" }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        No Preview
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-4 text-foreground">
                    <div className="flex items-start justify-between">
                      <h1 className="text-lg font-medium line-clamp-2">
                        {project.name}
                      </h1>
                      <button className="ml-2 mt-1 border border-border bg-background px-2 py-1 text-xs text-muted-foreground shadow-sm active:shadow-none">
                        Website
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.initial_prompt}
                    </p>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-between mt-6"
                    >
                      <span className="text-xs text-muted-foreground">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex gap-3 text-sm text-foreground">
                        <button
                          onClick={() => navigate(`/preview/${project.id}`)}
                          className="border border-border bg-secondary px-2 py-1 text-secondary-foreground shadow-sm active:shadow-none transition-colors hover:bg-secondary/90"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => navigate(`/projects/${project.id}`)}
                          className="border border-border bg-accent px-2 py-1 text-accent-foreground shadow-sm active:shadow-none transition-colors hover:bg-accent/90"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Trash
                      onClick={() => {
                        deleteProject(project.id);
                      }}
                      className="absolute right-3 top-3 size-8 scale-0 cursor-pointer border border-border bg-destructive p-1.5 text-destructive-foreground shadow-sm transition-all group-hover:scale-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          //When project length === 0
          <div className="flex flex-col items-center justify-center gap-8 h-[80vh]">
            <h1 className="text-3xl font-semibold text-muted-foreground">
              You have no projects yet!
            </h1>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="flex items-center gap-2 border border-border bg-accent px-3 py-2 text-sm font-medium text-accent-foreground shadow-sm active:shadow-none transition-colors hover:bg-accent/90 sm:px-6"
            >
              <PlusIcon size={18} /> Create New
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyProjects;
