#!/usr/bin/env bash
# Sube los cambios de esta carpeta a GitHub.
#
#   bash publicar.sh                    (mensaje de commit automático)
#   bash publicar.sh "arreglé la rúbrica"
#
# El repositorio ya existe y es público:
#   https://github.com/Giocrisrai/taller-ia-agentes-biblioteca
#
# Ejecútalo desde TU terminal: el sandbox de Claude no puede crear .git aquí.

set -euo pipefail

DUENO="Giocrisrai"
REPO="taller-ia-agentes-biblioteca"
MENSAJE="${1:-Actualiza el material del taller}"

cd "$(dirname "$0")"

# docente/ y _build/ no se publican: contienen la pauta de soluciones y el
# repositorio es público.
for d in docente/ _build/; do grep -qx "$d" .gitignore 2>/dev/null || printf '%s\n' "$d" >> .gitignore; done

# ── Enlazar la carpeta con el repositorio, la primera vez ────────────────────
if [ ! -d .git ]; then
  echo "▶ Primera vez: enlazando esta carpeta con el repositorio..."
  git init -b main -q
  git remote add origin "git@github.com:$DUENO/$REPO.git"
  git fetch -q origin main
  # Deja el índice igual al remoto sin tocar tus archivos: así el primer commit
  # es solo lo que hayas cambiado, y no un historial paralelo.
  git reset -q origin/main
  git branch -q --set-upstream-to=origin/main main 2>/dev/null || true
  echo "  ✅ enlazado"
fi

# ── Subir ────────────────────────────────────────────────────────────────────
git add -A
if git diff --cached --quiet; then
  echo "▶ No hay cambios que subir."
else
  echo "▶ Subiendo cambios..."
  git commit -q -m "$MENSAJE

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
  git push -q origin main
  echo "  ✅ $(git diff --name-only HEAD~1 HEAD 2>/dev/null | wc -l | tr -d ' ') archivo(s) actualizados"
fi

BASE="https://colab.research.google.com/github/$DUENO/$REPO/blob/main"
echo
echo "════════════════════════════════════════════════════════════════════════"
echo "  Repositorio  https://github.com/$DUENO/$REPO"
echo
echo "  Taller 1  $BASE/notebooks/01_Taller_Practico_1.ipynb"
echo "  Taller 2  $BASE/notebooks/02_Taller_Practico_2.ipynb"
echo "════════════════════════════════════════════════════════════════════════"
