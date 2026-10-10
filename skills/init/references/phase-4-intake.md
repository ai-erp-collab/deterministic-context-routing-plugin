# Phase 4: Raw material and inventories

1. **ASK** which folders hold documentation worth taking in: specs,
   schema or table exports, user documentation, business requirements.
   The user may answer "none".
2. Copy (never move) each artifact into
   `source-artifacts/<kind>/raw/<module>/`, where kind is `tables`,
   `docs`, or `specs`.
3. Add one row per artifact to `source-artifacts/INDEX.md`: path, status
   `raw`, curated pages `none`, notes naming the module.
4. For each module, run the inventory step of the add-module skill. On a
   large module, one module per session is a good pace; record each
   finished module in this phase's entry before stopping.
