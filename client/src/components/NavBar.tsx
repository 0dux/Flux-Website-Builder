import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";
import { UserButton } from "@daveyplate/better-auth-ui";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { assets } from "../assets/assets";

const HIDE_AFTER_PX = 80; // accumulated downward px before hiding
const SHOW_AFTER_PX = 30; // accumulated upward px before showing

const NavBar = () => {
  const navigate = useNavigate();

  const [credits, setCredits] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const accumulatedDown = useRef(0);
  const accumulatedUp = useRef(0);

  const { data: session, isPending } = authClient.useSession();

  const getCredits = async () => {
    try {
      const { data } = await api.get("/api/v1/user/credits");
      setCredits(data.credits);
    } catch (error: any) {
      toast.error(error?.reponse?.data?.message || error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      getCredits();
    }
  }, [session?.user]);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY.current;

        setScrolled(currentScrollY > 20);

        if (currentScrollY < 10) {
          // Always show at the very top
          setVisible(true);
          accumulatedDown.current = 0;
          accumulatedUp.current = 0;
        } else if (diff > 0) {
          // Scrolling down — accumulate and reset up counter
          accumulatedDown.current += diff;
          accumulatedUp.current = 0;
          if (accumulatedDown.current > HIDE_AFTER_PX) {
            setVisible(false);
          }
        } else if (diff < 0) {
          // Scrolling up — accumulate and reset down counter
          accumulatedUp.current += Math.abs(diff);
          accumulatedDown.current = 0;
          if (accumulatedUp.current > SHOW_AFTER_PX) {
            setVisible(true);
          }
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: visible ? 0 : "-100%",
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={`z-50 fixed top-0 left-0 right-0 flex items-center justify-between w-full py-4 px-4 md:px-16 lg:px-24 xl:px-32 border-b text-foreground transition-all duration-300 ${scrolled ? "backdrop-blur-md border-border/10" : "border-transparent"}`}
      >
        <Link to="/">
          <motion.img
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="h-4 sm:h-8"
            src={assets.logo}
            alt="Flux Logo"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          {[
            { label: "Home", to: "/" },
            { label: "My Projects", to: "/projects" },
            { label: "Community", to: "/community" },
          ].map(({ label, to }) => (
            <motion.div
              key={to}
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link
                to={to}
                className="text-foreground/80 hover:text-foreground transition-colors duration-200"
              >
                {label}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="w-24 h-8 bg-muted rounded-full animate-pulse" />
          ) : !session?.user ? (
            <motion.button
              onClick={() => navigate("/auth/signin")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="px-6 py-1.5 max-sm:text-sm bg-accent hover:bg-accent/90 text-accent-foreground transition-colors rounded"
            >
              Get started
            </motion.button>
          ) : (
            <>
              <button className="border border-dashed border-border/30 bg-muted rounded-2xl px-5 py-1 text-xs sm:text-sm">
                Credits <span className="text-accent">{credits ?? "..."}</span>
              </button>
              <UserButton size="icon" />
            </>
          )}

          {/* Mobile menu toggle */}
          <motion.button
            id="open-menu"
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-100 backdrop-blur-md bg-background/70 text-foreground flex flex-col items-center justify-center text-lg gap-8 md:hidden"
        >
          {[
            { label: "Home", to: "/" },
            { label: "My Projects", to: "/projects" },
            { label: "Community", to: "/community" },
          ].map(({ label, to }, i) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.07,
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
            >
              <Link
                to={to}
                onClick={() => setMenuOpen(false)}
                className="hover:text-muted-foreground transition"
              >
                {label}
              </Link>
            </motion.div>
          ))}

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.25,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="active:ring-3 active:ring-foreground/20 aspect-square size-10 p-1 items-center justify-center bg-background hover:bg-muted text-foreground rounded-md flex transition"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </>
  );
};

export default NavBar;
