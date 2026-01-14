# Script para hacer commit y push del frontend usando SSH
$ErrorActionPreference = "Stop"

$repoPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repoPath

Write-Host "📍 Directorio: $repoPath" -ForegroundColor Cyan
Write-Host ""

# Verificar si existe .git
if (-not (Test-Path ".git")) {
    Write-Host "🔧 Inicializando repositorio git..." -ForegroundColor Yellow
    git init
}

# Configurar branch main
Write-Host "🌿 Configurando branch main..." -ForegroundColor Yellow
git branch -M main

# Agregar remote SSH
Write-Host "🔗 Configurando remote SSH..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin git@github.com:JAVIEBRH/IMBLASCOASISTENTEFRONTEND.git
git remote -v

# Agregar todos los archivos
Write-Host "📦 Agregando archivos..." -ForegroundColor Yellow
git add .

# Verificar cambios
Write-Host "📋 Verificando cambios..." -ForegroundColor Yellow
$status = git status --porcelain
if ($status) {
    Write-Host "Archivos modificados/agregados:" -ForegroundColor Cyan
    git status --short
    Write-Host ""
    
    Write-Host "💾 Creando commit..." -ForegroundColor Yellow
    git commit -m "Initial commit: ImBlasco Frontend - Clon del sitio web con Chat B2B integrado"
    
    Write-Host "📤 Haciendo push a GitHub (SSH)..." -ForegroundColor Yellow
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ ¡Frontend subido exitosamente!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Error al hacer push. Verifica tu configuración SSH." -ForegroundColor Red
    }
} else {
    Write-Host "ℹ️  No hay cambios para commitear." -ForegroundColor Blue
    
    # Verificar si hay commits locales sin push
    $remoteExists = git ls-remote --heads origin main 2>$null
    if ($LASTEXITCODE -eq 0) {
        $localCommits = git rev-list --count origin/main..HEAD 2>$null
        if ($localCommits -gt 0) {
            Write-Host "📤 Hay $localCommits commit(s) local(es) sin push. Haciendo push..." -ForegroundColor Yellow
            git push -u origin main
            Write-Host "✅ ¡Push completado!" -ForegroundColor Green
        } else {
            Write-Host "✅ Todo está sincronizado." -ForegroundColor Green
        }
    } else {
        Write-Host "⚠️  El repositorio remoto parece no existir o no estar accesible." -ForegroundColor Yellow
        Write-Host "   Crea el repositorio en GitHub primero o verifica tu conexión SSH." -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "📊 Últimos commits:" -ForegroundColor Cyan
git log --oneline -5 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  No hay commits aún." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Presiona Enter para continuar"
