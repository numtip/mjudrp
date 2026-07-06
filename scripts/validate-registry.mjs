import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");

// ── Ensure dist exists ──
if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true });

// ── Color helpers ──
const PASS = "\x1b[32mPASS\x1b[0m";
const FAIL = "\x1b[31mFAIL\x1b[0m";
const WARN = "\x1b[33mWARN\x1b[0m";

const validationReport = {
  timestamp: new Date().toISOString(),
  documents_checked: 0,
  errors: [],
  warnings: [],
  duplicates: [],
  missing_owners: [],
  missing_categories: [],
  missing_evidence: [],
  invalid_references: [],
  summary: { errors: 0, warnings: 0, passed: true },
};

let totalErrors = 0;
let totalWarnings = 0;

function error(msg, detail) {
  console.error(`  ${FAIL}  ${msg}`);
  totalErrors++;
  validationReport.errors.push(detail || msg);
}

function warn(msg, detail) {
  console.error(`  ${WARN}  ${msg}`);
  totalWarnings++;
  validationReport.warnings.push(detail || msg);
}

function readJSON(filePath) {
  const fullPath = resolve(ROOT, filePath);
  if (!existsSync(fullPath)) {
    error(`File not found: ${filePath}`);
    return null;
  }
  const raw = readFileSync(fullPath, "utf-8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    error(`Invalid JSON in ${filePath}: ${e.message}`);
    return null;
  }
}

// ── Schema paths ──
const SCHEMAS = {
  document: "schemas/document.schema.json",
  category: "schemas/category.schema.json",
  project: "schemas/project.schema.json",
  owner: "schemas/owner.schema.json",
  evidence: "schemas/evidence.schema.json",
  relationship: "schemas/relationship.schema.json",
};

const REGISTRY_FILES = [
  { path: "registry/documents.sample.json", label: "Documents", schema: "document" },
  { path: "registry/categories.sample.json", label: "Categories", schema: "category" },
  { path: "registry/projects.sample.json", label: "Projects", schema: "project" },
  { path: "registry/owners.sample.json", label: "Owners", schema: "owner" },
  { path: "registry/evidence-map.sample.json", label: "Evidence Map", schema: "evidence" },
];

console.log("=".repeat(60));
console.log("  MJU-DRP Registry Validation");
console.log("=".repeat(60));
console.log();

// ── Setup AJV ──
const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);

// Compile all schemas
const validators = {};
const schemaErrors = [];

for (const [key, schemaPath] of Object.entries(SCHEMAS)) {
  try {
    const schema = JSON.parse(readFileSync(resolve(ROOT, schemaPath), "utf-8"));
    validators[key] = ajv.compile(schema);
  } catch (e) {
    schemaErrors.push(`${schemaPath}: ${e.message}`);
    console.error(`  ${FAIL}  Schema compilation failed: ${schemaPath} — ${e.message}`);
  }
}

if (schemaErrors.length > 0) {
  console.log();
  console.log(`  ${FAIL}  Schema compilation had errors — aborting`);
  process.exit(1);
}
console.log(`  ${PASS}  All ${Object.keys(validators).length} schemas compiled with AJV + ajv-formats`);

// Load all registry files
const registry = {};
for (const { path, label } of REGISTRY_FILES) {
  const data = readJSON(path);
  registry[label] = data;
  if (data !== null) {
    console.log(`  ${PASS}  Loaded ${label} (${data.length} entries)`);
  }
}

// Validate with AJV schema
console.log();
console.log("--- Schema Validation (AJV + ajv-formats) ---");
for (const { path, label, schema } of REGISTRY_FILES) {
  const data = registry[label];
  if (!data || !Array.isArray(data)) continue;
  const validate = validators[schema];
  if (!validate) {
    error(`No compiled schema for ${schema}`);
    continue;
  }
  let schemaPass = 0, schemaFail = 0;
  for (const entry of data) {
    const valid = validate(entry);
    if (valid) {
      schemaPass++;
    } else {
      schemaFail++;
      for (const err of validate.errors) {
        const msg = `[${label}] "${entry.id || "?"}": ${err.instancePath} ${err.message}`;
        error(msg, { file: label, id: entry.id, path: err.instancePath, message: err.message });
      }
    }
  }
  console.log(`  ${label}: ${schemaPass}/${data.length} passed AJV validation`);
}

// ── Document cross-reference validation ──
console.log();
console.log("--- Cross-Reference Validation ---");

const docs = registry["Documents"] || [];
const categories = registry["Categories"] || [];
const projects = registry["Projects"] || [];
const owners = registry["Owners"] || [];
const evMap = registry["Evidence Map"] || [];

