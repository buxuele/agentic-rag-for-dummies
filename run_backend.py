"""
Start the FastAPI backend server for Agentic RAG
"""
import uvicorn
import sys
from pathlib import Path

# Add backend-python to path
sys.path.insert(0, str(Path(__file__).parent / "backend-python"))

if __name__ == "__main__":
    print("🚀 Starting Agentic RAG Backend...")
    print("📍 API will be available at: http://localhost:8000")
    print("📚 API docs at: http://localhost:8000/docs")
    print("\n")
    
    uvicorn.run(
        "api.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
