import { authClient } from "@/lib/auth-client";
import { Layers, Play } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    delay,
  },
});

const Hero = () => {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (session?.user) {
      navigate("/projects");
    } else {
      navigate("/auth/signin");
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-foreground px-4 overflow-hidden min-h-[92vh]">
      {/* White Sphere Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "white",
          backgroundImage: `
       linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
       linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
       radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)
     `,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%",
        }}
      />
      {/* Background: teal glow from bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      ></motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full">
        {/* Badge */}
        <motion.div {...fadeUp(0.05)}>
          <div className="inline-flex items-center gap-2 bg-card border border-border/10 rounded-full px-4 py-2 text-xs text-muted-foreground mb-8 shadow-sm">
            <Layers size={13} className="text-muted-foreground/70" />
            Introducing intelligent code generation
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.17)}
          className="text-[44px] leading-[1.1] md:text-[72px] md:leading-[1.08] tracking-tight text-foreground mb-6"
        >
          Turn ideas into websites
          <br />
          instantly, with AI.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.29)}
          className="text-[15px] md:text-base text-muted-foreground max-w-120 leading-[1.7] mb-10"
        >
          Your AI website builder describes, designs, and deploys sites
          instantly. Go from prompt to live site in minutes, not hours.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.41)}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.button
            onClick={handleCTA}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm px-8 py-3 rounded-full shadow-lg transition-colors duration-200 w-full sm:w-auto"
          >
            Start for free
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-2 bg-card/40 backdrop-blur-md border border-border/10 hover:border-border/20 text-foreground font-semibold text-sm px-8 py-3 rounded-full shadow-lg transition-all duration-200 w-full sm:w-auto"
          >
            <Play
              size={14}
              className="fill-foreground/10 group-hover:fill-accent group-hover:text-accent transition-colors duration-200"
            />
            Watch a demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
