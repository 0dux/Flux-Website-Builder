import ProjectPreview from "@/components/ProjectPreview";
import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";
import type { Project, Version } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Preview = () => {
  const { data: session, isPending } = authClient.useSession();

  const { projectId, versionId } = useParams();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchCode = async () => {
    try {
      const { data } = await api.get(`/api/v1/project/preview/${projectId}`);
      setCode(data.project.current_code);
      if (versionId) {
        data.project.versions.forEach((version: Version) => {
          if (version.id === versionId) {
            setCode(version.code);
          }
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (session?.user && !isPending) {
      fetchCode();
    }
  }, [session?.user]);

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
