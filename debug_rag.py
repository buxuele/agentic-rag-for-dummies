#!/usr/bin/env python3
"""
Debug script to check RAG system status
"""
import sys
from pathlib import Path

# Add project to path
sys.path.insert(0, str(Path(__file__).parent / "project"))

from core.rag_system import RAGSystem
from core.document_manager import DocumentManager
import config

def check_rag_system():
    print("=" * 60)
    print("RAG System Debug")
    print("=" * 60)
    
    # Initialize RAG system
    print("\n1. Initializing RAG system...")
    rag_system = RAGSystem()
    rag_system.initialize()
    print("✓ RAG system initialized")
    
    # Check documents
    print("\n2. Checking documents...")
    doc_manager = DocumentManager(rag_system)
    files = doc_manager.get_markdown_files()
    print(f"✓ Found {len(files)} documents:")
    for f in files[:10]:  # Show first 10
        print(f"  - {f}")
    
    # Check vector database
    print("\n3. Checking vector database...")
    collection = rag_system.vector_db.get_collection(config.CHILD_COLLECTION)
    
    # Try a test search
    print("\n4. Testing search...")
    test_query = "javascript"
    print(f"Query: '{test_query}'")
    
    try:
        results = collection.similarity_search(test_query, k=3)
        print(f"✓ Found {len(results)} results:")
        for i, doc in enumerate(results, 1):
            print(f"\n  Result {i}:")
            print(f"  Source: {doc.metadata.get('source', 'unknown')}")
            print(f"  Parent ID: {doc.metadata.get('parent_id', 'unknown')}")
            print(f"  Content preview: {doc.page_content[:200]}...")
    except Exception as e:
        print(f"✗ Search failed: {e}")
    
    # Check parent store
    print("\n5. Checking parent store...")
    parent_store_path = Path(config.PARENT_STORE_PATH)
    if parent_store_path.exists():
        parent_files = list(parent_store_path.glob("*.json"))
        print(f"✓ Found {len(parent_files)} parent chunks")
    else:
        print("✗ Parent store directory not found")
    
    print("\n" + "=" * 60)
    print("Debug complete!")
    print("=" * 60)

if __name__ == "__main__":
    try:
        check_rag_system()
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
