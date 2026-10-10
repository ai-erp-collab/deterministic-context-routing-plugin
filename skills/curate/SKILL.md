---
name: curate
description: Use when the user asks, in a named module, to write or update a knowledge-base page (concept, table, contract, or usage flow) from a raw artifact, a schema or table export, or code, for example "write a contract page for X", or to mark an artifact processed. Not for answering questions from existing pages or registering modules.
---

# Curate

## Before writing

1. Resolve the module in `modules.md`. Read its `AGENTS.md`, its
   knowledge-base `INDEX.md`, and its `inventory.md`.
2. Choose the page type and template from `templates/wiki/` in the
   workspace:
   - table: a schema, export, or data structure → `tables/<name>.md`;
   - contract: a function, class, or API that others call →
     `contracts/<name>.md`;
   - usage flow: a user or system flow across steps → `usage/<name>.md`;
   - concept: the module's purpose, boundaries, and terms → `concept.md`.
     If the module has no `concept.md` yet, write it first.
3. If a page for the same subject exists, update it instead of creating a
   second one. Facts that serve several modules go to
   `knowledge-base/shared/`.

## Writing

4. Write the page under `knowledge-base/modules/<module>/`. Every
   non-obvious claim ends with a confidence label:
   - `confirmed`: seen in code, data, or a document you read;
   - `inferred`: concluded from evidence, not stated anywhere;
   - `runtime-unverified`: depends on behavior you could not run;
   - `blocked-by-access`: the evidence exists but you cannot reach it.
   Set the page-level `confidence:` to the weakest label on the page.
5. Never edit source code while curating.

## After writing

6. In `inventory.md`, end each line the page now covers with
   `-> <page path>`, or with `excluded: <reason>` when it deliberately
   stays out.
7. Add or update one line for the page in the module `INDEX.md`: path and
   the question the page answers.
8. If the source was a raw artifact, move it from its `raw/` folder to the
   matching `processed/` folder and update its row in
   `source-artifacts/INDEX.md`: status `processed`, curated page linked.
   Do this only after the page is written.

Finish with the close-session skill.
