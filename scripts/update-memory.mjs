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

// ── Read existing state to preserve manual edits ──
function readMemoryField(filePath, fieldName) {
  const content = readFile(filePath);
  if (!content) return null;
  const match = content.match(new RegExp(`\\|\\s*${fieldName}\\s*\\|\\s*(.+)\\s*\\|`));
  return match ? match[1].trim() : null;
}

// ── Update CURRENT_STATE.md — updates timestamps and git info ──
function updateCurrentState() {
  const path = resolve(ROOT, "memory/CURRENT_STATE.md");
  let content = readFile(path);
  if (!content) {
    content = `# MJU-DRP Current State\n\n**Last Updated:** ${NOW}\n`;
  }
  // Update timestamp
  content = content.replace(
    /\*\*Last Updated:\*\* .*/,
    `**Last Updated:** ${NOW}`
  );
  // Update branch
  content = content.replace(
    /(\|\s*Branch\s*\|)\s*.*(\|)/,
    `$1 ${branch} $2`
  );
  // Update commit hash
  content = content.replace(
    /(\|\s*Latest Commit\s*\|)\s*.*(\|)/,
    `$1 ${hash} $2`
  );
  writeFile(path, content);
  console.log("  Updated memory/CURRENT_STATE.md");
}

// ── Update LAST_HANDOFF.md — updates timestamps and git info ──
function updateLastHandoff() {
  const path = resolve(ROOT, "memory/LAST_HANDOFF.md");
  let content = readFile(path);
  if (!content) {
    content = `# Last Handoff\n\n| Field | Value |\n|-------|-------|\n| Date | ${NOW} |\n| Commit Hash | ${hash} |\n`;
  }
  // Update date
  content = content.replace(
    /(\|\s*Date\s*\|)\s*.*(\|)/,
    `$1 ${NOW} $2`
  );
  // Update commit hash
  content = content.replace(
    /(\|\s*Commit Hash\s*\|)\s*.*(\|)/,
    `$1 ${hash} $2`
  );
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
| Goal | Memory update — automated timestamp and git commit refresh |
| Completed Work | Updated CURRENT_STATE.md (timestamp, branch, commit), LAST_HANDOFF.md (timestamp, commit), appended to SESSION_LOG.md |
| Decisions | None — automated memory update only |
| Validation Result | See CURRENT_STATE.md |

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
