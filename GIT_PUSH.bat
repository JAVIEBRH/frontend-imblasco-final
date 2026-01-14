@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo 🔄 Configurando repositorio Git del Frontend...
echo.
git init
git add .
git commit -m "Initial commit: ImBlasco Frontend - Clon del sitio web con Chat B2B integrado"
git branch -M main
git remote add origin git@github.com:JAVIEBRH/IMBLASCOASISTENTEFRONTEND.git
echo.
echo 📤 Subiendo a GitHub...
git push -u origin main
echo.
echo ✅ ¡Frontend subido exitosamente!
pause
