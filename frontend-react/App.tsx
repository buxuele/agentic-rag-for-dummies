import React, { useState, useEffect, useCallback } from "react";
import { Role, Message, ChatSession, KnowledgeBase } from "./types";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import UploadModal from "./components/UploadModal";
import KnowledgeBaseModal from "./components/KnowledgeBaseModal";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const App: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [documents, setDocuments] = useState<string[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isKBModalOpen, setIsKBModalOpen] = useState(false);
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([
    {
      id: "default",
      name: "默认知识库",
      description: "包含所有已上传的文档",
      isDefault: true,
    },
    {
      id: "javascript",
      name: "JavaScript 教程",
      description: "JavaScript 相关文档",
    },
    { id: "blockchain", name: "区块链入门", description: "区块链基础知识" },
    {
      id: "microservices",
      name: "微服务架构",
      description: "微服务设计与部署",
    },
  ]);

  // Initialize with saved data or create new chat
  useEffect(() => {
    const saved = localStorage.getItem("chat_sessions");
    if (saved) {
      const parsed = JSON.parse(saved).map((s: any) => ({
        ...s,
        lastUpdated: new Date(s.lastUpdated),
        messages: s.messages.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })),
      }));
      setSessions(parsed);
      if (parsed.length > 0) setActiveSessionId(parsed[0].id);
    } else {
      // 首次使用，打开知识库选择弹窗
      setIsKBModalOpen(true);
    }

    // Load documents from backend
    loadDocuments();
  }, []);

  // Sync with storage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem("chat_sessions", JSON.stringify(sessions));
    }
  }, [sessions]);

  const loadDocuments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/documents`);
      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (error) {
      console.error("Failed to load documents:", error);
    }
  };

  const createNewChat = useCallback(
    (knowledgeBase?: string) => {
      const newId = Date.now().toString();
      const kb =
        knowledgeBase ||
        knowledgeBases.find((k) => k.isDefault)?.name ||
        "默认知识库";
      const newSession: ChatSession = {
        id: newId,
        title: "新对话",
        messages: [],
        lastUpdated: new Date(),
        knowledgeBase: kb,
      };
      setSessions((prev) => [newSession, ...prev]);
      setActiveSessionId(newId);
    },
    [knowledgeBases]
  );

  const handleNewChatClick = () => {
    setIsKBModalOpen(true);
  };

  const handleKBSelect = (kbId: string) => {
    const kb = knowledgeBases.find((k) => k.id === kbId);
    createNewChat(kb?.name);
  };

  const addMessageToActiveSession = useCallback(
    async (role: Role, content: string) => {
      if (!activeSessionId) return;

      const newMessage: Message = {
        id: Date.now().toString(),
        role,
        content,
        timestamp: new Date(),
      };

      setSessions((prev) =>
        prev.map((session) => {
          if (session.id === activeSessionId) {
            const updatedMessages = [...session.messages, newMessage];
            // Auto-title if it's the first user message
            let newTitle = session.title;
            if (role === Role.USER && session.messages.length === 0) {
              newTitle =
                content.length > 30
                  ? content.substring(0, 30) + "..."
                  : content;
            }
            return {
              ...session,
              messages: updatedMessages,
              title: newTitle,
              lastUpdated: new Date(),
            };
          }
          return session;
        })
      );

      if (role === Role.USER) {
        await callRAGAPI(content);
      }
    },
    [activeSessionId]
  );

  const callRAGAPI = async (prompt: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
          session_id: activeSessionId || "default",
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.response || "抱歉，我无法生成回复。";
      addMessageToActiveSession(Role.MODEL, aiResponse);
    } catch (error) {
      console.error("RAG API Error:", error);
      addMessageToActiveSession(
        Role.MODEL,
        "错误：无法连接到 RAG API。请确保后端服务运行在 8000 端口。"
      );
    }
  };

  const uploadDocuments = async (files: FileList) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/documents/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      alert(`已添加 ${data.added} 个文档，跳过 ${data.skipped} 个重复文档`);
      await loadDocuments();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("文档上传失败");
    }
  };

  const activeSession = sessions.find((s) => s.id === activeSessionId) || null;

  return (
    <div className="flex h-screen w-full bg-background-dark overflow-hidden">
      <Sidebar
        sessions={sessions}
        activeId={activeSessionId}
        onSelect={setActiveSessionId}
        onNewChat={handleNewChatClick}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <ChatWindow
        session={activeSession}
        onSendMessage={(msg) => addMessageToActiveSession(Role.USER, msg)}
        onOpenUpload={() => setIsUploadModalOpen(true)}
      />
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={uploadDocuments}
        documents={documents}
      />
      <KnowledgeBaseModal
        isOpen={isKBModalOpen}
        onClose={() => setIsKBModalOpen(false)}
        onSelect={handleKBSelect}
        knowledgeBases={knowledgeBases}
      />
    </div>
  );
};

export default App;
