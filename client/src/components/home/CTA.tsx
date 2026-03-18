import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Stagger timing helpers
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    delay,
  },
});

const CTA = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

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

      navigate(`/projects/${data.projectId}`);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || error.message);
      console.error(error.message);
    }
  };

  return (
    <section className="relative flex flex-col items-center text-white text-sm pb-20 px-4 overflow-hidden min-h-[90vh] justify-center">
      {/* Animated background glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-225 h-125 rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-teal-600/30 via-cyan-700/10 to-transparent blur-3xl" />
        <div className="absolute -top-24 right-0 w-125 h-100 rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-600/15 via-purple-700/5 to-transparent blur-3xl" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Badge */}
        <motion.div {...fadeUp(0.1)}>
          <div className="flex items-center gap-2 border border-white/15 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs text-white/80 mb-6">
            <span className="inline-block size-2 rounded-full bg-teal-400 animate-pulse" />
            Introducing intelligent website generation
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.22)}
          className="text-center text-[42px] leading-[1.15] md:text-[68px] md:leading-[1.1] font-bold max-w-3xl tracking-tight"
        >
          Turn ideas into websites
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-teal-300 to-indigo-400">
            instantly, with AI.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.34)}
          className="text-center text-base md:text-lg text-white/60 max-w-md mt-5 leading-relaxed"
        >
          Skip the boilerplate. Just describe what you need, and watch your
          website come to life in seconds.
        </motion.p>

        {/* Prompt form */}
        <motion.div {...fadeUp(0.46)} className="w-full max-w-2xl mt-10">
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmitHandler(e);
              }
            }}
            onSubmit={onSubmitHandler}
            className="bg-white/5 backdrop-blur-md w-full rounded-2xl p-4 border border-white/10 focus-within:border-teal-500/60 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all duration-300 shadow-lg shadow-black/30"
          >
            <textarea
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent outline-none text-gray-200 placeholder:text-white/30 resize-none w-full text-sm leading-relaxed"
              rows={4}
              placeholder="What are we building today?"
              required
            />
            <div className="flex justify-end mt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-2 bg-linear-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 transition-all rounded-lg px-5 py-2 text-sm font-medium shadow-md shadow-indigo-900/30"
              >
                {isLoading ? (
                  <>
                    Creating <Loader className="animate-spin size-4 text-white" />
                  </>
                ) : (
                  "Build Now →"
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Demo Video */}
        <motion.div {...fadeUp(0.58)} className="mt-16 w-full max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/90">
            See Flux in Action
          </h2>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/YHdVngPlj1g?rel=0&modestbranding=1"
              title="Flux Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
