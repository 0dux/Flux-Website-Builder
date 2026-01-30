import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";
import { UserButton } from "@daveyplate/better-auth-ui";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { assets } from "../assets/assets";
import GradientBlinds from "./GradientBlinds";

const NavBar = () => {
  const [credits, setCredits] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { data: session } = authClient.useSession();
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
  return (
    <>
      <nav className="z-50 flex items-center justify-between w-full py-4 px-4 md:px-16 lg:px-24 xl:px-32 backdrop-blur-xl bg-black/40 border-b text-white border-slate-800">
        <Link to="/">
          <img className="h-4 sm:h-6" src={assets.logo} alt="Flux Logo" />
        </Link>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <Link to={"/"} className="hover:text-slate-300 transition">
            Home
          </Link>
          <Link to={"/projects"} className="hover:text-slate-300 transition">
            My Projects
          </Link>
          <Link to={"/community"} className="hover:text-slate-300 transition">
            Community
          </Link>
          <Link to={"/pricing"} className="hover:text-slate-300 transition">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {!session?.user ? (
            <button
              onClick={() => navigate("/auth/signin")}
              className="px-6 py-1.5 max-sm:text-sm bg-indigo-600 active:scale-95 hover:bg-indigo-700 transition rounded"
            >
              Get started
            </button>
          ) : (
            <>
              <button className="border border-dashed border-zinc-200 bg-white/10 rounded-2xl px-5 py-1 text-xs sm:text-sm">
                Credits : <span className="text-indigo-300">{credits}</span>
              </button>
              <UserButton size="icon" />
            </>
          )}
          <button
            id="open-menu"
            className="md:hidden active:scale-90 transition"
            onClick={() => setMenuOpen(true)}
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
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-100 bg-black/60 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300">
          <Link to={"/"} className="hover:text-slate-300 transition">
            Home
          </Link>
          <Link to={"/projects"} className="hover:text-slate-300 transition">
            My Projects
          </Link>
          <Link to={"/community"} className="hover:text-slate-300 transition">
            Community
          </Link>
          <Link to={"/pricing"} className="hover:text-slate-300 transition">
            Pricing
          </Link>
          <button
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
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
          </button>
        </div>
      )}
      {/* Fixed background gradient that tracks cursor */}
      <div className="fixed inset-0 -z-10">
        <GradientBlinds
          gradientColors={["#5905ad", "#0154c1"]}
          angle={150}
          noise={0}
          blindCount={20}
          blindMinWidth={70}
          spotlightRadius={0.75}
          spotlightSoftness={0.75}
          spotlightOpacity={1}
          mouseDampening={0.2}
          distortAmount={10}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>
    </>
  );
};

export default NavBar;
