// Test: Registry generation
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${message}`);
  } else {
    failed++;
    console.error(`  ❌ ${message}`);
  }
}

const DIST = resolve(ROOT, "dist");

// Test 1: All output files exist
console.log("\n--- Output File Existence ---");
const expectedOutputs = [
  "document-registry.json",
  "category-registry.json",
  "project-registry.json",
  "owner-registry.json",
  "evidence-registry.json",
  "relationship-registry.json",
  "search-index.json",
  "minisearch-index.json",
  "manifest.json",
  "validation-report.json",
  "performance-report.json",
];

for (const file of expectedOutputs) {
  assert(existsSync(resolve(DIST, file)), `Output file exists: ${file}`);
}

// Test 2: manifest.json has required fields
console.log("\n--- Manifest Content ---");
const manifest = JSON.parse(readFileSync(resolve(DIST, "manifest.json"), "utf-8"));
assert(manifest.registry_version === "1.0", "manifest.registry_version is 1.0");
assert(manifest.schema_version === "1.0", "manifest.schema_version is 1.0");
assert(typeof manifest.build_timestamp === "string", "manifest.build_timestamp is string");
assert(typeof manifest.document_count === "number", "manifest.document_count is number");
assert(manifest.generator_version === "2.0", "manifest.generator_version is 2.0");
assert(Array.isArray(manifest.outputs), "manifest.outputs is array");

// Test 3: document-registry.json is valid array
console.log("\n--- Document Registry Content ---");
const docRegistry = JSON.parse(readFileSync(resolve(DIST, "document-registry.json"), "utf-8"));
assert(Array.isArray(docRegistry), "document-registry is array");
assert(docRegistry.length > 0, "document-registry has entries");
assert(docRegistry[0].id, "first entry has id");
assert(docRegistry[0].title, "first entry has title");
assert(docRegistry[0].share_url, "first entry has share_url");

// Test 4: search-index.json is valid
console.log("\n--- Search Index Content ---");
const searchIndex = JSON.parse(readFileSync(resolve(DIST, "search-index.json"), "utf-8"));
assert(Array.isArray(searchIndex), "search-index is array");
assert(searchIndex.length === docRegistry.length, "search-index matches document count");

// Test 5: minisearch-index.json is valid JSON
console.log("\n--- MiniSearch Index Content ---");
const miniIndex = JSON.parse(readFileSync(resolve(DIST, "minisearch-index.json"), "utf-8"));
assert(typeof miniIndex === "object", "minisearch-index is an object");

// Test 6: All registry files are valid JSON arrays
console.log("\n--- Registry Outputs Valid ---");
const registryFiles = [
  "category-registry.json",
  "project-registry.json",
  "owner-registry.json",
  "evidence-registry.json",
];
for (const file of registryFiles) {
  const data = JSON.parse(readFileSync(resolve(DIST, file), "utf-8"));
  assert(Array.isArray(data), `${file} is an array`);
}

// Summary
console.log("\n" + "=".repeat(40));
console.log(`Generator Tests: ${passed} passed, ${failed} failed`);
console.log("=".repeat(40));
process.exit(failed > 0 ? 1 : 0);
