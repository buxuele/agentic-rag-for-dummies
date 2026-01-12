import React, { useState } from "react";
import { KnowledgeBase } from "../types";

interface KnowledgeBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (knowledgeBase: string) => void;
  knowledgeBases: KnowledgeBase[];
}

const KnowledgeBaseModal: React.FC<KnowledgeBaseModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  knowledgeBases,
}) => {
  const [selectedKB, setSelectedKB] = useState<string>(
    knowledgeBases.find((kb) => kb.isDefault)?.id || knowledgeBases[0]?.id || ""
  );

  if (!isOpen) return null;

  const handleConfirm = () => {
    onSelect(selectedKB);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-surface-dark border border-slate-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">选择知识库</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-400 mb-4">
            为新对话选择一个知识库，AI 将基于该知识库回答问题
          </p>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {knowledgeBases.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-2 block">
                  folder_off
                </span>
                <p>暂无知识库</p>
                <p className="text-xs mt-2">请先上传文档创建知识库</p>
              </div>
            ) : (
              knowledgeBases.map((kb) => (
                <label
                  key={kb.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedKB === kb.id
                      ? "border-primary bg-primary/10"
                      : "border-slate-700 hover:border-slate-600 hover:bg-slate-800/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="knowledgeBase"
                    value={kb.id}
                    checked={selectedKB === kb.id}
                    onChange={(e) => setSelectedKB(e.target.value)}
                    className="mt-1 accent-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{kb.name}</span>
                      {kb.isDefault && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                          默认
                        </span>
                      )}
                    </div>
                    {kb.description && (
                      <p className="text-sm text-slate-400 mt-1">
                        {kb.description}
                      </p>
                    )}
                  </div>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-slate-700 px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedKB}
            className="flex-1 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            创建对话
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseModal;
