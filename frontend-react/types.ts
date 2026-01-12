export enum Role {
  USER = "user",
  MODEL = "model",
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
  knowledgeBase?: string; // 知识库名称
}

export interface KnowledgeBase {
  id: string;
  name: string;
  description?: string;
  isDefault?: boolean;
}
