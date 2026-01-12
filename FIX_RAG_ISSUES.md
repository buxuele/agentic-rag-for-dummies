# 修复 RAG 问题指南

## 问题描述

1. ❌ UI 显示 "I couldn't find any information..." (英文)
2. ❌ RAG 系统没有找到文档中的信息
3. ❌ 需要优先使用中文回答

## 已修复内容

### 1. 后端 Prompts（中文优先）✅

**文件**: `project/rag_agent/prompts.py`

- ✅ RAG Agent Prompt 添加中文优先指令
- ✅ Aggregation Prompt 添加中文输出
- ✅ 无结果时返回中文提示

### 2. API 错误处理 ✅

**文件**: `project/api/main.py`

- ✅ 添加异常捕获和中文错误消息
- ✅ 修复历史记录传递

### 3. 前端中文化 ✅

**文件**:

- `frontend-react/App.tsx`
- `frontend-react/components/Sidebar.tsx`
- `frontend-react/components/ChatWindow.tsx`
- `frontend-react/components/MessageBubble.tsx`

运行脚本应用中文化：

```bash
python apply_chinese_ui.py
```

## 测试步骤

### 步骤 1: 检查 RAG 系统状态

```bash
python debug_rag.py
```

**预期输出:**

```
✓ RAG system initialized
✓ Found X documents
✓ Found Y results for test query
✓ Found Z parent chunks
```

**如果没有文档:**

1. 确保 `docs/` 目录有 PDF 文件
2. 运行后端并上传文档
3. 或者运行 Gradio 版本上传文档

### 步骤 2: 上传测试文档

**方法 A: 使用 React 前端**

```bash
# 启动后端
python start_backend.py

# 启动前端（另一个终端）
cd frontend-react
npm run dev
```

访问 http://localhost:5173

- 点击 "文档"
- 上传 `docs/javascript_tutorial.pdf`

**方法 B: 使用 Gradio（旧版）**

```bash
python project/app.py
```

访问 http://localhost:7860

- 切换到 "Documents" 标签
- 上传文档

### 步骤 3: 测试聊天

**测试查询:**

```
什么是 JavaScript？
```

**预期回复:**

- ✅ 中文回答
- ✅ 包含文档内容
- ✅ 列出来源文件

**如果仍然显示 "没有找到信息":**

1. **检查文档是否被索引:**

   ```bash
   python debug_rag.py
   ```

2. **检查搜索阈值:**
   编辑 `project/rag_agent/tools.py`:

   ```python
   # 降低阈值从 0.7 到 0.5
   results = self.collection.similarity_search(query, k=limit, score_threshold=0.5)
   ```

3. **检查 LLM 模型:**
   编辑 `project/config.py`:

   ```python
   LLM_MODEL = "qwen3:4b-instruct-2507-q4_K_M"  # 确保模型已下载
   ```

   下载模型:

   ```bash
   ollama pull qwen3:4b-instruct-2507-q4_K_M
   ```

### 步骤 4: 应用前端中文化

```bash
python apply_chinese_ui.py
```

然后重启前端:

```bash
cd frontend-react
npm run dev
```

## 常见问题排查

### 问题 1: 后端启动失败

**症状:** `ModuleNotFoundError` 或导入错误

**解决:**

```bash
pip install -r requirements.txt
```

### 问题 2: 没有找到文档

**症状:** Debug 脚本显示 0 documents

**解决:**

1. 检查 `markdown/` 目录是否有 .md 文件
2. 检查 `parent_store/` 目录是否有 .json 文件
3. 重新上传文档

### 问题 3: 搜索无结果

**症状:** Search 返回 0 results

**解决:**

1. 降低 `score_threshold` 从 0.7 到 0.5
2. 检查嵌入模型是否正确加载
3. 尝试更具体的查询

### 问题 4: LLM 不回答中文

**症状:** 回答仍然是英文

**解决:**

1. 确保 `project/rag_agent/prompts.py` 已更新
2. 重启后端服务
3. 清除会话重新开始

### 问题 5: 前端仍显示英文

**症状:** UI 文字是英文

**解决:**

```bash
python apply_chinese_ui.py
cd frontend-react
npm run dev
```

## 完整重置流程

如果问题持续，执行完整重置:

```bash
# 1. 停止所有服务
# Ctrl+C 停止后端和前端

# 2. 清理数据
rm -rf markdown/*
rm -rf parent_store/*
rm -rf qdrant_db/*

# 3. 重新启动后端
python start_backend.py

# 4. 上传文档
# 使用前端上传文档

# 5. 测试
python debug_rag.py
```

## 验证清单

- [ ] 后端启动成功（端口 8000）
- [ ] 前端启动成功（端口 5173）
- [ ] Debug 脚本显示有文档
- [ ] Debug 脚本搜索有结果
- [ ] 聊天返回中文回答
- [ ] 回答包含文档内容
- [ ] UI 显示中文界面

## 获取帮助

如果问题仍然存在:

1. 查看后端日志（终端输出）
2. 查看浏览器控制台（F12）
3. 运行 `python debug_rag.py` 获取详细信息
4. 检查 `project/config.py` 配置

## 下一步优化

完成修复后，可以考虑:

1. 调整搜索参数（k 值、阈值）
2. 优化 Prompt 提示词
3. 添加更多文档
4. 尝试不同的 LLM 模型
