// Test: Registry cross-references and data integrity
import { readFileSync } from "fs";
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

// Load data
const docs = JSON.parse(readFileSync(resolve(ROOT, "registry/documents.sample.json"), "utf-8"));
const cats = JSON.parse(readFileSync(resolve(ROOT, "registry/categories.sample.json"), "utf-8"));
const projs = JSON.parse(readFileSync(resolve(ROOT, "registry/projects.sample.json"), "utf-8"));
const owners = JSON.parse(readFileSync(resolve(ROOT, "registry/owners.sample.json"), "utf-8"));
const evidence = JSON.parse(readFileSync(resolve(ROOT, "registry/evidence-map.sample.json"), "utf-8"));

const docIds = new Set(docs.map(d => d.id));
const catIds = new Set(cats.map(c => c.id));
const projIds = new Set(projs.map(p => p.id));
const ownerIds = new Set(owners.map(o => o.id));
const evIds = new Set(evidence.map(e => e.id));

// Test 1: No duplicate IDs
console.log("\n--- Duplicate ID Check ---");
assert(docIds.size === docs.length, "No duplicate document IDs");
assert(catIds.size === cats.length, "No duplicate category IDs");
assert(projIds.size === projs.length, "No duplicate project IDs");
assert(ownerIds.size === owners.length, "No duplicate owner IDs");
assert(evIds.size === evidence.length, "No duplicate evidence IDs");

// Test 2: All cross-references are valid
console.log("\n--- Cross-Reference Check ---");
let refErrors = 0;
for (const doc of docs) {
  if (doc.owner && !ownerIds.has(doc.owner)) {
    console.error(`  ❌ Document "${doc.id}" references unknown owner "${doc.owner}"`);
    refErrors++;
  }
  if (doc.category && !catIds.has(doc.category)) {
    console.error(`  ❌ Document "${doc.id}" references unknown category "${doc.category}"`);
    refErrors++;
  }
  if (doc.project_refs) {
    for (const pr of doc.project_refs) {
      if (!projIds.has(pr)) {
        console.error(`  ❌ Document "${doc.id}" references unknown project "${pr}"`);
        refErrors++;
      }
    }
  }
  if (doc.evidence_refs) {
    for (const er of doc.evidence_refs) {
      if (er && !evIds.has(er)) {
        console.error(`  ❌ Document "${doc.id}" references unknown evidence "${er}"`);
        refErrors++;
      }
    }
  }
}
assert(refErrors === 0, `${refErrors} cross-reference errors`);

// Test 3: Evidence map references
console.log("\n--- Evidence Map Reference Check ---");
let evErrors = 0;
for (const ev of evidence) {
  if (ev.project_ref && !projIds.has(ev.project_ref)) {
    console.error(`  ❌ Evidence "${ev.id}" references unknown project "${ev.project_ref}"`);
    evErrors++;
  }
  if (ev.document_refs) {
    for (const dr of ev.document_refs) {
      if (!docIds.has(dr)) {
        console.error(`  ❌ Evidence "${ev.id}" references unknown document "${dr}"`);
        evErrors++;
      }
    }
  }
}
assert(evErrors === 0, `${evErrors} evidence reference errors`);

// Test 4: Required fields present
console.log("\n--- Required Field Check ---");
let missingFields = 0;
const REQUIRED = ["id", "title", "category", "owner", "storage_provider", "storage_path", "share_url", "project_refs"];
for (const doc of docs) {
  for (const field of REQUIRED) {
    if (doc[field] === undefined || doc[field] === null || doc[field] === "" || (Array.isArray(doc[field]) && doc[field].length === 0)) {
      console.error(`  ❌ Document "${doc.id}" missing required field "${field}"`);
      missingFields++;
    }
  }
}
assert(missingFields === 0, `${missingFields} missing required fields`);

// Test 5: Fixture datasets load
console.log("\n--- Fixture Dataset Check ---");
const fixtureSizes = [
  { path: "examples/registry-small/documents.json", expected: 10 },
  { path: "examples/registry-medium/documents.json", expected: 100 },
  { path: "examples/registry-large/documents.json", expected: 1000 },
];
for (const f of fixtureSizes) {
  try {
    const data = JSON.parse(readFileSync(resolve(ROOT, f.path), "utf-8"));
    assert(data.length === f.expected, `${f.path} has ${data.length} documents (expected ${f.expected})`);
  } catch (e) {
    assert(false, `${f.path} loads: ${e.message}`);
  }
}

// Summary
console.log("\n" + "=".repeat(40));
console.log(`Registry Tests: ${passed} passed, ${failed} failed`);
console.log("=".repeat(40));
process.exit(failed > 0 ? 1 : 0);
