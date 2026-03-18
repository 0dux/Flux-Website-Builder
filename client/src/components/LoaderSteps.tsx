import {
  CircleIcon,
  ScanLineIcon,
  SquareIcon,
  TriangleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  { icon: ScanLineIcon, label: "Analyzing your request..." },
  { icon: SquareIcon, label: "Generating layout structure..." },
  { icon: TriangleIcon, label: "Assembling UI components..." },
  { icon: CircleIcon, label: "Finalizing your website..." },
];

const STEP_DURATION = 45000;

const LoaderSteps = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((s) => (s + 1) % steps.length);
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, []);

  const Icon = steps[current].icon;
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      <div
        className="absolute inset-0 animate-pulse blur-3xl"
        style={{
          background:
            "linear-gradient(to bottom right, color-mix(in oklab, var(--color-chart-1) 14%, transparent), color-mix(in oklab, var(--color-chart-3) 14%, transparent), color-mix(in oklab, var(--color-chart-5) 14%, transparent))",
        }}
      />

      <div className="relative z-10 flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full border border-accent opacity-30" />
        <div className="absolute inset-4 rounded-full border border-border" />
        <Icon className="h-8 w-8 animate-bounce text-foreground opacity-80" />
      </div>
      {/* Step label - Fade using transition only (no invisible start) */}
      <p
        key={current}
        className="mt-8 text-lg font-light tracking-wide text-foreground transition-all duration-700 ease-in-out opacity-100"
      >
        {steps[current].label}
      </p>

      <p className="mt-2 text-xs text-muted-foreground transition-opacity duration-700 opacity-100">
        This may take around 2-3 minutes...
      </p>
    </div>
  );
};

export default LoaderSteps;
