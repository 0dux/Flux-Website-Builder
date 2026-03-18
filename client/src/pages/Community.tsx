import api from "@/configs/axios";
import { Loader2, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Project } from "../types";

const Community = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const fetchAllProjects = async () => {
    try {
      const { data } = await api.get("/api/v1/project/published");
      setProjects(data.projects);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  // console.log(project);
  return (
    <>
      <div className="bg-background px-4 md:px-16 lg:px-24 xl:px-32 min-h-[92vh] relative">
        {/* Crosshatch Art - Light Pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
        repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
      `,
          }}
        />
        {/* Your Content/Components */}
        {isLoading ? (
          //When its loading
          <div className="flex h-[80vh] items-center justify-center">
            <Loader2 className="size-8 animate-spin text-accent" />
          </div>
        ) : projects.length > 0 ? (
          //When project length > 0 and loading === false
          <div className="min-h-[80vh] py-10">
            {/* top bar */}
            <div className="flex items-center justify-between mb-12">
              <h1 className="text-2xl font-medium text-foreground">
                Published
              </h1>
            </div>
            {/* Mapping projects */}
            <div className="flex flex-wrap gap-4">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/view/${project.id}`}
                  target="_blank"
                  className="group w-72 cursor-pointer overflow-hidden border border-border bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg max-sm:mx-auto"
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
                      <button className="ml-2 mt-1 border border-border bg-secondary px-2 py-1 text-xs text-secondary-foreground shadow-sm active:shadow-none">
                        Website
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.initial_prompt}
                    </p>
                    <div className="flex items-center justify-between mt-6">
                      <span className="text-xs text-muted-foreground">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex gap-3 text-sm text-foreground">
                        <button className="flex items-center gap-2 border border-border bg-background px-2 py-1 shadow-sm active:shadow-none transition-colors hover:bg-muted">
                          <span className="flex size-4 items-center justify-center bg-foreground text-background text-[10px] font-semibold">
                            {project.user?.name?.slice(0, 1)}
                          </span>
                          <span>{project.user?.name}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          //When project length === 0
          <div className="flex flex-col items-center justify-center gap-8 h-[80vh]">
            <h1 className="text-3xl font-semibold text-muted-foreground">
              No published projects yet.
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

export default Community;
