import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
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
    <section className="relative overflow-hidden bg-background px-4 py-16 text-foreground md:px-6">
      <div className="relative mx-auto max-w-5xl border border-border bg-card px-6 py-10 shadow-lg md:px-10 md:py-14">
        <div className="relative z-10 flex flex-col items-center text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-80 blur-3xl"
            style={{
              background:
                "linear-gradient(to right, color-mix(in oklab, var(--color-chart-1) 30%, transparent), color-mix(in oklab, var(--color-chart-3) 30%, transparent), color-mix(in oklab, var(--color-accent) 30%, transparent))",
            }}
          />
          <motion.div {...fadeUp(0.05)}>
            <div className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground shadow-sm">
              <span className="inline-block size-2 bg-primary" />
              Start building with Flux
            </div>
          </motion.div>

          <motion.h2
            {...fadeUp(0.16)}
            className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
          >
            Describe the site once.
            <span className="block text-muted-foreground">
              Let Flux handle the first draft.
            </span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.27)}
            className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base"
          >
            Give the product a prompt, generate a working starting point, and
            keep iterating until the site feels right.
          </motion.p>

          <motion.div {...fadeUp(0.38)} className="mt-10 w-full max-w-3xl">
            <form
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmitHandler(e);
                }
              }}
              onSubmit={onSubmitHandler}
              className="border border-border bg-background p-4 shadow-md"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-32 w-full resize-none bg-transparent text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
                rows={4}
                placeholder="Build me a bold portfolio site for a product designer with a case studies section and a contact form."
                required
              />

              <div className="mt-4 flex flex-col items-start justify-between gap-4 border-t border-border pt-4 sm:flex-row sm:items-center">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Prompt. Generate. Refine.
                </p>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex items-center gap-2 border border-border bg-accent px-5 py-2 text-sm font-medium text-accent-foreground shadow-sm active:shadow-none transition-colors duration-200 hover:bg-accent/90"
                >
                  {isLoading ? (
                    <>
                      Creating
                      <Loader className="size-4 animate-spin" />
                    </>
                  ) : (
                    "Build now"
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
