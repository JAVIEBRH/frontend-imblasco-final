@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo ========================================
echo SUBIENDO FRONTEND A GITHUB
echo ========================================
echo.

if not exist .git (
    echo Inicializando repositorio git...
    git init
)

echo Configurando branch main...
git branch -M main

echo Configurando remote...
git remote remove origin 2>nul
git remote add origin https://github.com/JAVIEBRH/IMBLASCOASISTENTEFRONTEND.git

echo Agregando archivos...
git add .

echo Creando commit...
git commit -m "Initial commit: ImBlasco Frontend - Clon del sitio web con Chat B2B integrado"

echo Subiendo a GitHub...
git push -u origin main

echo.
echo ========================================
echo COMPLETADO
echo ========================================
echo.
pause
