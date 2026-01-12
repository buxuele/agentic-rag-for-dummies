# Migration Guide: FastAPI + React

## Overview

Your Agentic RAG application now uses a modern FastAPI + React stack.

## What Changed

### Backend

- ✅ **Old**: Gradio UI (`project/ui/gradio_app.py`)
- ✅ **New**: FastAPI REST API (`project/api/main.py`)

### Frontend

- ✅ **Old**: Gradio components with custom CSS
- ✅ **New**: React + TypeScript with Tailwind CSS

### Architecture

```
Old:
┌─────────────────┐
│  Gradio App     │
│  (UI + Logic)   │
└─────────────────┘

New:
┌──────────────┐     ┌──────────────┐
│ React Frontend│────▶│ FastAPI      │
│ (Port 5173)  │     │ (Port 8000)  │
└──────────────┘     └──────────────┘
                            │
                     ┌──────▼──────┐
                     │ RAG System  │
                     │ (Core Logic)│
                     └─────────────┘
```

## How to Run

### Option 1: Run Both (Recommended)

**Terminal 1 - Backend:**

```bash
python start_backend.py
```

**Terminal 2 - Frontend:**

```bash
cd frontend-react
npm install
npm run dev
```

Then open: `http://localhost:5173`

### Option 2: Backend Only (API)

```bash
python start_backend.py
```

Access API docs: `http://localhost:8000/docs`

## New Features

### 1. Document Management

- Upload multiple PDFs/Markdown files
- View document list in sidebar
- Real-time document count

### 2. Chat Sessions

- Multiple chat sessions
- Session history persistence
- Auto-generated titles

### 3. Modern UI

- Responsive design
- Dark theme
- Smooth animations
- Better mobile support

## API Endpoints

### Documents

- `GET /api/documents` - List all documents
- `POST /api/documents/upload` - Upload files
- `DELETE /api/documents` - Clear all documents

### Chat

- `POST /api/chat` - Send message, get response
- `POST /api/chat/stream` - Streaming responses (future)
- `DELETE /api/chat/{session_id}` - Clear session

### Health

- `GET /api/health` - Check API status

## File Structure

```
project/
├── api/
│   ├── __init__.py
│   └── main.py          # FastAPI app
├── core/                # RAG logic (unchanged)
├── ui/                  # Old Gradio UI (kept for reference)
└── app.py              # Old Gradio entry point

frontend-react/
├── components/
│   ├── ChatWindow.tsx
│   ├── MessageBubble.tsx
│   └── Sidebar.tsx
├── App.tsx
├── types.ts
└── package.json

start_backend.py        # Backend launcher
```

## Dependencies

### Backend (Add to requirements.txt)

```
fastapi>=0.104.0
uvicorn[standard]>=0.24.0
python-multipart>=0.0.6
```

### Frontend

```bash
cd frontend-react
npm install
```

## Configuration

### Backend

Edit `project/config.py` (existing configuration)

### Frontend

Edit `frontend-react/.env.local`:

```
VITE_API_URL=http://localhost:8000
```

## Troubleshooting

### CORS Errors

- Make sure backend is running on port 8000
- Check CORS settings in `project/api/main.py`

### Upload Fails

- Check file size limits
- Verify `/tmp` directory permissions
- Check backend logs

### Chat Not Working

- Verify RAG system initialized
- Check backend logs for errors
- Ensure documents are uploaded

## Next Steps

1. ✅ Test document upload
2. ✅ Test chat functionality
3. ⏳ Add streaming responses
4. ⏳ Add authentication
5. ⏳ Deploy to production

## Rollback

If you need to go back to Gradio:

```bash
python project/app.py
```

All original files are preserved in `project/ui/`.
