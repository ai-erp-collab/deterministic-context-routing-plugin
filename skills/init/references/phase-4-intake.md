# Phase 4: Raw material and inventories

1. **ASK** which folders hold documentation worth taking in: specs,
   schema or table exports, user documentation, business requirements.
   The user may answer "none".
2. Take the artifacts in per module:
   `python tools/kb/kb.py ingest <path...> --module <module> --kind <kind>`,
   where kind is `tables`, `docs`, `specs`, or `code`. The tool copies
   each file under `source-artifacts/`, records its origin and hash in
   `source-artifacts/registry.json`, and regenerates
   `source-artifacts/INDEX.md`. The originals stay where they are.
3. For each module, run the inventory step of the add-module skill. On a
   large module, one module per session is a good pace; record each
   finished module in this phase's entry before stopping.
