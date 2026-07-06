// Test: Schema validation
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import Ajv from "ajv";
import addFormats from "ajv-formats";

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

// Test 1: All schemas compile
console.log("\n--- Schema Compilation ---");
const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);

const SCHEMAS = [
  "schemas/document.schema.json",
  "schemas/category.schema.json",
  "schemas/project.schema.json",
  "schemas/owner.schema.json",
  "schemas/evidence.schema.json",
  "schemas/relationship.schema.json",
];

for (const s of SCHEMAS) {
  const path = resolve(ROOT, s);
  assert(existsSync(path), `Schema file exists: ${s}`);
  const schema = JSON.parse(readFileSync(path, "utf-8"));
  try {
    ajv.compile(schema);
    assert(true, `Schema compiles: ${s}`);
  } catch (e) {
    assert(false, `Schema compiles: ${s} — ${e.message}`);
  }
}

// Test 2: Sample documents validate
console.log("\n--- Sample Document Validation ---");
const ajv2 = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv2);
const docSchema2 = JSON.parse(readFileSync(resolve(ROOT, "schemas/document.schema.json"), "utf-8"));
const validateDoc2 = ajv2.compile(docSchema2);

const docs = JSON.parse(readFileSync(resolve(ROOT, "registry/documents.sample.json"), "utf-8"));
for (const doc of docs) {
  const valid = validateDoc2(doc);
  assert(valid, `Document "${doc.id}" validates against schema`);
  if (!valid) {
    for (const err of validateDoc2.errors) {
      console.error(`       ${err.instancePath}: ${err.message}`);
    }
  }
}

// Test 3: Invalid document fails
console.log("\n--- Invalid Document Detection ---");
const ajv3 = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv3);
const docSchema3 = JSON.parse(readFileSync(resolve(ROOT, "schemas/document.schema.json"), "utf-8"));
const validateDoc3 = ajv3.compile(docSchema3);
const invalidDoc = { id: "BAD-001" };
const valid3 = validateDoc3(invalidDoc);
assert(!valid3, "Invalid document (missing fields) is rejected");
if (validateDoc3.errors) {
  assert(validateDoc3.errors.length >= 3, `Reports ${validateDoc3.errors.length}+ errors`);
}

// Test 4: ID format validation
console.log("\n--- ID Format Validation ---");
const idPattern = /^[A-Z0-9]+-[0-9]{3,}$/;
for (const doc of docs) {
  assert(idPattern.test(doc.id), `Document "${doc.id}" matches ID pattern`);
}

// Summary
console.log("\n" + "=".repeat(40));
console.log(`Validation Tests: ${passed} passed, ${failed} failed`);
console.log("=".repeat(40));
process.exit(failed > 0 ? 1 : 0);
