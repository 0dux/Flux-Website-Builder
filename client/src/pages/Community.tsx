import { Loader2, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dummyProjects } from "../assets/assets";
import type { Project } from "../types";

const Community = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const fetchAllProjects = async () => {
    //simulate fetching logic
    setTimeout(() => {
      setIsLoading(false);
      setProjects(dummyProjects);
    }, 5 * 1000);
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

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
              <h1 className="text-2xl text-zinc-100 font-medium">Published</h1>
            </div>
            {/* Mapping projects */}
            <div className="flex flex-wrap gap-4">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/view/${project.id}`}
                  target="_blank"
                  className="w-72 max-sm:mx-auto cursor-pointer bg-zinc-900/60 border-zinc-700 rounded-lg overflow-hidden hover:border-indigo-800/80 border-2 transition-all duration-300"
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
                    <div className="flex items-center justify-between mt-6">
                      <span className="text-xs text-zinc-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <div className="text-zinc-100 text-sm flex gap-3">
                        <button className="px-2 py-1 bg-white/10 hover:bg-white/15 rounded-md transition-colors flex items-center gap-2">
                          <span className="bg-zinc-300 size-4 rounded-full text-black font-semibold flex items-center justify-center">
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

export default Community;
