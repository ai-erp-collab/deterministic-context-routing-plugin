# Report and OPEN.md format

## Issue identity

An issue's key is `check number + file + subject` (for example
`1 | modules.md | frontend path`). Ids are integers. An issue already in
`OPEN.md` with the same key keeps its id, so "#3" means the same defect
across runs. A new issue takes the `next-id` value from `OPEN.md`
(start at 1), and `next-id` goes up by one. Ids are never reused.

One defect is one issue: each missing registry entry (`frontend path`,
`frontend wiki`), each broken or missing index line, each session log,
and each unlabeled page gets its own row, even when one typo causes
several of them.

## Dated report

Path: `docs/checks/YYYY-MM-DD-check.md`. If that file exists, use
`-2`, `-3`, and so on. Never overwrite a report. Content:

```
# Workspace check YYYY-MM-DD

## Open
| id | severity | module | symptom | proposed fix |

## Resolved since last run
| id | symptom |
```

Write "none" under a heading with no rows.

## OPEN.md

Path: `docs/checks/OPEN.md`. Rewrite it fully on every run:

```
# Open workspace issues

next-id: <n>

| id | severity | module | symptom | proposed fix | report |
|---|---|---|---|---|---|
| 3 | blocking | frontend | modules.md path `modules/frontnd/` does not exist | change it to `modules/frontend/` | 2026-10-10-check.md |
```

When nothing is open, replace the table with the line `No open issues.`
and keep the `next-id` line.
