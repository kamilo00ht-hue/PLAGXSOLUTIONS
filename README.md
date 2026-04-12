# PLAGXSOLUTIONS

## Actualizar ramas de Git

Se agregó el script `scripts/actualizar_ramas.sh` para sincronizar ramas locales de forma rápida.

### Ejemplos

- Actualizar `main` desde `origin`:
  ```bash
  ./scripts/actualizar_ramas.sh
  ```

- Actualizar una rama específica:
  ```bash
  ./scripts/actualizar_ramas.sh --branch work
  ```

- Actualizar todas las ramas con upstream configurado:
  ```bash
  ./scripts/actualizar_ramas.sh --all
  ```

> Si tu repo no tiene remote configurado, agrega uno primero con `git remote add origin <url>`.
