@echo off
echo ===================================================
echo   Iniciando Servidor Local para D&D 3.5 App
echo ===================================================
echo.
echo Abre tu navegador y ve a la siguiente direccion:
echo http://localhost:8000
echo.
echo Presiona Ctrl+C para detener el servidor.
echo.
python -m http.server 8000
pause
