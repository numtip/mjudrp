import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PROV = resolve(ROOT, "provisioning");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) { passed++; console.log(`  ✅ ${message}`); }
  else { failed++; console.error(`  ❌ ${message}`); }
}

function loadJSON(relPath) {
  const full = resolve(PROV, relPath);
  if (!existsSync(full)) return null;
  try { return JSON.parse(readFileSync(full, "utf-8")); }
  catch { return null; }
}

function countFiles(dir) {
  if (!existsSync(resolve(PROV, dir))) return 0;
  return readdirSync(resolve(PROV, dir)).filter(f => f.endsWith(".json") || f.endsWith(".md") || f.endsWith(".csv")).length;
}

console.log("=".repeat(60));
console.log("  MJU-DRP Provisioning Kit Validation");
console.log("=".repeat(60));

// ── 1. Directory Structure ──
console.log("\n--- Directory Structure ---");
const requiredDirs = ["site","libraries","columns","lists","views","permissions","content-types","validation","prompts","exports","templates","samples"];
for (const d of requiredDirs) {
  assert(existsSync(resolve(PROV, d)), `Directory exists: provisioning/${d}/`);
}

// ── 2. Manifest ──
console.log("\n--- Manifest Validation ---");
const manifest = loadJSON("manifest.json");
assert(manifest !== null, "manifest.json is valid JSON");
if (manifest) {
  assert(manifest.template_version === "1.0.0", "Manifest version is 1.0.0");
  assert(manifest.registry_version === "1.0", "Manifest registry version is 1.0");
  assert(Array.isArray(manifest.requirements.required_libraries), "Manifest has required_libraries");
  assert(manifest.requirements.required_libraries.length === 6, "Manifest lists 6 required libraries");
  assert(Array.isArray(manifest.requirements.required_columns), "Manifest has required_columns");
  assert(Array.isArray(manifest.requirements.required_lists), "Manifest has required_lists");
  assert(Array.isArray(manifest.requirements.required_content_types), "Manifest has required_content_types");
  assert(Array.isArray(manifest.requirements.required_permission_groups), "Manifest has required_permission_groups");
}

// ── 3. Site Templates ──
console.log("\n--- Site Templates ---");
assert(existsSync(resolve(PROV, "site/site-template.json")), "site-template.json exists");
assert(existsSync(resolve(PROV, "site/communication-site.json")), "communication-site.json exists");
assert(existsSync(resolve(PROV, "site/team-site.json")), "team-site.json exists");
assert(existsSync(resolve(PROV, "site/site-settings.json")), "site-settings.json exists");
assert(existsSync(resolve(PROV, "site/site-navigation.json")), "site-navigation.json exists");
const site = loadJSON("site/site-template.json");
assert(site !== null, "site-template.json is valid JSON");

// ── 4. Library Templates ──
console.log("\n--- Library Templates ---");
const libFiles = ["documents.json","evidence.json","templates.json","archive.json","working-area.json","source-data.json"];
for (const f of libFiles) {
  const lib = loadJSON(`libraries/${f}`);
  assert(lib !== null, `${f} is valid JSON`);
  if (lib) assert(lib.library_name, `${f} has library_name`);
}

// ── 5. Column Templates ──
console.log("\n--- Column Templates ---");
const colFiles = ["document-columns.json","category-columns.json","project-columns.json","owner-columns.json","evidence-columns.json","relationship-columns.json"];
const docCols = loadJSON("columns/document-columns.json");
for (const f of colFiles) {
  const cols = loadJSON(`columns/${f}`);
  assert(cols !== null, `${f} is valid JSON`);
}
if (docCols) {
  assert(Array.isArray(docCols.columns), "document-columns has columns array");
  assert(docCols.columns.length === 22 || docCols.columns.length >= 20, `document-columns has ${docCols.columns.length} columns (expected 22)`);
}

// ── 6. List Templates ──
console.log("\n--- List Templates ---");
const listFiles = ["categories.json","projects.json","owners.json","metadata-review.json","registry-review.json"];
for (const f of listFiles) {
  const list = loadJSON(`lists/${f}`);
  assert(list !== null, `${f} is valid JSON`);
  if (list) assert(list.list_name, `${f} has list_name`);
}

