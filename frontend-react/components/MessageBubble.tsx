import React from "react";
import { Message, Role } from "../types";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isModel = message.role === Role.MODEL;

  return (
    <div
      className={`flex gap-4 ${
        !isModel ? "flex-row-reverse items-end" : "group"
      }`}
    >
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border ${
          isModel
            ? "bg-primary/20 border-primary/30"
            : "bg-slate-700 border-slate-600"
        }`}
      >
        <span
          className={`material-symbols-outlined text-[20px] ${
            isModel ? "text-primary" : "text-white"
          }`}
        >
          {isModel ? "smart_toy" : "person"}
        </span>
      </div>

      <div
        className={`flex flex-1 flex-col gap-2 ${
          !isModel ? "items-end max-w-[80%]" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-white">
            {isModel ? "AI 助手" : ""}
          </p>
          {isModel && (
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-slate-400 hover:text-white">
                <span className="material-symbols-outlined text-[18px]">
                  content_copy
                </span>
              </button>
              <button className="text-slate-400 hover:text-white">
                <span className="material-symbols-outlined text-[18px]">
                  thumb_up
                </span>
              </button>
            </div>
          )}
        </div>

        <div
          className={`prose prose-invert max-w-none leading-relaxed ${
            isModel
              ? "text-slate-200 bg-[#162227] p-5 rounded-lg border border-[#1f2e34]"
              : "bg-primary text-slate-900 px-5 py-3 rounded-2xl rounded-tr-sm shadow-sm font-medium"
          }`}
        >
          {/* Simple Markdown rendering placeholder. In a production app, use react-markdown */}
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>

        <span className="text-xs text-slate-500 mt-1">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
