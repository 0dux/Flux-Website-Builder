import { motion } from "motion/react";

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

const Demo = () => {
  return (
    <section
      id="demo"
      className="relative overflow-hidden bg-background px-4 py-16 text-foreground md:px-6"
    >
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          {...fadeUp(0.05)}
          className="flex items-center justify-between gap-4 border border-border bg-card px-5 py-4 shadow-sm"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Product preview
            </p>
            <h3 className="mt-1 text-xl font-semibold text-foreground md:text-2xl">
              See Flux in action
            </h3>
          </div>
          <p className="hidden text-sm text-muted-foreground md:block">
            Watch the workflow before you start.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp(0.14)}
          className="relative aspect-video overflow-hidden border-x border-b border-border bg-muted shadow-lg"
        >
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://youtu.be/HOjH3C0DaaQ?si=oKfkB9VFDFauJZKl"
            title="Flux Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;
