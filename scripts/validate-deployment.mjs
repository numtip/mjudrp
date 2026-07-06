import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DEPLOY = resolve(ROOT, "deployment");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) { passed++; console.log(`  ✅ ${message}`); }
  else { failed++; console.error(`  ❌ ${message}`); }
}

function loadJSON(relPath) {
  const full = resolve(DEPLOY, relPath);
  if (!existsSync(full)) return null;
  try { return JSON.parse(readFileSync(full, "utf-8")); }
  catch { return null; }
}

function fileExists(...parts) {
  return existsSync(resolve(DEPLOY, ...parts));
}

console.log("=".repeat(60));
console.log("  MJU-DRP Deployment Kit Validation");
console.log("=".repeat(60));

// ── 1. Directory Structure ──
console.log("\n--- Directory Structure ---");
const requiredDirs = ["powershell","site-scripts","site-designs","verification","rollback","discovery","health","csv","json","reports","examples"];
for (const d of requiredDirs) {
  assert(existsSync(resolve(DEPLOY, d)), `Directory exists: deployment/${d}/`);
}

// ── 2. Deployment Manifest ──
console.log("\n--- Deployment Manifest ---");
const manifest = loadJSON("deployment-manifest.json");
assert(manifest !== null, "deployment-manifest.json is valid JSON");
if (manifest) {
  assert(manifest.deployment_version === "1.0.0", "Manifest version is 1.0.0");
  assert(manifest.compatibility.registry_version === "1.0", "Registry version is 1.0");
  assert(typeof manifest.requirements === "object", "Manifest has requirements");
  assert(manifest.requirements.libraries.length === 6, "6 required libraries");
  assert(manifest.requirements.lists.length === 5, "5 required lists");
  assert(manifest.requirements.columns === 22, "22 required columns");
  assert(manifest.requirements.permission_groups === 7, "7 required permission groups");
  assert(manifest.requirements.views === 13, "13 required views");
}

// ── 3. PowerShell Scripts ──
console.log("\n--- PowerShell Scripts ---");
const psFiles = ["00_create_site.ps1","01_create_libraries.ps1","02_create_columns.ps1","03_create_lists.ps1","04_create_views.ps1","05_create_permissions.ps1","06_import_metadata.ps1","07_verify_environment.ps1","08_export_metadata.ps1","09_cleanup_demo.ps1"];
for (const f of psFiles) {
  const full = resolve(DEPLOY, "powershell", f);
  assert(existsSync(full), `PowerShell script exists: ${f}`);
  if (existsSync(full)) {
    const content = readFileSync(full, "utf-8");
    assert(content.includes("MJU-DRP"), `${f} has MJU-DRP header`);
    assert(content.includes("__SITE_URL__") || content.includes("__TENANT_NAME__"), `${f} has placeholders`);
  }
}

// ── 4. Site Scripts ──
console.log("\n--- Site Scripts ---");
const siteScripts = ["communication-site.json","libraries.json","columns.json","lists.json","views.json","permissions.json","navigation.json","theme.json"];
for (const f of siteScripts) {
  const full = resolve(DEPLOY, "site-scripts", f);
  assert(existsSync(full), `Site script exists: ${f}`);
  const script = loadJSON(`site-scripts/${f}`);
  assert(script !== null, `${f} is valid JSON`);
  if (script) assert(Array.isArray(script.operations), `${f} has operations array`);
}

// ── 5. Site Designs ──
console.log("\n--- Site Designs ---");
const designFiles = ["enterprise-registry.json","green-office.json","rae.json","learning-center.json","research-portal.json"];
for (const f of designFiles) {
  const full = resolve(DEPLOY, "site-designs", f);
  assert(existsSync(full), `Site design exists: ${f}`);
  const design = loadJSON(`site-designs/${f}`);
  assert(design !== null, `${f} is valid JSON`);
  if (design) {
    assert(design.site_design_title, `${f} has title`);
    assert(Array.isArray(design.site_scripts), `${f} has site_scripts array`);
  }
}

