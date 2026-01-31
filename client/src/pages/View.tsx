import ProjectPreview from "@/components/ProjectPreview";
import api from "@/configs/axios";
import type { Project } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const View = () => {
  const { projectId } = useParams();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchCode = async () => {
    try {
      const { data } = await api.get(`/api/v1/project/published/${projectId}`);
      setCode(data.code);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
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

export default View;