const docIds = new Set(docs.map((d) => d.id));
const catIds = new Set(categories.map((c) => c.id));
const projIds = new Set(projects.map((p) => p.id));
const ownerIds = new Set(owners.map((o) => o.id));
const evIds = new Set(evMap.map((e) => e.id));

// Duplicate ID checks
function checkDuplicates(arr, label) {
  const seen = new Set();
  for (const item of arr) {
    if (seen.has(item.id)) {
      error(`Duplicate ${label} ID: "${item.id}"`, { type: "duplicate", label, id: item.id });
      validationReport.duplicates.push(`${label}: ${item.id}`);
    }
    seen.add(item.id);
  }
}

checkDuplicates(docs, "Document");
checkDuplicates(categories, "Category");
checkDuplicates(projects, "Project");
checkDuplicates(owners, "Owner");
checkDuplicates(evMap, "Evidence");

// Document cross-references
for (const doc of docs) {
  // Owner reference
  if (doc.owner && !ownerIds.has(doc.owner)) {
    warn(`Document "${doc.id}": Owner "${doc.owner}" not found`, { type: "missing-owner", id: doc.id, ref: doc.owner });
    validationReport.missing_owners.push({ doc: doc.id, owner: doc.owner });
  }

  // Category reference
  if (doc.category && !catIds.has(doc.category)) {
    warn(`Document "${doc.id}": Category "${doc.category}" not found`, { type: "missing-category", id: doc.id, ref: doc.category });
    validationReport.missing_categories.push({ doc: doc.id, category: doc.category });
  }

  // Project references
  if (doc.project_refs) {
    for (const pr of doc.project_refs) {
      if (!projIds.has(pr)) {
        warn(`Document "${doc.id}": Project ref "${pr}" not found`, { type: "invalid-project-ref", id: doc.id, ref: pr });
        validationReport.invalid_references.push({ doc: doc.id, type: "project", ref: pr });
      }
    }
  }

  // Evidence references
  if (doc.evidence_refs) {
    for (const er of doc.evidence_refs) {
      if (!evIds.has(er)) {
        warn(`Document "${doc.id}": Evidence ref "${er}" not found`, { type: "missing-evidence", id: doc.id, ref: er });
        validationReport.missing_evidence.push({ doc: doc.id, evidence: er });
      }
    }
  }

  // Related documents
  if (doc.related_documents) {
    for (const rd of doc.related_documents) {
      if (!docIds.has(rd)) {
        warn(`Document "${doc.id}": Related doc "${rd}" not found`, { type: "invalid-related-ref", id: doc.id, ref: rd });
        validationReport.invalid_references.push({ doc: doc.id, type: "related", ref: rd });
      }
    }
  }
}

// Evidence map cross-references
for (const ev of evMap) {
  if (ev.project_ref && !projIds.has(ev.project_ref)) {
    warn(`Evidence "${ev.id}": Project ref "${ev.project_ref}" not found`, { type: "invalid-evidence-project", id: ev.id, ref: ev.project_ref });
    validationReport.invalid_references.push({ doc: ev.id, type: "evidence-project", ref: ev.project_ref });
  }
  if (ev.document_refs) {
    for (const dr of ev.document_refs) {
      if (!docIds.has(dr)) {
        warn(`Evidence "${ev.id}": Document ref "${dr}" not found`, { type: "invalid-evidence-doc", id: ev.id, ref: dr });
        validationReport.invalid_references.push({ doc: ev.id, type: "evidence-document", ref: dr });
      }
    }
  }
}

validationReport.documents_checked = docs.length;

// ── Summary ──
console.log();
console.log("=".repeat(60));
console.log("  Validation Summary");
console.log("=".repeat(60));
console.log(`  Documents checked: ${docs.length}`);
console.log(`  Errors:            ${totalErrors}`);
console.log(`  Warnings:          ${totalWarnings}`);

const passed = totalErrors === 0;
validationReport.summary = {
  errors: totalErrors,
  warnings: totalWarnings,
  passed,
};
validationReport.status = passed ? "PASS" : "FAIL";

console.log();
if (passed) {
  console.log(`  Result: ${PASS}`);
} else {
  console.log(`  Result: ${FAIL}`);
}

// ── Write validation report ──
writeFileSync(
  resolve(DIST, "validation-report.json"),
  JSON.stringify(validationReport, null, 2),
  "utf-8"
);
console.log(`\n  Written: dist/validation-report.json`);

process.exit(passed ? 0 : 1);
