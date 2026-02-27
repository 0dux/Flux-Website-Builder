import api from "@/configs/axios";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const HEALTH_TIMEOUT_MS = 5000;
const RETRY_INTERVAL_MS = 5000;

export function useHealthCheck() {
  const toastId = useRef<string | number | null>(null);
  const retryTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Skip in development — backend is always local

    const checkHealth = async () => {
      try {
        await api.get("/api/health", { timeout: HEALTH_TIMEOUT_MS });

        // Backend is alive — dismiss toast if it was shown
        if (toastId.current !== null) {
          toast.dismiss(toastId.current);
          toastId.current = null;
          toast.success("Backend is live! You're all set 🚀");
        }

        // Stop retrying
        if (retryTimer.current) {
          clearInterval(retryTimer.current);
          retryTimer.current = null;
        }
      } catch {
        // Backend unreachable — show persistent toast (only once)
        if (toastId.current === null) {
          toastId.current = toast.loading(
            "🎬 Backend is warming up — watch the demo video while it starts (~1 min)",
            { duration: Infinity },
          );
        }

        // Start retrying if not already
        if (!retryTimer.current) {
          retryTimer.current = setInterval(checkHealth, RETRY_INTERVAL_MS);
        }
      }
    };

    checkHealth();

    return () => {
      if (retryTimer.current) {
        clearInterval(retryTimer.current);
        retryTimer.current = null;
      }
      if (toastId.current !== null) {
        toast.dismiss(toastId.current);
        toastId.current = null;
      }
    };
  }, []);
}
