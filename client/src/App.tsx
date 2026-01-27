import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Community from "./pages/Community";
import Home from "./pages/Home";
import MyProjects from "./pages/MyProjects";
import Preview from "./pages/Preview";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import View from "./pages/View";
import AuthPage from "./pages/auth/AuthPage";

const App = () => {
  const { pathname } = useLocation();
  const hideNavBar =
    (pathname.startsWith("/projects/") && pathname !== "/projects") ||
    pathname.startsWith("/view/") ||
    pathname.startsWith("/preview/");
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      {!hideNavBar && <NavBar />}
      <main className="flex-1">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/pricing"} element={<Pricing />} />
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
