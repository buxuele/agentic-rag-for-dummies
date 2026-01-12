#!/usr/bin/env python3
"""
Quick test script for the FastAPI backend
"""
import requests
import json

API_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    print("Testing /api/health...")
    response = requests.get(f"{API_URL}/api/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_documents():
    """Test documents endpoint"""
    print("Testing /api/documents...")
    response = requests.get(f"{API_URL}/api/documents")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Documents: {data['count']}")
    if data['documents']:
        print(f"Files: {data['documents'][:5]}")  # Show first 5
    print()

def test_chat():
    """Test chat endpoint"""
    print("Testing /api/chat...")
    payload = {
        "message": "Hello, what can you tell me about the documents?",
        "session_id": "test_session"
    }
    response = requests.post(f"{API_URL}/api/chat", json=payload)
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Response: {data['response'][:200]}...")  # Show first 200 chars
    print()

if __name__ == "__main__":
    print("=" * 50)
    print("  Agentic RAG API Test")
    print("=" * 50)
    print()
    
    try:
        test_health()
        test_documents()
        test_chat()
        
        print("✅ All tests passed!")
    except requests.exceptions.ConnectionError:
        print("❌ Error: Cannot connect to API")
        print("   Make sure the backend is running:")
        print("   python start_backend.py")
    except Exception as e:
        print(f"❌ Error: {e}")
