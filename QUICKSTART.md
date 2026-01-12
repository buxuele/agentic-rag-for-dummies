# 🚀 Quick Start Guide

## 快速开始

### 方式 1: 自动启动（推荐）

**Windows:**

```bash
start_all.bat
```

**Linux/Mac:**

```bash
chmod +x start_all.sh
./start_all.sh
```

### 方式 2: 手动启动

**终端 1 - 启动后端:**

```bash
python start_backend.py
```

**终端 2 - 启动前端:**

```bash
cd frontend-react
npm install  # 首次运行需要
npm run dev
```

### 访问应用

- 🌐 **前端界面**: http://localhost:5173
- 🔧 **API 文档**: http://localhost:8000/docs
- 💚 **健康检查**: http://localhost:8000/api/health

## 功能测试

### 1. 上传文档

1. 点击侧边栏的 "Documents" 按钮
2. 点击 "Upload PDF/MD"
3. 选择 PDF 或 Markdown 文件
4. 等待上传完成

### 2. 开始聊天

1. 在输入框输入问题
2. 按 Enter 或点击发送按钮
3. AI 会基于你的文档回答

### 3. 管理会话

- 点击 "New Chat" 创建新会话
- 点击历史会话切换
- 会话自动保存在浏览器

## 测试 API

```bash
python test_api.py
```

## 项目结构

```
.
├── project/
│   ├── api/              # FastAPI 后端
│   │   └── main.py       # API 路由
│   ├── core/             # RAG 核心逻辑
│   └── ui/               # 旧 Gradio UI（保留）
│
├── frontend-react/       # React 前端
│   ├── components/       # UI 组件
│   ├── App.tsx          # 主应用
│   └── package.json     # 依赖配置
│
├── start_backend.py     # 后端启动脚本
├── start_all.bat        # Windows 一键启动
└── start_all.sh         # Linux/Mac 一键启动
```

## 技术栈

### 后端

- FastAPI - 现代 Python Web 框架
- LangChain - RAG 框架
- Qdrant - 向量数据库
- Sentence Transformers - 文本嵌入

### 前端

- React 19 - UI 框架
- TypeScript - 类型安全
- Tailwind CSS - 样式
- Vite - 构建工具

## 常见问题

### 后端启动失败

```bash
# 检查依赖
pip install -r requirements.txt

# 检查端口占用
netstat -ano | findstr :8000  # Windows
lsof -i :8000                 # Linux/Mac
```

### 前端启动失败

```bash
cd frontend-react
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### CORS 错误

确保后端运行在 8000 端口，前端运行在 5173 端口

### 上传失败

检查 `/tmp` 目录权限（Linux/Mac）或 `C:\Temp` （Windows）

## 下一步

1. ✅ 上传你的文档
2. ✅ 测试聊天功能
3. 📖 阅读 [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) 了解更多
4. 🔧 查看 [API 文档](http://localhost:8000/docs)

## 回退到 Gradio

如果需要使用旧版 Gradio 界面：

```bash
python project/app.py
```

## 获取帮助

- 查看 API 文档: http://localhost:8000/docs
- 查看迁移指南: [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
- 前端 README: [frontend-react/README.md](frontend-react/README.md)
