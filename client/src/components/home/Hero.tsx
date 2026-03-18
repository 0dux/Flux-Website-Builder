import { authClient } from "@/lib/auth-client";
import { Layers, Play } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { AuroraText } from "../ui/aurora-text";
import { LineShadowText } from "../ui/line-shadow-text";

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

  const handleWatchDemo = () => {
    document
      .getElementById("demo")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative flex flex-col items-center justify-center bg-background text-foreground px-4 overflow-hidden min-h-[88vh]">
      {/* Soft Yellow Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at center, #FFF991 0%, transparent 50%)
      `,
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />
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
          From one{" "}
          <LineShadowText className="font-semibold italic">
            prompt
          </LineShadowText>{" "}
          to
          <br />a <AuroraText className="font-semibold ">
            website
          </AuroraText>{" "}
          people remember.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.29)}
          className="text-[15px] md:text-base text-muted-foreground max-w-120 leading-[1.7] mb-10"
        >
          Flux turns rough ideas into polished website drafts fast, so you can
          spend less time wiring things up and more time shaping something worth
          shipping.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.41)}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.button
            onClick={handleCTA}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm px-8 py-3 rounded-full shadow-lg active:shadow-none transition-colors duration-200 w-full sm:w-auto"
          >
            {session?.user ? "Build now" : "Start for free"}
          </motion.button>

          <motion.button
            onClick={handleWatchDemo}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{
              type: "spring",
              duration: 0.3,
            }}
            className="group flex items-center gap-2 bg-card/40 backdrop-blur-md border border-border/10 hover:border-border/20 text-foreground font-semibold text-sm px-8 py-3 rounded-full shadow-lg active:shadow-none transition-all duration-200 w-full sm:w-auto"
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
