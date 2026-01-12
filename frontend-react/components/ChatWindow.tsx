import React, { useState, useRef, useEffect } from "react";
import { Message, Role, ChatSession } from "../types";
import MessageBubble from "./MessageBubble";

interface ChatWindowProps {
  session: ChatSession | null;
  onSendMessage: (msg: string) => void;
  onOpenUpload: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  session,
  onSendMessage,
  onOpenUpload,
}) => {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [session?.messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main className="flex h-full flex-1 flex-col bg-background-dark relative min-w-0">
      <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-[#1f2e34] bg-background-dark/80 px-6 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-white">智能 RAG 助手</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary rounded-lg transition-all"
            title="文档管理"
          >
            <span className="material-symbols-outlined text-[20px]">
              folder_open
            </span>
            <span className="text-sm font-medium">文档管理</span>
          </button>
          <button
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-[#283539] rounded-lg"
            title="分享"
          >
            <span className="material-symbols-outlined">ios_share</span>
          </button>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-8 scroll-smooth"
      >
        {session ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-8 pb-4">
            <div className="flex justify-center">
              <span className="rounded-full bg-[#1f2e34] px-3 py-1 text-xs font-medium text-slate-400">
                {session.messages.length === 0
                  ? "Start a conversation"
                  : `Chat Session started ${session.lastUpdated.toLocaleDateString()}`}
              </span>
            </div>
            {session.messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            选择或创建新会话开始对话
          </div>
        )}
      </div>

      <div className="w-full flex-shrink-0 px-4 pb-6 pt-2 bg-gradient-to-t from-background-dark via-background-dark to-transparent">
        <div className="mx-auto max-w-3xl">
          <form
            onSubmit={handleSubmit}
            className="relative flex w-full items-end gap-2 rounded-xl border border-[#283539] bg-[#1a2328] p-2 shadow-lg focus-within:ring-2 focus-within:ring-primary/50 transition-all duration-200"
          >
            <button
              type="button"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-[#283539] hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">
                attach_file
              </span>
            </button>
            <textarea
              className="flex-1 resize-none bg-transparent py-3 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-0 max-h-32 min-h-[44px]"
              placeholder="Message AI..."
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex items-center gap-1 pb-1">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-[#283539] hover:text-white"
                title="Voice Input"
              >
                <span className="material-symbols-outlined text-[20px]">
                  mic
                </span>
              </button>
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-9 min-w-[36px] items-center justify-center rounded-lg bg-primary text-slate-900 hover:bg-opacity-90 transition-all font-medium disabled:opacity-30 disabled:cursor-not-allowed ml-1"
              >
                <span className="material-symbols-outlined text-[20px]">
                  arrow_upward
                </span>
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-[11px] text-slate-500">
            RAG system powered by your documents. Responses are based on your
            knowledge base.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ChatWindow;
