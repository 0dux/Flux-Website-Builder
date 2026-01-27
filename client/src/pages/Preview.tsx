import { dummyProjects } from "@/assets/assets";
import ProjectPreview from "@/components/ProjectPreview";
import type { Project } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Preview = () => {
  const { projectId, versionId } = useParams();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchCode = async () => {
    setTimeout(() => {
      const code = dummyProjects.find(
        (project) => project.id === projectId,
      )?.current_code;
      if (code) {
        setCode(code);
        setIsLoading(false);
      }
    }, 2 * 1000);
  };

  useEffect(() => {
    fetchCode();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-8 animate-spin text-white" />
      </div>
    );
  }
  
  return (
    <div className="h-screen">
      {code && (
        <ProjectPreview
          project={{ current_code: code } as Project}
          isGenerating={false}
          showEditorPanel={false}
        />
      )}
    </div>
  );
};

export default Preview;
