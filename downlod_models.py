import os
from huggingface_hub import login, snapshot_download
from sentence_transformers import SentenceTransformer

# 从环境变量读取 Hugging Face token
# 设置方法: export HF_TOKEN=your_token_here (Linux/Mac)
#          set HF_TOKEN=your_token_here (Windows)
HF_TOKEN = os.getenv("HF_TOKEN", "")

if not HF_TOKEN:
    print("⚠️  警告: 未设置 HF_TOKEN 环境变量")
    print("请从 https://huggingface.co/settings/tokens 获取 token")
    print("然后设置环境变量: export HF_TOKEN=your_token_here")
    exit(1)

def download_model_with_token():

    # 1. 登录Hugging Face（处理认证）
    login(token=HF_TOKEN)
    print("✅ 已登录Hugging Face")

    # 2. 指定模型名称
    model_name = "sentence-transformers/all-mpnet-base-v2"

    # 3. 使用snapshot_download完整下载模型（绕过transformers自动下载的SSL问题）
    print("🔄 开始下载模型...")
    local_path = snapshot_download(
        repo_id=model_name,
        token=HF_TOKEN,
        local_dir="./models/all-mpnet-base-v2",  # 保存到本地目录
        local_dir_use_symlinks=False,  # 避免符号链接问题
        resume_download=True  # 支持断点续传
    )
    print(f"✅ 模型下载完成，路径: {local_path}")

    # 4. 测试加载模型
    print("🧪 测试加载模型...")
    model = SentenceTransformer(local_path)
    print("✅ 模型加载成功！")

    # 可选：保存到自定义位置
    model.save("./models/my_all-mpnet-v2")
    print("✅ 模型已保存到 ./models/my_all-mpnet-v2")

if __name__ == "__main__":
    # 设置缓存目录（可选，避免权限问题）
    os.environ["HF_HOME"] = "./hf_cache"
    os.makedirs("./models", exist_ok=True)
    os.makedirs("./hf_cache", exist_ok=True)

    download_model_with_token()
