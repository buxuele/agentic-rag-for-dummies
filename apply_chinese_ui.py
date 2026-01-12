#!/usr/bin/env python3
"""
Apply Chinese localization to React frontend
"""
from pathlib import Path

def apply_chinese():
    # Update App.tsx
    app_file = Path("frontend-react/App.tsx")
    content = app_file.read_text(encoding='utf-8')
    
    replacements = [
        ('"抱歉，我无法生成回复。"', '"I\'m sorry, I couldn\'t generate a response."'),
        ('"错误：无法连接到 RAG API。请确保后端服务运行在 8000 端口。"', '"Error: Unable to connect to RAG API. Please check if the backend is running on port 8000."'),
        ('"已添加 ${data.added} 个文档，跳过 ${data.skipped} 个重复文档"', '`Added ${data.added} documents, skipped ${data.skipped} duplicates`'),
        ('"文档上传失败"', '"Failed to upload documents"'),
    ]
    
    for chinese, english in replacements:
        content = content.replace(english, chinese)
    
    app_file.write_text(content, encoding='utf-8')
    print("✓ Updated App.tsx")
    
    # Update Sidebar.tsx
    sidebar_file = Path("frontend-react/components/Sidebar.tsx")
    content = sidebar_file.read_text(encoding='utf-8')
    
    replacements = [
        ('新建对话', 'New Chat'),
        ('文档', 'Documents'),
        ('上传 PDF/MD', 'Upload PDF/MD'),
        ('暂无文档', 'No documents'),
        ('今天', 'Today'),
        ('昨天', 'Yesterday'),
        ('更早', 'Earlier'),
        ('RAG 用户', 'RAG User'),
        ('知识库', 'Knowledge Base'),
    ]
    
    for chinese, english in replacements:
        content = content.replace(english, chinese)
    
    sidebar_file.write_text(content, encoding='utf-8')
    print("✓ Updated Sidebar.tsx")
    
    # Update ChatWindow.tsx
    chatwindow_file = Path("frontend-react/components/ChatWindow.tsx")
    content = chatwindow_file.read_text(encoding='utf-8')
    
    replacements = [
        ('智能 RAG 助手', 'Agentic RAG Assistant'),
        ('选择或创建新会话开始对话', 'Select or start a new chat to begin.'),
        ('开始对话', 'Start a conversation'),
        ('会话开始于', 'Chat Session started'),
        ('RAG 系统基于您的文档提供回答。回复内容来自您的知识库。', 'RAG system powered by your documents. Responses are based on your knowledge base.'),
    ]
    
    for chinese, english in replacements:
        content = content.replace(english, chinese)
    
    chatwindow_file.write_text(content, encoding='utf-8')
    print("✓ Updated ChatWindow.tsx")
    
    # Update MessageBubble.tsx
    messagebubble_file = Path("frontend-react/components/MessageBubble.tsx")
    content = messagebubble_file.read_text(encoding='utf-8')
    
    content = content.replace('AI Assistant', 'AI 助手')
    
    messagebubble_file.write_text(content, encoding='utf-8')
    print("✓ Updated MessageBubble.tsx")
    
    print("\n✅ Chinese localization applied successfully!")
    print("Run 'npm run dev' in frontend-react to see changes")

if __name__ == "__main__":
    try:
        apply_chinese()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
