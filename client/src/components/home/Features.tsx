import { Bot, CodeXml, Globe, Layers3, Rocket, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    delay,
  },
});

const features = [
  {
    icon: Sparkles,
    title: "Prompt-first creation",
    description:
      "Describe the site you want in plain English and let Flux shape the structure, style, and content instantly.",
    accent: "var(--color-chart-1)",
  },
  {
    icon: CodeXml,
    title: "Editable production code",
    description:
      "Every generation becomes real code you can inspect, refine, and evolve instead of getting trapped in a closed builder.",
    accent: "var(--color-chart-2)",
  },
  {
    icon: Bot,
    title: "AI-powered revisions",
    description:
      "Ask for changes naturally, iterate on layouts, and generate fresh versions without rebuilding everything from scratch.",
    accent: "var(--color-chart-3)",
  },
  {
    icon: Layers3,
    title: "Versioned workflow",
    description:
      "Track progress across revisions, compare ideas, and roll back with confidence when you want to revisit an earlier direction.",
    accent: "var(--color-chart-4)",
  },
  {
    icon: Globe,
    title: "Ready to publish",
    description:
      "Move from rough concept to shareable web experience fast, with publishing built into the product workflow.",
    accent: "var(--color-chart-5)",
  },
  {
    icon: Rocket,
    title: "Built for momentum",
    description:
      "Flux reduces setup friction so creators can spend more time exploring ideas and less time wiring up boilerplate.",
    accent: "var(--color-accent)",
  },
];

const Features = () => {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-12 text-foreground md:px-6">
      <div className="relative mx-auto max-w-6xl">
        <motion.div {...fadeUp(0.05)} className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Why teams use Flux
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Built to turn a rough idea
            <span className="block text-muted-foreground">
              into a working website fast.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            Flux combines AI generation, code ownership, and revision-friendly
            workflows so building a site feels more like directing a creative
            partner than starting from a blank canvas.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map(({ icon: Icon, title, description, accent }, index) => (
            <motion.article
              key={title}
              {...fadeUp(0.08 + index * 0.05)}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                aria-hidden
                className="absolute inset-x-4 top-0 h-28 rounded-b-xl opacity-90 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(to bottom, color-mix(in oklab, ${accent} 34%, transparent), transparent)`,
                }}
              />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-foreground text-background shadow-sm">
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {description}
                </p>

              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
