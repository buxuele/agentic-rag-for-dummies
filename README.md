# Agentic RAG for Dummies

基于 FastAPI + React 的智能文档问答系统

## 快速开始

```bash
run_all.bat
```

访问: http://localhost:5173

## 项目结构

```
rag_apps/
├── backend-python/      # 后端代码和数据
├── frontend-react/      # React 前端
├── run_backend.py       # 后端启动脚本
└── run_all.bat          # 一键启动
```

详见: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

## 安装

```bash
# 后端
pip install -r requirements.txt

# 前端
cd frontend-react
npm install
```

## 使用

1. 点击"文档管理"上传 PDF/Markdown
2. 在输入框提问
3. AI 基于文档回答

## RAG 的本质

让 LLM 的回答有参考来源、有依据

## 技术栈

- 后端: FastAPI + LangChain + Qdrant + Ollama
- 前端: React + TypeScript + Tailwind CSS

## Todo

- [ ] 支持更多格式 (HTML, TXT, DOCX)
- [ ] 知识库分组管理
- [ ] 文档删除功能
- [ ] 优化上传性能（目前较慢）

## 已知问题

**文件处理慢**: PDF 转换和向量化需要时间，大文件会卡顿

## 文档

- [项目结构](PROJECT_STRUCTURE.md)
- [快速开始](QUICKSTART.md)
- [问题修复](FIX_RAG_ISSUES.md)

## 原始项目

Fork 自: [GiovanniPasq/agentic-rag-for-dummies](https://github.com/GiovanniPasq/agentic-rag-for-dummies)

## License

MIT
