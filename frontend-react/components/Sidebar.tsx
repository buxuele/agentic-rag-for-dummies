import React from "react";
import { ChatSession } from "../types";

interface SidebarProps {
  sessions: ChatSession[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  activeId,
  onSelect,
  onNewChat,
  isOpen,
  onToggle,
}) => {
  const groupSessions = () => {
    const today: ChatSession[] = [];
    const yesterday: ChatSession[] = [];
    const older: ChatSession[] = [];

    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    sessions.forEach((s) => {
      const diff = now.getTime() - s.lastUpdated.getTime();
      if (diff < oneDay) today.push(s);
      else if (diff < oneDay * 2) yesterday.push(s);
      else older.push(s);
    });

    return { today, yesterday, older };
  };

  const { today, yesterday, older } = groupSessions();

  return (
    <aside
      className={`flex flex-col border-r border-[#1f2e34] bg-surface-dark transition-all duration-300 ${
        isOpen ? "w-[280px]" : "w-0 overflow-hidden md:w-0"
      }`}
    >
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="flex w-full items-center gap-3 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 px-4 py-3 text-white transition-all group"
        >
          <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
            add
          </span>
          <span className="text-sm font-semibold">新建对话</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-6">
        {today.length > 0 && (
          <div>
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              今天
            </h3>
            {today.map((s) => (
              <ChatNavItem
                key={s.id}
                session={s}
                active={s.id === activeId}
                onClick={() => onSelect(s.id)}
              />
            ))}
          </div>
        )}
        {yesterday.length > 0 && (
          <div>
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              昨天
            </h3>
            {yesterday.map((s) => (
              <ChatNavItem
                key={s.id}
                session={s}
                active={s.id === activeId}
                onClick={() => onSelect(s.id)}
              />
            ))}
          </div>
        )}
        {older.length > 0 && (
          <div>
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              更早
            </h3>
            {older.map((s) => (
              <ChatNavItem
                key={s.id}
                session={s}
                active={s.id === activeId}
                onClick={() => onSelect(s.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[#1f2e34] p-3">
        <div className="flex items-center justify-between rounded-lg p-2 hover:bg-[#283539] transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="size-9 overflow-hidden rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-400">
                person
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">RAG 用户</span>
              <span className="text-xs text-slate-400">知识库</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400">
            settings
          </span>
        </div>
      </div>
    </aside>
  );
};

const ChatNavItem: React.FC<{
  session: ChatSession;
  active: boolean;
  onClick: () => void;
}> = ({ session, active, onClick }) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    // 今天：显示时间
    if (diff < oneDay) {
      return date.toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    // 昨天
    if (diff < oneDay * 2) {
      return (
        "昨天 " +
        date.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
    // 更早：显示日期
    return date.toLocaleDateString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <button
      onClick={onClick}
      className={`w-full group flex items-start justify-between gap-2 rounded-lg px-3 py-2.5 transition-all mb-1 ${
        active ? "bg-surface-active" : "hover:bg-[#283539]"
      }`}
    >
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <span
          className={`material-symbols-outlined text-[20px] mt-0.5 ${
            active ? "text-white" : "text-slate-400 group-hover:text-white"
          }`}
        >
          {active ? "chat_bubble" : "chat_bubble_outline"}
        </span>
        <div className="flex flex-col items-start min-w-0 flex-1">
          <p
            className={`truncate text-sm font-medium w-full text-left ${
              active ? "text-white" : "text-slate-300 group-hover:text-white"
            }`}
          >
            {session.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-500">
              {formatDate(session.lastUpdated)}
            </span>
            {session.knowledgeBase && (
              <>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-500 truncate max-w-[100px]">
                  {session.knowledgeBase}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default Sidebar;
