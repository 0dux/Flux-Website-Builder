import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import GradientBlinds from "./components/GradientBlinds";
import NavBar from "./components/NavBar";
import AuthPage from "./pages/auth/AuthPage";
import Community from "./pages/Community";
import Home from "./pages/Home";
import MyProjects from "./pages/MyProjects";
import Preview from "./pages/Preview";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import SettingsPage from "./pages/SettingsPage";
import View from "./pages/View";

const App = () => {
  const { pathname } = useLocation();
  const hideNavBar =
    (pathname.startsWith("/projects/") && pathname !== "/projects") ||
    pathname.startsWith("/view/") ||
    pathname.startsWith("/preview/");
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      {!hideNavBar && (
        <>
          <NavBar />
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
      )}
      <main className="flex-1">
        <Routes>
          <Route path={"/"} element={<Home />} />
          {/* <Route path={"/pricing"} element={<Pricing />} /> */}
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
