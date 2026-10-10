# context-routing

Give your coding agent exactly the context it needs in a large codebase,
and let it keep its thread across sessions.

```
/plugin marketplace add ai-erp-collab/deterministic-context-routing-plugin
/plugin install context-routing@deterministic-context-routing
```

![Context routing compared with a flat-memory setup on the same tasks](assets/demo.gif)

The demo compares context routing with a flat-memory setup on the same six
tasks: about 30% lower total cost. This is a self-run case study; method,
raw numbers, and limitations are in
[Evidence/02](https://github.com/ai-erp-collab/deterministic-context-routing/blob/main/Evidence/02-context-mechanism-vs-flat-memory-pattern.md).

`context-routing` turns a repository into a plain-Markdown workspace with a
fixed reading order: a short rules file, a module registry, curated
knowledge pages per module, and a newest-first session log. After setup the
workspace keeps working without the plugin for any agent that reads
`AGENTS.md`.

## Skills

| Skill | Use it to |
|---|---|
| `/context-routing:init` | set up the workspace in phases; safe to stop and resume |
| `/context-routing:add-module` | register a module, create its folders and log, inventory its sources |
| `/context-routing:curate` | turn an artifact or code into a concept, table, contract, or usage-flow page with confidence labels |
| `/context-routing:close-session` | record what was done and the one next action; capture recurring traps |
| `/context-routing:cross-module-owner-api` | reuse a rule owned by another module through its API instead of copying it |
| `/context-routing:check` | report workspace defects to `docs/checks/`; fixes only the issues you name |

Skills also fire on their own when your request matches them.

## Numbers

What the plugin and its workspace add to every session, measured as input
tokens with Claude Code on a workspace set up by `init`:

Measured 2026-10-10 with 2.1.158 (Claude Code)

| Always-loaded component | Tokens |
|---|---|
| Skill descriptions (6 skills) | 443 |
| Workspace `AGENTS.md` (loaded via `CLAUDE.md`) | 1015 |
| `known_issues.md` (read before non-trivial tasks) | 428 |
| **Total** | 1886 |

Two runs agreed within 1%. Besides the case study linked under the demo,
these are the only numbers claimed here. No benchmarks.

## What it runs, sends, and fetches

The skills are Markdown instructions. They read and write files in your
repository only. The plugin has no hooks, no MCP servers, no scripts, and
makes no network calls.

## Proven on

Large proprietary ERP. Evidence, experiments, and reasoning live in the
[Deterministic Context Routing methodology](https://github.com/ai-erp-collab/deterministic-context-routing).

## License

Plugin: MIT, use freely. Methodology text: BSL 1.1, see
[the methodology repository](https://github.com/ai-erp-collab/deterministic-context-routing).
