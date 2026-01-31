import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Session:", session);

    try {
      if (!session?.user) {
        return toast.error("Please sign in to create a project");
      }
      if (!input.trim()) {
        return toast.error("Please enter a message");
      }
      setIsLoading(true);
      const { data } = await api.post("/api/v1/user/project", {
        initial_prompt: input,
      });
      setIsLoading(false);
      console.log("Data Obj:", data);

      navigate(`/projects/${data.projectId}`);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response.data.message || error.message);
      console.error(error.message);
    }
  };

  return (
    <>
      <section className="flex flex-col items-center text-white text-sm pb-20 px-4 font-poppins">
        <div className="flex bg-black/80 items-center gap-2 border border-slate-700 rounded-full p-1 pr-3 text-sm mt-20">
          <span className="bg-indigo-600 text-xs px-3 py-1 rounded-full">
            NEW
          </span>
          <p className="flex items-center gap-2">
            <span>Launch your first site in minutes</span>
            <svg
              className="mt-px"
              width="6"
              height="9"
              viewBox="0 0 6 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m1 1 4 3.5L1 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        </div>

        <h1 className="text-center text-[40px] leading-12 md:text-6xl md:leading-17.5 mt-4 font-semibold max-w-3xl">
          Turn ideas into websites instantly, with AI.
        </h1>

        <p className="text-center text-base max-w-md mt-2">
          Skip the boilerplate. Just describe what you need, and watch your
          website come to life.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="bg-black/80 max-w-2xl w-full rounded-xl p-4 mt-10 border border-indigo-600/70 focus-within:ring-2 ring-indigo-500 transition-all"
        >
          <textarea
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent outline-none text-gray-300 resize-none w-full"
            rows={4}
            placeholder="What are we building today?"
            required
          />
          <button className="ml-auto flex items-center gap-2 bg-linear-to-r from-[#CB52D4] to-indigo-600 rounded-md px-4 py-2">
            {isLoading ? (
              <>
                Creating <Loader className="animate-spin size-4 text-white" />
              </>
            ) : (
              "Build Now"
            )}
          </button>
        </form>
      </section>
    </>
  );
};

export default Home;
