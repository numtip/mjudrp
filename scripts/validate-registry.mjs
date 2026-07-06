import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const REGISTRY_FILES = [
  { path: "registry/documents.sample.json", label: "Documents" },
  { path: "registry/categories.sample.json", label: "Categories" },
  { path: "registry/projects.sample.json", label: "Projects" },
  { path: "registry/owners.sample.json", label: "Owners" },
  { path: "registry/evidence-map.sample.json", label: "Evidence Map" },
];

const REQUIRED_DOC_FIELDS = [
  "id", "title", "category", "owner", "storage_provider",
  "storage_path", "share_url", "project_refs",
];

const PASS = "\x1b[32mPASS\x1b[0m";
const FAIL = "\x1b[31mFAIL\x1b[0m";
const WARN = "\x1b[33mWARN\x1b[0m";

let totalErrors = 0;
let totalWarnings = 0;

function error(msg) {
  console.error(`  ${FAIL}  ${msg}`);
  totalErrors++;
}

function warn(msg) {
  console.error(`  ${WARN}  ${msg}`);
  totalWarnings++;
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

console.log("=".repeat(60));
console.log("  MJU-DRP Registry Validation");
console.log("=".repeat(60));
console.log();

// Load all registry files
const registry = {};
for (const { path, label } of REGISTRY_FILES) {
  const data = readJSON(path);
  registry[label] = data;
  if (data !== null) {
    console.log(`  ${PASS}  Loaded ${label} (${data.length} entries)`);
  }
}

console.log();

// Validate documents
console.log("--- Document Validation ---");
const docs = registry["Documents"];
if (docs && Array.isArray(docs)) {
  const docIds = new Set();
  const evidenceIds = registry["Evidence Map"]
    ? new Set(registry["Evidence Map"].map((e) => e.id))
    : new Set();
  const projectIds = registry["Projects"]
    ? new Set(registry["Projects"].map((p) => p.id))
    : new Set();
  const categoryIds = registry["Categories"]
    ? new Set(registry["Categories"].map((c) => c.id))
    : new Set();
  const ownerIds = registry["Owners"]
    ? new Set(registry["Owners"].map((o) => o.id))
    : new Set();

  for (const doc of docs) {
    // Required fields
    for (const field of REQUIRED_DOC_FIELDS) {
      if (!doc[field] || (Array.isArray(doc[field]) && doc[field].length === 0)) {
        error(`Document "${doc.id || "?"}": Missing required field "${field}"`);
      }
    }

    // Duplicate ID check
    if (docIds.has(doc.id)) {
      error(`Document "${doc.id}": Duplicate document ID`);
    }
    docIds.add(doc.id);

    // Missing share_url
    if (!doc.share_url) {
      error(`Document "${doc.id}": Missing share_url`);
    }

    // Missing owner
    if (!doc.owner) {
      error(`Document "${doc.id}": Missing owner`);
    } else if (!ownerIds.has(doc.owner)) {
      warn(`Document "${doc.id}": Owner "${doc.owner}" not found in owners registry`);
    }

    // Missing project_refs
    if (!doc.project_refs || doc.project_refs.length === 0) {
      error(`Document "${doc.id}": Missing project_refs`);
    } else {
      for (const pr of doc.project_refs) {
        if (!projectIds.has(pr)) {
          warn(`Document "${doc.id}": Project ref "${pr}" not found in projects registry`);
        }
      }
    }

    // Missing category
    if (!doc.category) {
      error(`Document "${doc.id}": Missing category`);
    } else if (!categoryIds.has(doc.category)) {
      warn(`Document "${doc.id}": Category "${doc.category}" not found in categories registry`);
    }

    // Evidence refs validation
    if (doc.evidence_refs && doc.evidence_refs.length > 0) {
      for (const er of doc.evidence_refs) {
        if (!evidenceIds.has(er)) {
          warn(`Document "${doc.id}": Evidence ref "${er}" not found in evidence-map registry`);
        }
      }
    }
  }
  console.log(`  Checked ${docs.length} documents`);
} else {
  error("Documents data is missing or not an array");
}

// Validate evidence map cross-references
console.log();
console.log("--- Evidence Map Validation ---");
const evMap = registry["Evidence Map"];
if (evMap && Array.isArray(evMap)) {
  for (const ev of evMap) {
    if (!ev.project_ref) {
      error(`Evidence "${ev.id}": Missing project_ref`);
    }
    if (!ev.document_refs || ev.document_refs.length === 0) {
      error(`Evidence "${ev.id}": Missing document_refs`);
    }
  }
  console.log(`  Checked ${evMap.length} evidence mappings`);
}

// Summary
console.log();
console.log("=".repeat(60));
console.log("  Validation Summary");
console.log("=".repeat(60));
console.log(`  Errors:   ${totalErrors}`);
console.log(`  Warnings: ${totalWarnings}`);
console.log();

if (totalErrors > 0) {
  console.log(`  Result: ${FAIL}`);
  process.exit(1);
} else {
  console.log(`  Result: ${PASS}`);
  process.exit(0);
}
