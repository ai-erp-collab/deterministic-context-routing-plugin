---
name: add-module
description: Use when the user asks to add, register, or create a module in an existing context-routing workspace, for example "add module billing with sources in src/billing". Registers it in modules.md, creates its folders and session log, and writes its inventory. Not for first-time setup (use init) and not for writing curated pages (use curate).
---

# Add Module

Inputs: a short lowercase module name, a one-line purpose, the source
paths it covers, and aliases. **ASK** for anything missing; propose aliases
from the name and purpose and let the user confirm.

## Steps

1. Read `modules.md`. If the name or any alias is already registered, stop
   and report the clash.
2. Append the module to `modules.md`:

   ```
   - <module>
     - path: `modules/<module>/`
     - wiki: `knowledge-base/modules/<module>/`
     - shared wiki: `knowledge-base/shared/`
     - sources: `<source path>`, `<source path>`
     - artifacts: `source-artifacts/`
     - aliases: <alias>, <alias>
   ```

3. Copy `assets/module/` (in this skill's folder) to `modules/<module>/`
   and `assets/wiki/` to `knowledge-base/modules/<module>/`. In the copied
   files replace `ExampleModule` and `example-module` with the module
   name. Write the purpose into the module `idea.md`.
4. In `modules/<module>/session_state.md`, replace the template entry with
   a first entry: module registered, sources listed, next action
   "inventory". End it with `<!-- AGENT-SESSION-STOP -->`.
5. Inventory. Read in full every raw artifact listed for this module in
   `source-artifacts/INDEX.md`, and the module's source paths. Write
   `knowledge-base/modules/<module>/inventory.md`: one line per named
   item (table, field group, function, class, flag, constant, naming
   rule, constraint) with the file it came from. Do not rank or skip
   anything; curation later selects from this list, and an item missing
   here is easy to lose for good. If the sources are too large for one
   session, **ASK** whether to split, and record which files are done in
   the module session log. Add `inventory.md` to the module `INDEX.md`.

Finish with the close-session skill for this module.
