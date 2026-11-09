/**
 * context-routing plugin for OpenCode. Registers this plugin's skills/ folder.
 *
 * V1 (OpenCode 1.x): the named export ContextRoutingPlugin adds the folder to
 * config.skills.paths through the config hook.
 * V2 (OpenCode 2.x): default export { id, setup }; setup() adds each
 * skills/<name>/SKILL.md through ctx.skill.transform().
 *
 * No bootstrap injection: the workspace's AGENTS.md carries the routing rules.
 * No hooks: on OpenCode the integrity checks run through the `check` skill.
 * Zero dependencies. The V1/V2 dual-export pattern follows the obra/superpowers
 * OpenCode plugin (MIT).
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillsDir = path.resolve(__dirname, '../../skills');

// Flat `key: value` frontmatter only; this plugin's SKILL.md files use no other form.
const parseSkill = (text) => {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { fm: {}, body: text };
  const fm = {};
  for (const raw of match[1].split('\n')) {
    const line = raw.replace(/\r$/, '');
    const i = line.indexOf(':');
    if (i > 0 && !/^\s/.test(line)) {
      fm[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^(["'])([\s\S]*)\1$/, '$2');
    }
  }
  return { fm, body: match[2] };
};

export const ContextRoutingPlugin = async () => ({
  config: async (config) => {
    if (Array.isArray(config.skills)) return; // V2 shape: setup() registers the skills
    config.skills = config.skills || {};
    config.skills.paths = config.skills.paths || [];
    if (!config.skills.paths.includes(skillsDir)) config.skills.paths.push(skillsDir);
  },
});

async function setup(ctx) {
  if (!ctx || !ctx.skill || typeof ctx.skill.transform !== 'function') return; // V1 host
  try {
    const skills = [];
    for (const entry of fs.readdirSync(skillsDir, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
      const file = path.join(skillsDir, entry.name, 'SKILL.md');
      if (!fs.existsSync(file)) continue;
      const { fm, body } = parseSkill(fs.readFileSync(file, 'utf8'));
      skills.push({
        id: entry.name,
        name: fm.name || entry.name,
        ...(fm.description ? { description: fm.description } : {}),
        path: file,
        content: body,
      });
    }
    await ctx.skill.transform((draft) => {
      for (const skill of skills) {
        try {
          draft.add(skill);
        } catch (err) {
          console.error(`[context-routing] skill "${skill.id}" rejected by host, skipping:`, err);
        }
      }
    });
  } catch (err) {
    console.error('[context-routing] skill registration failed:', err);
  }
}

export default {
  id: 'context-routing',
  server: ContextRoutingPlugin,
  setup,
};
