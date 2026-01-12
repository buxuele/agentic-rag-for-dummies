# Agentic RAG Frontend

React + TypeScript frontend for the Agentic RAG system.

## Features

- 💬 Chat interface with RAG-powered responses
- 📄 Document upload (PDF, Markdown)
- 📚 Knowledge base management
- 🎨 Modern dark theme UI
- 💾 Local session persistence

## Prerequisites

- Node.js (v18+)
- Backend API running on port 8000

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the backend** (in another terminal):

   ```bash
   cd ..
   python start_backend.py
   ```

3. **Start the frontend:**

   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to `http://localhost:5173`

## Configuration

Edit `.env.local` to change the API URL:

```
VITE_API_URL=http://localhost:8000
```

## Project Structure

```
frontend-react/
├── components/
│   ├── ChatWindow.tsx    # Main chat interface
│   ├── MessageBubble.tsx # Message display
│   └── Sidebar.tsx       # Navigation & documents
├── App.tsx               # Main app component
├── types.ts              # TypeScript types
└── index.html            # Entry point
```

## API Integration

The frontend connects to these backend endpoints:

- `GET /api/documents` - List documents
- `POST /api/documents/upload` - Upload documents
- `POST /api/chat` - Send chat messages
- `DELETE /api/documents` - Clear documents

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.
