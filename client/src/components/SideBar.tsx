import {
  BotIcon,
  EyeIcon,
  Loader2Icon,
  SendIcon,
  UserIcon,
} from "lucide-react";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { Link } from "react-router-dom";

import api from "@/configs/axios";
import { toast } from "sonner";
import type { Message, Project, Version } from "../types";

interface sidebarProps {
  isMenuOpen: boolean;
  project: Project;
  setProject: (project: Project) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}
const SideBar = ({
  isMenuOpen,
  project,
  setProject,
  isGenerating,
  setIsGenerating,
}: sidebarProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const handleRollback = async (versionId: string) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to rollback to this version?",
      );
      if (!confirm) {
        return;
      }
      setIsGenerating(true);
      const { data } = await api.get(
        `/api/v1/project/rollback/${project.id}/${versionId}`,
      );
      setIsGenerating(true);
      const { data: data2 } = await api.get(
        `/api/v1/user/project/${project.id}`,
      );
      toast.success(data.message);
      setProject(data2.project);
      setIsGenerating(false);
    } catch (error: any) {
      setIsGenerating(false);
      toast.error(error?.response?.data?.message || error.message);
      console.error(error);
    }
  };

  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/api/v1/user/project/${project.id}`);
      setProject(data.project);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.error(error);
    }
  };

  const handleRevisions = async (e: FormEvent) => {
    e.preventDefault();
    let interval: number | undefined;
    try {
      setIsGenerating(true);
      interval = setInterval(() => {
        fetchProject();
      }, 10 * 1000);
      const { data } = await api.post(
        `/api/v1/project/revision/${project.id}`,
        { message: input },
      );
      fetchProject();
      toast.success(data.message);
      setInput("");
      clearInterval(interval);
      setIsGenerating(false);
    } catch (error: any) {
      setIsGenerating(false);
      toast.error(error?.response?.data?.message || error.message);
      console.error(error);
      clearInterval(interval);
    }
  };

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [project.conversation.length, isGenerating]);

  return (
    <div
      className={`h-full border border-border bg-card shadow-md transition-all ${isMenuOpen ? "max-sm:w-0 overflow-hidden" : "w-full sm:max-w-sm"}`}
    >
      <div className="flex flex-col h-full">
        {/* Messages Container */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto no-scrollbar px-4 py-4">
          {[...project.conversation, ...project.versions]
            .sort(
              (a, b) =>
                new Date(a.timestamp).getTime() -
                new Date(b.timestamp).getTime(),
            )
            .map((message) => {
              const isMessage = "content" in message;
              if (isMessage) {
                const msg = message as Message;
                const isUser = msg.role === "user";
                return (
                  // message div in sorted order
                  <div
                    key={msg.id}
                    className={`flex items-start gap-4 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {/* Show a bot logo when it is not user */}
                    {!isUser && (
                      <div className="flex h-8 w-8 items-center justify-center border border-border bg-accent text-accent-foreground shadow-sm">
                        <BotIcon className="size-5" />
                      </div>
                    )}
                    {/* Displays message text */}
                    <div
                      className={`mt-5 max-w-[80%] border border-border px-4 py-2 text-sm leading-relaxed shadow-sm ${isUser ? "bg-accent text-accent-foreground" : "bg-background text-foreground"}`}
                    >
                      {msg.content}
                    </div>
                    {isUser && (
                      <div className="flex h-8 w-8 items-center justify-center border border-border bg-muted text-muted-foreground shadow-sm">
                        <UserIcon className="size-4" />
                      </div>
                    )}
                  </div>
                );
              } else {
                const ver = message as Version;
                return (
                  <div
                    key={ver.id}
                    className="mx-auto my-2 flex w-4/5 flex-col gap-2 border border-border bg-background p-4 text-foreground shadow-sm"
                  >
                    <div className="text-xs font-medium">
                      code updated <br />
                      <span className="text-xs font-normal text-muted-foreground">
                        {new Date(ver.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      {project.current_version_index === ver.id ? (
                        <button className="border border-border bg-muted px-2 py-1 text-xs text-muted-foreground shadow-sm active:shadow-none">
                          Current Version
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRollback(ver.id)}
                          className="border border-border bg-accent px-2 py-1 text-xs text-accent-foreground shadow-sm active:shadow-none transition-colors hover:bg-accent/90"
                        >
                          Rollback to this version
                        </button>
                      )}
                      <Link
                        to={`/preview/${project.id}/${ver.id}`}
                        target="_blank"
                      >
                        <EyeIcon className="size-8 border border-border bg-muted p-2 text-foreground shadow-sm active:shadow-none transition-colors hover:bg-accent hover:text-accent-foreground" />
                      </Link>
                    </div>
                  </div>
                );
              }
            })}
          {isGenerating && (
            <div className="flex items-start gap-4 justify-start">
              <div className="flex h-8 w-8 items-center justify-center border border-border bg-accent text-accent-foreground shadow-sm">
                <BotIcon className="size-5" />
              </div>
              {/* three dot loader */}
              <div className="flex gap-1.5 h-full items-end">
                <span
                  className="size-2 animate-bounce bg-muted-foreground"
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className="size-2 animate-bounce bg-muted-foreground"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="size-2 animate-bounce bg-muted-foreground"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          )}
          <div ref={messageRef} />
        </div>
        {/* Input area */}
        <form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleRevisions(e);
            }
          }}
          onSubmit={handleRevisions}
          className="m-4 relative"
        >
          <div className="flex items-center gap-2">
            <textarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              rows={4}
              placeholder="Describe your website or request changes..."
              className="flex-1 resize-none border border-border bg-background p-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
              disabled={isGenerating}
            />
            <button
              disabled={isGenerating || !input.trim()}
              className="absolute bottom-2.5 right-2.5 border border-border bg-accent text-accent-foreground shadow-sm active:shadow-none transition-colors hover:bg-accent/90 disabled:opacity-60"
            >
              {isGenerating ? (
                <Loader2Icon className="size-8 animate-spin p-2" />
              ) : (
                <SendIcon className="size-8 p-2" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SideBar;