// ── 6. CSV Templates ──
console.log("\n--- CSV Templates ---");
const csvFiles = ["documents.csv","categories.csv","projects.csv","owners.csv","relationships.csv","evidence.csv","metadata-import.csv"];
for (const f of csvFiles) {
  assert(fileExists("csv", f), `CSV template exists: ${f}`);
}

// ── 7. JSON Templates ──
console.log("\n--- JSON Templates ---");
const jsonFiles = ["site-settings.json","libraries.json","columns.json","lists.json","permissions.json","views.json","content-types.json"];
for (const f of jsonFiles) {
  const full = resolve(DEPLOY, "json", f);
  assert(existsSync(full), `JSON template exists: ${f}`);
  const json = loadJSON(`json/${f}`);
  assert(json !== null, `${f} is valid JSON`);
}

// ── 8. Verification Kit ──
console.log("\n--- Verification Kit ---");
const verifyFiles = ["verify-site.ps1","verify-libraries.ps1","verify-columns.ps1","verify-lists.ps1","verify-permissions.ps1","verify-views.ps1","verification-checklist.md"];
for (const f of verifyFiles) {
  assert(fileExists("verification", f), `Verification file exists: ${f}`);
}

// ── 9. Rollback Kit ──
console.log("\n--- Rollback Kit ---");
assert(fileExists("rollback", "rollback-guide.md"), "rollback-guide.md exists");
assert(fileExists("rollback", "remove-demo-content.ps1"), "remove-demo-content.ps1 exists");
assert(fileExists("rollback", "archive-metadata.ps1"), "archive-metadata.ps1 exists");
assert(fileExists("rollback", "restore-checklist.md"), "restore-checklist.md exists");

// ── 10. Discovery Kit ──
console.log("\n--- Discovery Kit ---");
const discoveryFiles = ["discover-site.ps1","discover-libraries.ps1","discover-columns.ps1","discover-lists.ps1","discover-permissions.ps1","discover-content-types.ps1","environment-report-template.md"];
for (const f of discoveryFiles) {
  assert(fileExists("discovery", f), `Discovery file exists: ${f}`);
}

// ── 11. Health Check Kit ──
console.log("\n--- Health Check Kit ---");
assert(fileExists("health", "health-check.ps1"), "health-check.ps1 exists");
assert(fileExists("health", "health-rules.json"), "health-rules.json exists");
assert(fileExists("health", "health-report-template.md"), "health-report-template.md exists");

// ── 12. No Duplicate Names (per directory) ──
console.log("\n--- Duplicate Name Check ---");
let anyDupes = false;
for (const d of requiredDirs) {
  const full = resolve(DEPLOY, d);
  if (!existsSync(full)) continue;
  const files = readdirSync(full);
  const names = new Set();
  for (const f of files) {
    if (names.has(f)) { anyDupes = true; break; }
    names.add(f);
  }
}
assert(!anyDupes, anyDupes ? "Duplicate filenames found within a directory" : "No duplicate filenames per directory");

// ── 13. README ──
console.log("\n--- README ---");
const readmePath = resolve(DEPLOY, "README.md");
assert(existsSync(readmePath), "deployment/README.md exists");
if (existsSync(readmePath)) {
  const content = readFileSync(readmePath, "utf-8");
  assert(content.includes("MJU-DRP SharePoint Deployment Kit"), "README has correct title");
}

// ── Summary ──
console.log("\n" + "=".repeat(60));
console.log("  Deployment Kit Validation Summary");
console.log("=".repeat(60));
console.log(`  Passed: ${passed}`);
console.log(`  Failed: ${failed}`);
const allPassed = failed === 0;
console.log(`  Result: ${allPassed ? "\x1b[32mPASS\x1b[0m" : "\x1b[31mFAIL\x1b[0m"}`);

process.exit(allPassed ? 0 : 1);
