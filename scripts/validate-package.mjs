import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PACKAGE = resolve(ROOT, "release", "latest", "registry-package");
const DIST = resolve(ROOT, "dist");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) { passed++; console.log(`  ✅ ${message}`); }
  else { failed++; console.error(`  ❌ ${message}`); }
}

function readJSON(filePath) {
  if (!existsSync(filePath)) return null;
  try { return JSON.parse(readFileSync(filePath, "utf-8")); }
  catch { return null; }
}

function sha256(filePath) {
  if (!existsSync(filePath)) return null;
  return crypto.createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

console.log("\n" + "=".repeat(60));
console.log("  MJU-DRP Package Validation");
console.log("=".repeat(60));

// ── 1. All required files exist ──
console.log("\n--- Package File Existence ---");
const REQUIRED_FILES = [
  "document-registry.json",
  "category-registry.json",
  "project-registry.json",
  "owner-registry.json",
  "evidence-registry.json",
  "relationship-registry.json",
  "search-index.json",
  "minisearch-index.json",
  "statistics.json",
  "validation-report.json",
  "performance-report.json",
  "manifest.json",
  "release-notes.md",
  "checksum.json",
];
for (const f of REQUIRED_FILES) {
  assert(existsSync(resolve(PACKAGE, f)), `Package file exists: ${f}`);
}

// ── 2. Checksums valid ──
console.log("\n--- Checksum Validation ---");
const checksum = readJSON(resolve(PACKAGE, "checksum.json"));
assert(checksum !== null, "checksum.json is valid JSON");
if (checksum) {
  assert(checksum.package_version, "checksum has package_version");
  assert(checksum.generated_at, "checksum has generated_at");
  assert(Array.isArray(checksum.artifacts), "checksum has artifacts array");
  let validChecksums = 0;
  for (const art of checksum.artifacts || []) {
    const actualHash = sha256(resolve(PACKAGE, art.filename));
    if (actualHash && actualHash === art.sha256) validChecksums++;
  }
  assert(validChecksums > 0, `${validChecksums}/${checksum.artifacts.length} checksums valid`);
}

// ── 3. Manifest valid ──
console.log("\n--- Manifest Validation ---");
const manifest = readJSON(resolve(PACKAGE, "manifest.json"));
assert(manifest !== null, "manifest.json is valid JSON");
if (manifest) {
  assert(manifest.registry_version === "1.0", "manifest.registry_version is 1.0");
  assert(manifest.schema_version === "1.0", "manifest.schema_version is 1.0");
  assert(manifest.package_version, "manifest has package_version");
  assert(manifest.build_timestamp, "manifest has build_timestamp");
  assert(typeof manifest.document_count === "number", "manifest has document_count");
  assert(Array.isArray(manifest.outputs), "manifest has outputs array");
  assert(manifest.consumer_compatibility, "manifest has consumer_compatibility");
  assert(manifest.minimum_registry_version, "manifest has minimum_registry_version");
  assert(manifest.build_hash, "manifest has build_hash");
}

// ── 4. Statistics valid ──
console.log("\n--- Statistics Validation ---");
const stats = readJSON(resolve(PACKAGE, "statistics.json"));
assert(stats !== null, "statistics.json is valid JSON");
if (stats) {
  assert(stats.summary, "stats has summary");
  assert(typeof stats.summary.documents === "number", "stats.summary.documents exists");
  assert(typeof stats.summary.categories === "number", "stats.summary.categories exists");
  assert(typeof stats.summary.projects === "number", "stats.summary.projects exists");
  assert(typeof stats.summary.owners === "number", "stats.summary.owners exists");
  assert(typeof stats.summary.evidence === "number", "stats.summary.evidence exists");
  assert(typeof stats.summary.relationships === "number", "stats.summary.relationships exists");
  assert(stats.registry_growth, "stats has registry_growth");
  assert(stats.category_distribution, "stats has category_distribution");
  assert(stats.relationship_density, "stats has relationship_density");
}

// ── 5. Registry counts match between files ──
console.log("\n--- Registry Count Consistency ---");
const docReg = readJSON(resolve(PACKAGE, "document-registry.json"));
const catReg = readJSON(resolve(PACKAGE, "category-registry.json"));
const projReg = readJSON(resolve(PACKAGE, "project-registry.json"));
const ownReg = readJSON(resolve(PACKAGE, "owner-registry.json"));
const evReg = readJSON(resolve(PACKAGE, "evidence-registry.json"));
const relReg = readJSON(resolve(PACKAGE, "relationship-registry.json"));

if (docReg && stats) {
  assert(docReg.length === stats.summary.documents, `document count matches stats (${docReg.length})`);
}
if (catReg && stats) {
  assert(catReg.length === stats.summary.categories, `category count matches stats (${catReg.length})`);
}
if (projReg && stats) {
  assert(projReg.length === stats.summary.projects, `project count matches stats (${projReg.length})`);
}
if (ownReg && stats) {
  assert(ownReg.length === stats.summary.owners, `owner count matches stats (${ownReg.length})`);
}
if (evReg && stats) {
  assert(evReg.length === stats.summary.evidence, `evidence count matches stats (${evReg.length})`);
}
if (relReg && stats) {
  assert(relReg.length === stats.summary.relationships, `relationship count matches stats (${relReg.length})`);
}

// ── 6. Search indexes exist ──
console.log("\n--- Search Index Validation ---");
const searchIdx = readJSON(resolve(PACKAGE, "search-index.json"));
assert(searchIdx !== null && Array.isArray(searchIdx), "search-index.json is valid array");
const miniIdx = readJSON(resolve(PACKAGE, "minisearch-index.json"));
assert(miniIdx !== null && typeof miniIdx === "object", "minisearch-index.json is valid object");

// ── 7. Validation report exists and passes ──
console.log("\n--- Validation Report Validation ---");
const valReport = readJSON(resolve(PACKAGE, "validation-report.json"));
assert(valReport !== null, "validation-report.json is valid JSON");
if (valReport) {
  assert(valReport.status === "PASS", "validation-report status is PASS");
  assert(valReport.summary?.errors === 0, "validation has 0 errors");
}

// ── 8. Release notes exist ──
console.log("\n--- Release Notes Validation ---");
const relNotes = readJSON ? existsSync(resolve(PACKAGE, "release-notes.md")) : false;
assert(existsSync(resolve(PACKAGE, "release-notes.md")), "release-notes.md exists");
const releaseContent = readFileSync(resolve(PACKAGE, "release-notes.md"), "utf-8");
assert(releaseContent.includes("MJU-DRP Registry Package"), "release-notes has correct title");
assert(releaseContent.includes("Package Version"), "release-notes includes Package Version");
assert(releaseContent.includes("Registry Statistics"), "release-notes includes Registry Statistics");

// ── Summary ──
console.log("\n" + "=".repeat(60));
console.log("  Package Validation Summary");
console.log("=".repeat(60));
console.log(`  Passed: ${passed}`);
console.log(`  Failed: ${failed}`);
const allPassed = failed === 0;
console.log(`  Result: ${allPassed ? "\x1b[32mPASS\x1b[0m" : "\x1b[31mFAIL\x1b[0m"}`);

process.exit(allPassed ? 0 : 1);
