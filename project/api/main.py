from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
import asyncio
import json
from pathlib import Path
import sys

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from core.chat_interface import ChatInterface
from core.document_manager import DocumentManager
from core.rag_system import RAGSystem

app = FastAPI(title="Agentic RAG API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG system
rag_system = RAGSystem()
rag_system.initialize()
doc_manager = DocumentManager(rag_system)
chat_interface = ChatInterface(rag_system)

# Store chat sessions in memory (use Redis/DB in production)
chat_sessions = {}


class ChatMessage(BaseModel):
    role: str
    content: str
    timestamp: Optional[str] = None


class ChatRequest(BaseModel):
    message: str
    session_id: str


class ChatSession(BaseModel):
    id: str
    title: str
    messages: List[ChatMessage]


@app.get("/")
async def root():
    return {"message": "Agentic RAG API", "status": "running"}


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "rag_initialized": True}


@app.get("/api/documents")
async def get_documents():
    """Get list of documents in knowledge base"""
    files = doc_manager.get_markdown_files()
    return {
        "documents": files,
        "count": len(files)
    }


@app.post("/api/documents/upload")
async def upload_documents(files: List[UploadFile] = File(...)):
    """Upload PDF or Markdown documents"""
    if not files:
        raise HTTPException(status_code=400, detail="No files provided")
    
    # Save uploaded files temporarily
    import tempfile
    temp_paths = []
    
    for file in files:
        # Create temp file with proper extension
        suffix = Path(file.filename).suffix
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            content = await file.read()
            tmp.write(content)
            temp_paths.append(tmp.name)
    
    # Add to document manager
    added, skipped = doc_manager.add_documents(temp_paths)
    
    # Cleanup temp files
    for path in temp_paths:
        try:
            Path(path).unlink()
        except:
            pass
    
    return {
        "added": added,
        "skipped": skipped,
        "message": f"Added {added} documents, skipped {skipped} duplicates"
    }


@app.delete("/api/documents")
async def clear_documents():
    """Clear all documents from knowledge base"""
    doc_manager.clear_all()
    return {"message": "All documents cleared"}


@app.post("/api/chat")
async def chat(request: ChatRequest):
    """Send a chat message and get response"""
    session_id = request.session_id
    
    # Get or create session
    if session_id not in chat_sessions:
        chat_sessions[session_id] = []
    
    # Get chat history for this session (format: [[user, bot], ...])
    history = chat_sessions[session_id]
    
    try:
        # Call RAG system with message and history
        response = chat_interface.chat(request.message, history)
        
        # Update session history
        chat_sessions[session_id] = history + [
            [request.message, response]
        ]
        
        return {
            "response": response,
            "session_id": session_id
        }
    except Exception as e:
        print(f"Chat error: {e}")
        import traceback
        traceback.print_exc()
        return {
            "response": f"抱歉，处理您的请求时出现错误：{str(e)}",
            "session_id": session_id
        }


@app.post("/api/chat/stream")
async def chat_stream(request: ChatRequest):
    """Stream chat response (for future streaming support)"""
    async def generate():
        session_id = request.session_id
        
        if session_id not in chat_sessions:
            chat_sessions[session_id] = []
        
        history = chat_sessions[session_id]
        response = chat_interface.chat(request.message, history)
        
        # Simulate streaming by sending chunks
        words = response.split()
        for i, word in enumerate(words):
            chunk = word + (" " if i < len(words) - 1 else "")
            yield f"data: {json.dumps({'chunk': chunk})}\n\n"
            await asyncio.sleep(0.05)
        
        # Update history
        chat_sessions[session_id] = history + [[request.message, response]]
        
        yield f"data: {json.dumps({'done': True})}\n\n"
    
    return StreamingResponse(generate(), media_type="text/event-stream")


@app.delete("/api/chat/{session_id}")
async def clear_session(session_id: str):
    """Clear a specific chat session"""
    if session_id in chat_sessions:
        del chat_sessions[session_id]
    chat_interface.clear_session()
    return {"message": f"Session {session_id} cleared"}


@app.get("/api/sessions")
async def get_sessions():
    """Get all chat sessions"""
    sessions = []
    for session_id, history in chat_sessions.items():
        if history:
            title = history[0][0][:50] if history[0][0] else "New Chat"
            sessions.append({
                "id": session_id,
                "title": title,
                "message_count": len(history)
            })
    return {"sessions": sessions}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
