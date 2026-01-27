import {
  BotIcon,
  EyeIcon,
  Loader2Icon,
  SendIcon,
  UserIcon,
} from "lucide-react";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { Link } from "react-router-dom";

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

  const handleRollback = async (versionId: string) => {};
  const handleRevisions = async (e: FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3 * 1000);
  };

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [project.conversation.length, isGenerating]);

  return (
    <div
      className={`h-full sm:max-w-sm rounded-xl bg-zinc-900 border-zinc-800 transition-all ${isMenuOpen ? "max-sm:w-0 overflow-hidden" : "w-full"}`}
    >
      <div className="flex flex-col h-full">
        {/* Messages Container */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto no-scrollbar px-4">
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
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-600 to-indigo-700 flex items-center justify-center">
                        <BotIcon className="size-5 text-white" />
                      </div>
                    )}
                    {/* Displays message text */}
                    <div
                      className={`max-w-[80%] p-2 px-4 rounded-2xl shadow-sm text-sm mt-5 leading leading-relaxed ${isUser ? "bg-linear-to-r from-indigo-500 to-indigo-600" : "bg-zinc-800 text-zinc-100"}`}
                    >
                      {msg.content}
                    </div>
                    {isUser && (
                      <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                        <UserIcon className="size-4 text-zinc-200" />
                      </div>
                    )}
                  </div>
                );
              } else {
                const ver = message as Version;
                return (
                  <div
                    key={ver.id}
                    className="w-4/5 mx-auto my-2 p-4 rounded-xl bg-zinc-800 text-zinc-100 shadow flex flex-col gap-2"
                  >
                    <div className="text-xs font-medium">
                      code updated <br />
                      <span className="text-zinc-500 text-xs font-normal">
                        {new Date(ver.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      {project.current_version_index === ver.id ? (
                        <button className="px-2 py-1 rounded-md text-xs bg-zinc-700">
                          Current Version
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRollback(ver.id)}
                          className="px-2 py-1 rounded-md text-xs bg-indigo-500 hover:bg-indigo-600 transition-colors text-white"
                        >
                          Rollback to this version
                        </button>
                      )}
                      <Link
                        to={`/preview/${project.id}/${ver.id}`}
                        target="_blank"
                      >
                        <EyeIcon className="size-6 p-2 bg-zinc-700 hover:bg-indigo-500 transition-colors rounded" />
                      </Link>
                    </div>
                  </div>
                );
              }
            })}
          {isGenerating && (
            <div className="flex items-start gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-600 to-indigo-700 flex items-center justify-center">
                <BotIcon className="size-5 text-white" />
              </div>
              {/* three dot loader */}
              <div className="flex gap-1.5 h-full items-end">
                <span
                  className="size-2 rounded-full animate-bounce bg-zinc-600"
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className="size-2 rounded-full animate-bounce bg-zinc-600"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="size-2 rounded-full animate-bounce bg-zinc-600"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          )}
          <div ref={messageRef} />
        </div>
        {/* Input area */}
        <form onSubmit={handleRevisions} className="m-4 relative">
          <div className="flex items-center gap-2">
            <textarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              rows={4}
              placeholder="Describe your website or request changes..."
              className="flex-1 p-4 rounded-xl resize-none text-sm outline-none ring ring-zinc-700 focus:ring-indigo-500 bg-zinc-800 text-zinc-100 placeholder-zinc-400 transition-all"
              disabled={isGenerating}
            />
            <button
              disabled={isGenerating || !input.trim()}
              className="absolute bottom-2.5 right-2.5 rounded-full bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white transition-colors disabled:opacity-60"
            >
              {isGenerating ? (
                <Loader2Icon className="size-8 p-2 animate-spin text-white" />
              ) : (
                <SendIcon className="size-8 p-2 text-white" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SideBar;
