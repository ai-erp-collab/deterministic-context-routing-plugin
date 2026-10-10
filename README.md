# context-routing

Give your coding agent exactly the context it needs in a large codebase,
and let it keep its thread across sessions.

```
/plugin marketplace add ai-erp-collab/deterministic-context-routing-plugin
/plugin install context-routing@deterministic-context-routing
```

`context-routing` turns a repository into a plain-Markdown workspace with a
fixed reading order: a short rules file, a module registry, curated
knowledge pages per module, and a newest-first session log. After setup the
workspace keeps working without the plugin for any agent that reads
`AGENTS.md`.

## Proven on

Large proprietary ERP. Evidence, experiments, and reasoning live in the
[Deterministic Context Routing methodology](https://github.com/ai-erp-collab/deterministic-context-routing).

## License

Plugin: MIT, use freely. Methodology text: BSL 1.1, see
[the methodology repository](https://github.com/ai-erp-collab/deterministic-context-routing).
