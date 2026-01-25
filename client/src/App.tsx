import { Route, Routes } from "react-router-dom";
import Community from "./pages/Community";
import Home from "./pages/Home";
import MyProjects from "./pages/MyProjects";
import Preview from "./pages/Preview";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import View from "./pages/View";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/pricing"} element={<Pricing />} />
        <Route path={"/projects/:projectId"} element={<Projects />} />
        <Route path={"/projects"} element={<MyProjects />} />
        <Route path={"/preview/:projectId"} element={<Preview />} />
        <Route path={"/preview/:projectId/:versionId"} element={<Preview />} />
        <Route path={"/community"} element={<Community />} />
        <Route path={"/view/:projectId"} element={<View />} />
      </Routes>
    </>
  );
};

export default App;
