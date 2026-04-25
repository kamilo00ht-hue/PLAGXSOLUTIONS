# Estrategia de Conventional Commits — PLAGXSOLUTIONS

## Objetivo
Mantener un historial Git profesional, auditable y entendible para el instructor SENA y para el equipo técnico.

## Formato estándar
```text
tipo(scope opcional): descripción corta en imperativo

[cuerpo opcional]
[footer opcional]
```

## Tipos recomendados
- `feat`: nueva funcionalidad de negocio.
- `fix`: corrección de error.
- `refactor`: mejora interna sin cambiar comportamiento externo.
- `docs`: cambios de documentación/evidencias.
- `test`: pruebas automatizadas.
- `chore`: tareas de mantenimiento (scripts, dependencias).

## Scopes sugeridos
- `auth`
- `reports`
- `users`
- `database`
- `docs`
- `frontend`

## Ejemplos para este proyecto
- `feat(reports): asignar autor del reporte usando usuario autenticado por JWT`
- `fix(auth): normalizar correo en login y registro`
- `refactor(reports): separar tipo ReportAuthor en entidad de reporte`
- `docs(ga8): agregar documento técnico de integración de módulos`
- `test(reports): validar creación de reporte con token válido`

## Reglas de calidad
1. Un commit = un objetivo técnico claro.
2. Mensaje máximo 72 caracteres en el título cuando sea posible.
3. Si un cambio rompe compatibilidad, usar `!`:
   - `feat(api)!: cambiar estructura de respuesta de reportes`
4. Relacionar evidencia académica en el cuerpo cuando aplique.

## Propuesta de ramas
- `main`: estable.
- `develop`: integración.
- `feature/<modulo>-<objetivo>`: desarrollo funcional.
- `hotfix/<incidente>`: correcciones urgentes.
