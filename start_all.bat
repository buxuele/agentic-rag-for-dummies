@echo off
echo ========================================
echo   Agentic RAG - FastAPI + React
echo ========================================
echo.

echo Starting Backend (FastAPI)...
start "Backend" cmd /k "python start_backend.py"

timeout /t 3 /nobreak >nul

echo Starting Frontend (React)...
start "Frontend" cmd /k "cd frontend-react && npm run dev"

echo.
echo ========================================
echo   Both servers are starting!
echo ========================================
echo   Backend:  http://localhost:8000
echo   Frontend: http://localhost:5173
echo   API Docs: http://localhost:8000/docs
echo ========================================
echo.
echo Press any key to stop all servers...
pause >nul

taskkill /FI "WindowTitle eq Backend*" /T /F
taskkill /FI "WindowTitle eq Frontend*" /T /F
