import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { useHealthCheck } from "./hooks/useHealthCheck";
import AuthPage from "./pages/auth/AuthPage";
import Community from "./pages/Community";
import Home from "./pages/Home";
import MyProjects from "./pages/MyProjects";
import Preview from "./pages/Preview";
import Projects from "./pages/Projects";
import SettingsPage from "./pages/SettingsPage";
import View from "./pages/View";

const App = () => {
  const { pathname } = useLocation();
  useHealthCheck();
  const hideNavBar =
    (pathname.startsWith("/projects/") && pathname !== "/projects") ||
    pathname.startsWith("/view/") ||
    pathname.startsWith("/preview/");
  return (
    <div className="min-h-screen w-full relative">
      <Toaster />
      {!hideNavBar && (
        <>
          <NavBar />
        </>
      )}
      <main className="flex-1 pt-16">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/projects/:projectId"} element={<Projects />} />
          <Route path={"/projects"} element={<MyProjects />} />
          <Route path={"/preview/:projectId"} element={<Preview />} />
          <Route
            path={"/preview/:projectId/:versionId"}
            element={<Preview />}
          />
          <Route path={"/community"} element={<Community />} />
          <Route path={"/view/:projectId"} element={<View />} />
          <Route path="/auth/:pathname" element={<AuthPage />} />
          <Route path="/account/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
