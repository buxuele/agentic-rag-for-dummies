#!/usr/bin/env python3
"""
Quick fix script for RAG issues
"""
import subprocess
import sys
from pathlib import Path

def run_command(cmd, description):
    print(f"\n{'='*60}")
    print(f"  {description}")
    print(f"{'='*60}")
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✓ {description} - 成功")
            if result.stdout:
                print(result.stdout)
            return True
        else:
            print(f"✗ {description} - 失败")
            if result.stderr:
                print(result.stderr)
            return False
    except Exception as e:
        print(f"✗ {description} - 错误: {e}")
        return False

def main():
    print("=" * 60)
    print("  RAG 系统快速修复")
    print("=" * 60)
    
    # 1. Apply Chinese UI
    print("\n1. 应用中文界面...")
    if Path("apply_chinese_ui.py").exists():
        run_command(f"{sys.executable} apply_chinese_ui.py", "中文化前端")
    
    # 2. Check RAG system
    print("\n2. 检查 RAG 系统...")
    if Path("debug_rag.py").exists():
        run_command(f"{sys.executable} debug_rag.py", "RAG 系统诊断")
    
    # 3. Test API
    print("\n3. 测试 API（需要后端运行）...")
    if Path("test_api.py").exists():
        run_command(f"{sys.executable} test_api.py", "API 测试")
    
    print("\n" + "=" * 60)
    print("  修复完成！")
    print("=" * 60)
    print("\n下一步:")
    print("1. 启动后端: python start_backend.py")
    print("2. 启动前端: cd frontend-react && npm run dev")
    print("3. 上传文档并测试聊天")
    print("\n详细说明请查看: FIX_RAG_ISSUES.md")

if __name__ == "__main__":
    main()
