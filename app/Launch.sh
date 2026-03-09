#!/bin/bash
set -e

echo "🚀 Lanzando Universal Android Recovery Engine..."

# 1. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# 2. Cargar variables de entorno
if [ -f ".env" ]; then
  echo "🔑 Cargando variables desde .env..."
  export $(grep -v '^#' .env | xargs)
fi

# 3. Limpiar compilaciones previas
echo "🧹 Limpiando compilaciones anteriores..."
npm run clean || true

# 4. Compilar para producción
echo "⚙️ Compilando proyecto..."
npm run build

# 5. Arrancar servidor local en segundo plano
echo "🌐 Iniciando servidor local en puerto ${PORT:-3000}..."
npm run preview -- --port=${PORT:-3000} &

# 6. Desplegar en Firebase Hosting
if command -v firebase >/dev/null 2>&1; then
  echo "☁️ Desplegando en Firebase Hosting..."
  firebase deploy
else
  echo "⚠️ Firebase CLI no está instalado. Instálalo con: npm install -g firebase-tools"
fi

echo "✅ Despegue completado."
