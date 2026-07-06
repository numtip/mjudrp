import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const NOW = new Date().toISOString();
const SESSION_ID = `SESSION-${Date.now()}`;

function getGitInfo() {
  try {
    const hash = execSync("git rev-parse --short HEAD", { cwd: ROOT, encoding: "utf-8" }).trim();
    const branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd: ROOT, encoding: "utf-8" }).trim();
    return { hash, branch };
  } catch {
    return { hash: "none", branch: "main" };
  }
}

function fileExists(p) {
  return existsSync(p);
}

function readFile(p) {
  try {
    return readFileSync(p, "utf-8");
  } catch {
    return null;
  }
}

function writeFile(p, content) {
  writeFileSync(p, content, "utf-8");
}

const { hash, branch } = getGitInfo();

// ── Update CURRENT_STATE.md ──
function updateCurrentState() {
  const path = resolve(ROOT, "memory/CURRENT_STATE.md");
  const content = `# MJU-DRP Current State

**Last Updated:** ${NOW}

| Field | Value |
|-------|-------|
| Project | MJU Document Registry Platform (MJU-DRP) |
| Phase | Foundation Sprint v1.1 |
| Branch | ${branch} |
| Latest Commit | ${hash} |
| Architecture Status | Initialized — MVP structure in place |
| Validation Status | Pending first run |
| Push Status | Pending |

## Completed Files

| Area | Files |
|------|-------|
| Schemas | document.schema.json, category.schema.json, project.schema.json, owner.schema.json, evidence.schema.json, relationship.schema.json |
| Registry | documents.sample.json, categories.sample.json, projects.sample.json, owners.sample.json, evidence-map.sample.json |
| Scripts | validate-registry.mjs, generate-search-index.mjs, update-memory.mjs |
| Memory | CURRENT_STATE.md, NEXT_TASK.md, LAST_HANDOFF.md, SESSION_LOG.md, DECISIONS.md, ARCHITECTURE_LOCK.md |
| Docs | 13 documentation files covering architecture, integration, governance, roadmap, and token-savior workflow |
| CI/CD | GitHub Actions validate workflow |
| Rules | Cursor rules (.cursor/rules/mjudrp.mdc) |

## Open Risks

1. Remote GitHub repository (numtip/mjudrp) not yet verified — push pending.
2. No actual Microsoft 365 / SharePoint connectivity yet — integration strategy documented only.
3. Registry is sample data only — real document metadata needs to be populated.
4. Consumer projects not yet integrated — integration model documented but not tested.
5. No automated deployment pipeline beyond GitHub Actions validation.
`;
  writeFile(path, content);
  console.log("  Updated memory/CURRENT_STATE.md");
}

// ── Update LAST_HANDOFF.md ──
function updateLastHandoff() {
  const path = resolve(ROOT, "memory/LAST_HANDOFF.md");
  const content = `# Last Handoff

| Field | Value |
|-------|-------|
| Date | ${NOW} |
| Sprint | Foundation Sprint v1.1 |
| Summary | Initialized MJU-DRP project structure, schemas, sample registry data, validation/search/memory scripts, documentation, CI/CD, and memory system. |
| Files Changed | All files (initial commit) |
| Commands Run | \`git init\`, created directories and files, \`node scripts/validate-registry.mjs\`, \`node scripts/generate-search-index.mjs\`, \`node scripts/update-memory.mjs\` |
| Validation Result | Pending |
| Commit Hash | ${hash} |
| Push Status | Pending |
| Next Action | Push to GitHub remote, verify CI passes, begin Sprint 2 |
`;
  writeFile(path, content);
  console.log("  Updated memory/LAST_HANDOFF.md");
}

// ── Append to SESSION_LOG.md ──
function appendSessionLog() {
  const path = resolve(ROOT, "memory/SESSION_LOG.md");
  const header = `# MJU-DRP Session Log\n\n`;
  const entry = `## ${SESSION_ID}

| Field | Value |
|-------|-------|
| Date | ${NOW} |
| Goal | Initialize MJU-DRP Foundation Sprint v1.1 — create project structure, schemas, registry data, scripts, docs, memory system, CI/CD |
| Completed Work | Created schemas (6), registry samples (5 files, 7 docs, 3 cats, 3 projects, 3 owners, 6 evidence maps), scripts (3), docs (13), memory files (6), CI workflow, cursor rules |
| Decisions | Follow use-before-build, metadata-first, static-first principles. No database/auth/RBAC/admin panel during MVP. GitHub is source of truth. |
| Validation Result | Pending first run |

`;

  const existing = readFile(path);
  if (existing) {
    writeFile(path, existing + "\n" + entry);
  } else {
    writeFile(path, header + entry);
  }
  console.log("  Appended to memory/SESSION_LOG.md");
}

// ── Run ──
console.log("MJU-DRP Memory Update Script");
console.log("=".repeat(40));
updateCurrentState();
updateLastHandoff();
appendSessionLog();
console.log("=".repeat(40));
console.log("Memory update complete.");
