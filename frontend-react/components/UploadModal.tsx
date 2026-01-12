import React, { useState, useRef } from "react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: FileList) => Promise<void>;
  documents: string[];
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  documents,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleUpload(files);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleUpload(e.target.files);
      e.target.value = ""; // Reset input
    }
  };

  const handleUpload = async (files: FileList) => {
    setIsUploading(true);
    try {
      await onUpload(files);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-surface-dark border border-[#1f2e34] rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f2e34]">
          <h2 className="text-xl font-bold text-white">文档管理</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-[#283539] rounded-lg"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 transition-all ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-[#525252] hover:border-primary/50 hover:bg-[#1a2328]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.md"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">
                  {isUploading ? "hourglass_empty" : "upload_file"}
                </span>
              </div>

              <div className="text-center">
                <p className="text-white font-medium mb-1">
                  {isUploading ? "上传中..." : "拖拽文件到这里或点击上传"}
                </p>
                <p className="text-slate-400 text-sm">
                  支持 PDF 和 Markdown 文件
                </p>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-slate-900 font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                选择文件
              </button>
            </div>
          </div>

          {/* Document List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">
                知识库文档 ({documents.length})
              </h3>
            </div>

            <div className="bg-[#1a2328] rounded-lg border border-[#283539] max-h-64 overflow-y-auto">
              {documents.length === 0 ? (
                <div className="p-8 text-center">
                  <span className="material-symbols-outlined text-slate-500 text-4xl mb-2">
                    folder_open
                  </span>
                  <p className="text-slate-500 text-sm">暂无文档</p>
                </div>
              ) : (
                <div className="divide-y divide-[#283539]">
                  {documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#283539] transition-colors"
                    >
                      <span className="material-symbols-outlined text-primary text-xl">
                        description
                      </span>
                      <span className="text-sm text-slate-300 flex-1 truncate">
                        {doc}
                      </span>
                      <span className="text-xs text-slate-500">
                        {(Math.random() * 500 + 100).toFixed(0)} KB
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#1a2328] border-t border-[#1f2e34] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-300 hover:text-white hover:bg-[#283539] rounded-lg transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
