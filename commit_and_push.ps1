# Script para hacer commit y push del frontend
$ErrorActionPreference = "Stop"

$repoPath = $PSScriptRoot
Set-Location $repoPath

Write-Host "📍 Directorio: $repoPath" -ForegroundColor Cyan

# Verificar si existe .git
if (-not (Test-Path ".git")) {
    Write-Host "🔧 Inicializando repositorio git..." -ForegroundColor Yellow
    git init
}

# Configurar branch main
Write-Host "🌿 Configurando branch main..." -ForegroundColor Yellow
git branch -M main

# Agregar remote (usando HTTPS)
Write-Host "🔗 Configurando remote..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/JAVIEBRH/IMBLASCOASISTENTEFRONTEND.git

# Agregar todos los archivos
Write-Host "📦 Agregando archivos..." -ForegroundColor Yellow
git add .

# Verificar si hay cambios
$status = git status --porcelain
if ($status) {
    Write-Host "💾 Creando commit..." -ForegroundColor Yellow
    git commit -m "Initial commit: ImBlasco Frontend - Clon del sitio web con Chat B2B integrado"
    
    Write-Host "📤 Haciendo push a GitHub..." -ForegroundColor Yellow
    git push -u origin main
    
    Write-Host "✅ ¡Frontend subido exitosamente!" -ForegroundColor Green
} else {
    Write-Host "ℹ️  No hay cambios para commitear." -ForegroundColor Blue
    
    # Verificar si hay commits locales sin push
    $localCommits = git rev-list --count origin/main..HEAD 2>$null
    if ($localCommits -gt 0) {
        Write-Host "📤 Hay $localCommits commit(s) local(es) sin push. Haciendo push..." -ForegroundColor Yellow
        git push -u origin main
        Write-Host "✅ ¡Push completado!" -ForegroundColor Green
    } else {
        Write-Host "✅ Todo está sincronizado." -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "📊 Estado del repositorio:" -ForegroundColor Cyan
git log --oneline -5 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  No hay commits aún." -ForegroundColor Yellow
}
