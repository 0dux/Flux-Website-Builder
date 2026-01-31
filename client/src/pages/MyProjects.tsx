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
      <div className="px-4 md:px-16 lg:px-24 xl:px-32">
        {isLoading ? (
          //When its loading
          <div className="flex items-center justify-center h-[80vh]">
            <Loader2 className="animate-spin size-8 text-indigo-200" />
          </div>
        ) : projects.length > 0 ? (
          //When project length > 0 and loading === false
          <div className="min-h-[80vh] py-10">
            {/* top bar */}
            <div className="flex items-center justify-between mb-12">
              <h1 className="text-2xl text-zinc-100 font-medium">
                My Projects
              </h1>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="flex items-center gap-2 text-xl font-medium text-zinc-100 px-2 sm:px-6 py-1 sm:py-2 bg-linear-to-br from-indigo-500 to-indigo-700 rounded hover:opacity-90 transition-all active:scale-95"
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
                  className="relative group w-72 max-sm:mx-auto cursor-pointer bg-black border border-zinc-700 rounded-lg overflow-hidden shadow-md group-hover:shadow-indigo-700/30 hover:border-indigo-800/80 transition-all duration-300"
                >
                  <div className="relative bg-zinc-900 w-full h-40 overflow-hidden border-b border-zinc-800">
                    {project.current_code ? (
                      <iframe
                        srcDoc={project.current_code}
                        className="absolute top-0 left-0 w-300 h-200 origin-top-left pointer-events-none"
                        sandbox="allow-scripts allow-same-origin"
                        style={{ transform: "scale(0.25)" }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-zinc-500">
                        No Preview
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-4 text-zinc-100 bg-linear-180 from-transparent group-hover:from-indigo-950 to-transparent transition-colors">
                    <div className="flex items-start justify-between">
                      <h1 className="text-lg font-medium line-clamp-2">
                        {project.name}
                      </h1>
                      <button className="px-2 py-1 mt-1 ml-2 text-xs bg-zinc-800 border border-zinc-700 rounded-full">
                        Website
                      </button>
                    </div>
                    <p className="text-zinc-400 text-sm line-clamp-2">
                      {project.initial_prompt}
                    </p>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-between mt-6"
                    >
                      <span className="text-xs text-zinc-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <div className="text-zinc-100 text-sm flex gap-3">
                        <button
                          onClick={() => navigate(`/preview/${project.id}`)}
                          className="px-2 py-1 bg-white/10 hover:bg-white/15 rounded-md transition-all"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => navigate(`/projects/${project.id}`)}
                          className="px-2 py-1 bg-white/10 hover:bg-white/15 rounded-md transition-all"
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
                      className="absolute top-3 right-3 scale-0 group-hover:scale-100 bg-white p-1.5 size-8 rounded text-red-500 text-xl cursor-pointer transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          //When project length === 0
          <div className="flex flex-col items-center justify-center gap-8 h-[80vh]">
            <h1 className="text-3xl text-zinc-300 font-semibold">
              You have no projects yet!
            </h1>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="flex items-center gap-2 text-xl font-medium text-zinc-100 px-2 sm:px-6 py-1 sm:py-2 bg-linear-to-br from-indigo-500 to-indigo-700 rounded hover:opacity-90 transition-all active:scale-95"
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
