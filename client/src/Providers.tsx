import { authClient } from "@/lib/auth-client";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { NavLink, useNavigate } from "react-router-dom";

export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const isDev = import.meta.env.DEV;
  
  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={navigate}
      Link={(props) => <NavLink {...props} to={props.href} />}
      social={{
        providers: ["google"],
      }}
      baseURL={
        isDev
          ? import.meta.env.VITE_REDIRECT_URL || "http://localhost:5173"
          : window.location.origin
      }
    >
      {children}
    </AuthUIProvider>
  );
}
