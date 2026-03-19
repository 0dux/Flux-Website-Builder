import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft, Loader, Sparkles, Wand2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const promptIdeas = [
  "A clean SaaS landing page with pricing, testimonials, and a sticky CTA",
  "A bold portfolio site for a product designer with case studies and motion",
  "A modern restaurant website with menu highlights, booking, and gallery",
  "A startup homepage for an AI tool with integrations, FAQ, and waitlist",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    delay,
  },
});

const Prompt = () => {
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
        return toast.error("Please enter a prompt");
      }

      setIsLoading(true);
      const { data } = await api.post("/api/v1/user/project", {
        initial_prompt: input,
      });

      navigate(`/projects/${data.projectId}`);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || error.message);
      console.error(error.message);
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background px-4 py-10 text-foreground md:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in oklab, var(--color-border) 9%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklab, var(--color-border) 9%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "34px 34px",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 blur-3xl"
        style={{
          background:
            "linear-gradient(to right, color-mix(in oklab, var(--color-chart-1) 24%, transparent), color-mix(in oklab, var(--color-chart-3) 24%, transparent), color-mix(in oklab, var(--color-accent) 24%, transparent))",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8">
        <motion.div
          {...fadeUp(0.04)}
          className="flex items-center justify-between gap-4"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-muted"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>

          <div className="hidden items-center gap-2 border border-border bg-card px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground shadow-sm md:inline-flex">
            <span className="h-2 w-2 bg-primary" />
            Prompt workspace
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <motion.div
            {...fadeUp(0.12)}
            className="relative overflow-hidden border border-border bg-card px-6 py-8 shadow-lg md:px-8 md:py-10"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground shadow-sm">
                <Sparkles size={14} className="text-primary" />
                Create with Flux
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Start with an idea.
                <span className="block text-muted-foreground">
                  Leave the first draft to Flux.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                Describe the website you want in plain language. Be specific
                about style, sections, mood, and what the page should help the
                visitor do.
              </p>

              <form
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSubmitHandler(e);
                  }
                }}
                onSubmit={onSubmitHandler}
                className="mt-10 border border-border bg-background p-4 shadow-md"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={7}
                  className="min-h-44 w-full resize-none bg-transparent text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
                  placeholder="Build me a striking landing page for a creative agency with a bold hero, featured work grid, client testimonials, and a contact section."
                  required
                />

                <div className="mt-4 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Prompt. Generate. Iterate.
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
            </div>
          </motion.div>

          <motion.aside
            {...fadeUp(0.2)}
            className="flex flex-col gap-5 border border-border bg-card p-5 shadow-md"
          >
            <div className="border border-border bg-background p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Wand2 size={16} className="text-accent" />
                Prompt ideas
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Use one of these as a starting point or remix them into
                something more specific.
              </p>
            </div>

            <div className="grid gap-3">
              {promptIdeas.map((idea, index) => (
                <motion.button
                  key={idea}
                  type="button"
                  {...fadeUp(0.24 + index * 0.05)}
                  onClick={() => setInput(idea)}
                  className="border border-border bg-background p-4 text-left text-sm leading-6 text-foreground shadow-sm active:shadow-none transition-colors hover:bg-muted"
                >
                  {idea}
                </motion.button>
              ))}
            </div>

            <div className="border border-border bg-muted/60 p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Writing tip
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                Mention the audience, the visual tone, and the exact sections
                you need. Better prompts usually produce better first drafts.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Prompt;
