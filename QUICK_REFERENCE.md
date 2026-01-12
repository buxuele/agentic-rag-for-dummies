# 🚀 快速参考

## 启动命令

```bash
# Windows 一键启动
start_all.bat

# Linux/Mac 一键启动
./start_all.sh

# 手动启动
python start_backend.py          # 终端 1
cd frontend-react && npm run dev # 终端 2
```

## 访问地址

- 🌐 前端: http://localhost:5173
- 🔧 API: http://localhost:8000/docs
- 💚 健康检查: http://localhost:8000/api/health

## 核心功能

### 📄 文档管理

1. 点击顶部 "文档管理" 按钮
2. 拖拽或选择 PDF/MD 文件
3. 等待上传完成

### 💬 开始对话

1. 在输入框输入问题
2. 按 Enter 发送
3. 等待 AI 回复

### 🔄 新建会话

1. 点击侧边栏 "新建对话"
2. 开始新的对话

## 测试查询

```
什么是 JavaScript？
解释一下 Python 的特点
React 和 Vue 有什么区别？
```

## 常用调试

```bash
# 检查 RAG 系统
python debug_rag.py

# 测试 API
python test_api.py

# 应用中文界面
python apply_chinese_ui.py

# 一键修复
python quick_fix.py
```

## 文件位置

```
文档存储: markdown/
向量数据库: qdrant_db/
父块存储: parent_store/
配置文件: project/config.py
```

## 快捷键

- `Enter` - 发送消息
- `Shift + Enter` - 换行
- `Esc` - 关闭弹窗（待实现）

## 故障排除

### 后端无法启动

```bash
pip install -r requirements.txt
python start_backend.py
```

### 前端无法启动

```bash
cd frontend-react
npm install
npm run dev
```

### 没有找到文档

```bash
python debug_rag.py  # 检查状态
# 然后上传文档
```

### 回答不是中文

```bash
# 确保 prompts 已更新
# 重启后端服务
```

## 重要文档

- [QUICKSTART.md](QUICKSTART.md) - 快速开始
- [LATEST_UPDATES.md](LATEST_UPDATES.md) - 最新更新
- [UI_IMPROVEMENTS.md](UI_IMPROVEMENTS.md) - UI 改进
- [FIX_RAG_ISSUES.md](FIX_RAG_ISSUES.md) - 问题修复
- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - 迁移指南

## 技术栈

**后端:**

- FastAPI
- LangChain
- Qdrant
- Ollama

**前端:**

- React 19
- TypeScript
- Tailwind CSS
- Vite

## 支持

遇到问题？

1. 查看相关文档
2. 运行调试脚本
3. 检查终端日志
4. 查看浏览器控制台

---

**快速参考 - 随时查阅！** 📖
