#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Uso: actualizar_ramas.sh [--remote ORIGIN] [--branch MAIN] [--all]

Opciones:
  --remote <nombre>   Remote a sincronizar (default: origin)
  --branch <nombre>   Rama base a actualizar (default: main)
  --all               Actualiza todas las ramas locales con seguimiento remoto
  -h, --help          Muestra esta ayuda

Notas:
- Requiere que el repositorio tenga remotes configurados.
- Si no existe el remote o la rama base, el script termina con error.
USAGE
}

REMOTE="origin"
BASE_BRANCH="main"
UPDATE_ALL=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --remote)
      REMOTE="${2:-}"
      shift 2
      ;;
    --branch)
      BASE_BRANCH="${2:-}"
      shift 2
      ;;
    --all)
      UPDATE_ALL=true
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Opción no reconocida: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: ejecuta este script dentro de un repositorio Git." >&2
  exit 1
fi

if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  echo "Error: no existe el remote '$REMOTE'." >&2
  echo "Remotes disponibles:" >&2
  git remote -v >&2 || true
  exit 1
fi

echo "Sincronizando referencias desde '$REMOTE'..."
git fetch "$REMOTE" --prune

if [[ "$UPDATE_ALL" == true ]]; then
  echo "Actualizando todas las ramas locales con upstream configurado..."
  while IFS= read -r branch; do
    upstream=$(git for-each-ref --format='%(upstream:short)' "refs/heads/$branch")
    if [[ -z "$upstream" ]]; then
      echo "- $branch: sin upstream, se omite"
      continue
    fi

    echo "- $branch <= $upstream"
    git checkout "$branch" >/dev/null 2>&1
    git merge --ff-only "$upstream"
  done < <(git for-each-ref --format='%(refname:short)' refs/heads)

  echo "Ramas actualizadas con merge fast-forward cuando fue posible."
else
  if git show-ref --verify --quiet "refs/heads/$BASE_BRANCH"; then
    git checkout "$BASE_BRANCH" >/dev/null 2>&1
  elif git show-ref --verify --quiet "refs/remotes/$REMOTE/$BASE_BRANCH"; then
    git checkout -B "$BASE_BRANCH" "$REMOTE/$BASE_BRANCH" >/dev/null 2>&1
  else
    echo "Error: no existe la rama '$BASE_BRANCH' ni '$REMOTE/$BASE_BRANCH'." >&2
    exit 1
  fi

  echo "Actualizando '$BASE_BRANCH' con '$REMOTE/$BASE_BRANCH'..."
  git merge --ff-only "$REMOTE/$BASE_BRANCH"
fi

echo "Listo. Estado actual:"
git status -sb
