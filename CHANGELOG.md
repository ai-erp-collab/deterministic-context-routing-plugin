# Changelog

## 0.1.3 - 2026-10-14

- `check`: the skill description no longer contains `#`, which YAML read
  as the start of a comment and cut the description in half.

## 0.1.2 - 2026-10-10

- Plugin icon (`.claude-plugin/icon.png`) for the plugin directory listing.

## 0.1.1 - 2026-10-10

- `curate`: new page type `pattern` (`patterns/<name>.md`), so the
  `patterns/` slot in module indexes can be filled.
- `close-session`: the root log entry now has an explicit dated shape,
  matching the entries `init` writes.
- `cross-module-owner-api`: owner-change steps numbered 4.1-4.3 under one
  section 4.

## 0.1.0 - 2026-10-10

- First release: skills `init`, `add-module`, `curate`, `close-session`,
  `cross-module-owner-api`, `check`.
- Aligned with methodology v0.6.0-draft.
