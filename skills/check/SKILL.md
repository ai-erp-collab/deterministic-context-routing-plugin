---
name: check
description: Use when the user asks for a workspace health check, audit, or check report, or asks to fix numbered issues from that report, for example "fix #3". Finds broken registry paths, index gaps, missing session stop markers, and missing confidence labels. Reports only; changes nothing the user did not name.
---

# Check

## Checks

1. Registry: every `path`, `wiki`, and `sources` entry in `modules.md`
   exists. A missing one is **blocking**: routing would hand the agent the
   wrong context for that module.
2. Indexes: in each `knowledge-base/**/INDEX.md`, every linked file
   exists, and every page in that folder and its subfolders is listed.
   **minor**.
3. Session logs: every `modules/*/session_state.md` on disk has the line
   `<!-- AGENT-SESSION-STOP -->` after its first entry. **minor**.
4. Confidence: every page under `knowledge-base/modules/*/` except
   `INDEX.md` and `inventory.md` has a `confidence:` line. **minor**.

## Run

5. Read `docs/checks/OPEN.md` if it exists. Then write the dated report
   and rewrite `OPEN.md` as described in `references/report-format.md`.
   Read that file before writing either.
6. Update the pointer in `known_issues.md` under `## Workspace Health`,
   using exactly this shape:

   ```
   - Workspace health: 7 open issues (2 blocking: module `billing`).
     Before work in a listed module, warn the user. To review or fix:
     read docs/checks/OPEN.md.
   ```

   With no blocking issue, write `(0 blocking)`. When nothing is open,
   remove the bullet and its heading.
7. Change nothing else. List the open issues to the user by id.

## Fix

8. Only when the user names ids ("fix #3, #5"): apply the proposed fix
   of each named issue, nothing more, then run the checks again so the
   report, `OPEN.md`, and the pointer reflect the result.