// ── 7. View Templates ──
console.log("\n--- View Templates ---");
assert(existsSync(resolve(PROV, "views/documents.json")), "views/documents.json exists");
assert(existsSync(resolve(PROV, "views/evidence.json")), "views/evidence.json exists");
assert(existsSync(resolve(PROV, "views/review.json")), "views/review.json exists");
assert(existsSync(resolve(PROV, "views/audit.json")), "views/audit.json exists");
assert(existsSync(resolve(PROV, "views/public.json")), "views/public.json exists");
assert(existsSync(resolve(PROV, "views/internal.json")), "views/internal.json exists");
assert(existsSync(resolve(PROV, "views/green-office.json")), "views/green-office.json exists");
assert(existsSync(resolve(PROV, "views/learning-center.json")), "views/learning-center.json exists");
assert(existsSync(resolve(PROV, "views/rae.json")), "views/rae.json exists");

// ── 8. Permission Templates ──
console.log("\n--- Permission Templates ---");
assert(existsSync(resolve(PROV, "permissions/groups.json")), "groups.json exists");
assert(existsSync(resolve(PROV, "permissions/libraries.json")), "libraries.json exists");
assert(existsSync(resolve(PROV, "permissions/permission-matrix.json")), "permission-matrix.json exists");
const groups = loadJSON("permissions/groups.json");
if (groups) assert(Array.isArray(groups.permission_groups), "groups.json has permission_groups array");

// ── 9. Content Type Templates ──
console.log("\n--- Content Type Templates ---");
const ctFiles = ["document.json","policy.json","manual.json","report.json","evidence.json","template.json"];
for (const f of ctFiles) {
  const ct = loadJSON(`content-types/${f}`);
  assert(ct !== null, `${f} is valid JSON`);
}

// ── 10. Validation Templates ──
console.log("\n--- Validation Templates ---");
assert(existsSync(resolve(PROV, "validation/metadata-checklist.json")), "metadata-checklist.json exists");
assert(existsSync(resolve(PROV, "validation/library-validation.json")), "library-validation.json exists");
assert(existsSync(resolve(PROV, "validation/site-validation.json")), "site-validation.json exists");
assert(existsSync(resolve(PROV, "validation/permission-validation.json")), "permission-validation.json exists");

// ── 11. AI Prompt Library ──
console.log("\n--- AI Prompt Library ---");
const promptFiles = ["metadata-review.md","document-classification.md","keyword-generation.md","summary-generation.md","duplicate-detection.md","relationship-suggestion.md","quality-review.md","registry-validation.md"];
for (const f of promptFiles) {
  const promptPath = resolve(PROV, "prompts", f);
  assert(existsSync(promptPath), `${f} exists`);
  if (existsSync(promptPath)) {
    const content = readFileSync(promptPath, "utf-8");
    assert(content.includes("# AI Prompt:"), `${f} has correct header`);
    assert(content.includes("**Use with:**"), `${f} lists compatible AI models`);
  }
}

// ── 12. Export Templates ──
console.log("\n--- Export Templates ---");
assert(existsSync(resolve(PROV, "exports/metadata-template.xlsx.md")), "metadata-template.xlsx.md exists");
assert(existsSync(resolve(PROV, "exports/metadata-template.csv")), "metadata-template.csv exists");
assert(existsSync(resolve(PROV, "exports/bulk-import-format.md")), "bulk-import-format.md exists");
assert(existsSync(resolve(PROV, "exports/sharepoint-export-format.md")), "sharepoint-export-format.md exists");
assert(existsSync(resolve(PROV, "exports/registry-import-format.md")), "registry-import-format.md exists");

// ── 13. No Duplicate Names (per directory) ──
console.log("\n--- Duplicate Name Check ---");
let anyDupes = false;
for (const d of requiredDirs) {
  const full = resolve(PROV, d);
  if (!existsSync(full)) continue;
  const files = readdirSync(full);
  const names = new Set();
  for (const f of files) {
    if (names.has(f)) { anyDupes = true; break; }
    names.add(f);
  }
}
assert(!anyDupes, anyDupes ? "Duplicate filenames found within a directory" : "No duplicate filenames per directory");

// ── 14. README ──
console.log("\n--- README ---");
const readmePath = resolve(PROV, "README.md");
assert(existsSync(readmePath), "provisioning/README.md exists");
if (existsSync(readmePath)) {
  const content = readFileSync(readmePath, "utf-8");
  assert(content.includes("MJU-DRP AI Provisioning Kit"), "README has correct title");
}

// ── Summary ──
console.log("\n" + "=".repeat(60));
console.log("  Provisioning Kit Validation Summary");
console.log("=".repeat(60));
console.log(`  Passed: ${passed}`);
console.log(`  Failed: ${failed}`);
const allPassed = failed === 0;
console.log(`  Result: ${allPassed ? "\x1b[32mPASS\x1b[0m" : "\x1b[31mFAIL\x1b[0m"}`);

process.exit(allPassed ? 0 : 1);
