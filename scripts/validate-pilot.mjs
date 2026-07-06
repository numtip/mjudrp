import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const GENERATED_DIR = resolve(ROOT, "pilot/generated");

// ── Ensure output dir exists ──
if (!existsSync(GENERATED_DIR)) mkdirSync(GENERATED_DIR, { recursive: true });

const PASS = "\x1b[32mPASS\x1b[0m";
const FAIL = "\x1b[31mFAIL\x1b[0m";
const WARN = "\x1b[33mWARN\x1b[0m";

const validationReport = {
  timestamp: new Date().toISOString(),
  source_file: "",
  checks: {
    required_metadata: { passed: 0, failed: 0, errors: [] },
    category_mapping: { passed: 0, failed: 0, errors: [] },
    project_refs: { passed: 0, failed: 0, errors: [] },
    owner_refs: { passed: 0, failed: 0, errors: [] },
    evidence_refs: { passed: 0, failed: 0, errors: [] },
    sharepoint_urls: { passed: 0, failed: 0, errors: [] },
    duplicate_ids: { passed: 0, failed: 0, errors: [] },
  },
  documents_checked: 0,
  errors: [],
  warnings: [],
  summary: { errors: 0, warnings: 0, passed: false },
};

const REQUIRED_FIELDS = [
  "id", "title", "category", "status", "owner", "visibility",
];

const KNOWN_CATEGORIES = [
  "strategic-plan", "guideline", "report", "policy", "assessment",
  "manual", "template", "evidence", "minutes", "presentation",
  "form", "certificate", "correspondence", "other",
];

const KNOWN_PROJECTS = [
  "green-office-2026", "rae-landing", "learning-center",
  "research-portal", "sustainability-office",
];

const KNOWN_OWNERS = [
  "owner-sustainability", "owner-research", "owner-learning-center",
  "owner-green-office", "owner-administration", "owner-compliance",
];

let totalErrors = 0;
let totalWarnings = 0;

function addError(check, message) {
  totalErrors++;
  validationReport.errors.push(message);
  validationReport.checks[check].failed++;
  validationReport.checks[check].errors.push(message);
}

function addWarning(message) {
  totalWarnings++;
  validationReport.warnings.push(message);
}

function printCheck(name, passed, failed) {
  const icon = failed === 0 ? PASS : FAIL;
  console.log(`  ${icon}  ${name}: ${passed} passed, ${failed} failed`);
}

console.log("=".repeat(60));
console.log("  MJU-DRP Pilot Validation");
console.log("=".repeat(60));
console.log();

// ── Load pilot data ──
const pilotDataPath = resolve(GENERATED_DIR, "documents.pilot.json");
if (!existsSync(pilotDataPath)) {
  console.error(`  ${FAIL}  Pilot data not found: ${pilotDataPath}`);
  console.error("  Run scripts/import-pilot-metadata.mjs first");
  finalizeReport();
  process.exit(1);
}

const pilotRaw = readFileSync(pilotDataPath, "utf-8");
let pilotData;
try {
  pilotData = JSON.parse(pilotRaw);
} catch (e) {
  console.error(`  ${FAIL}  Invalid JSON: ${pilotDataPath} — ${e.message}`);
  finalizeReport();
  process.exit(1);
}

validationReport.source_file = pilotDataPath;

const docs = pilotData.documents || [];
const evidence = pilotData.evidence || [];
const allItems = [...docs, ...evidence];
validationReport.documents_checked = allItems.length;

console.log(`  Loaded ${allItems.length} items for validation (${docs.length} docs, ${evidence.length} evidence)`);
console.log();

// ── Check 1: Required Metadata ──
console.log("--- Check 1: Required Metadata ---");

for (const item of allItems) {
  const missing = [];
  for (const field of REQUIRED_FIELDS) {
    if (!item[field] || item[field] === "" || (Array.isArray(item[field]) && item[field].length === 0)) {
      missing.push(field);
    }
  }
  if (missing.length > 0) {
    addError("required_metadata", `"${item.id || "unknown"}": missing required fields: ${missing.join(", ")}`);
  } else {
    validationReport.checks.required_metadata.passed++;
  }
}

printCheck("Required Metadata",
  validationReport.checks.required_metadata.passed,
  validationReport.checks.required_metadata.failed
);

// ── Check 2: Category Mapping ──
console.log("--- Check 2: Category Mapping ---");

for (const item of allItems) {
  if (item.category && !KNOWN_CATEGORIES.includes(item.category)) {
    addWarning(`"${item.id}": unknown category "${item.category}"`);
  }
  // Subcategory should not be empty if category is set
  if (item.category && (!item.subcategory || item.subcategory === "")) {
    addWarning(`"${item.id}": no subcategory for category "${item.category}"`);
  }
  validationReport.checks.category_mapping.passed++;
}

printCheck("Category Mapping",
  validationReport.checks.category_mapping.passed,
  validationReport.checks.category_mapping.failed
);

// ── Check 3: Project Refs ──
console.log("--- Check 3: Project References ---");

for (const item of allItems) {
  if (item.project_refs && Array.isArray(item.project_refs)) {
    for (const pr of item.project_refs) {
      if (!KNOWN_PROJECTS.includes(pr)) {
        addWarning(`"${item.id}": unknown project ref "${pr}"`);
      }
    }
  }
  validationReport.checks.project_refs.passed++;
}

printCheck("Project Refs",
  validationReport.checks.project_refs.passed,
  validationReport.checks.project_refs.failed
);

// ── Check 4: Owner Refs ──
console.log("--- Check 4: Owner References ---");

for (const item of allItems) {
  if (item.owner && !KNOWN_OWNERS.includes(item.owner)) {
    addWarning(`"${item.id}": unknown owner "${item.owner}"`);
  }
  validationReport.checks.owner_refs.passed++;
}

printCheck("Owner Refs",
  validationReport.checks.owner_refs.passed,
  validationReport.checks.owner_refs.failed
);

// ── Check 5: Evidence Refs ──
console.log("--- Check 5: Evidence References ---");

const evidenceIds = new Set(evidence.map((e) => e.id));

for (const item of allItems) {
  if (item.evidence_refs && Array.isArray(item.evidence_refs)) {
    for (const er of item.evidence_refs) {
      if (!evidenceIds.has(er)) {
        addWarning(`"${item.id}": evidence ref "${er}" not found in evidence items`);
      }
    }
  }
  validationReport.checks.evidence_refs.passed++;
}

printCheck("Evidence Refs",
  validationReport.checks.evidence_refs.passed,
  validationReport.checks.evidence_refs.failed
);

// ── Check 6: SharePoint URL Placeholders ──
console.log("--- Check 6: SharePoint URL Placeholders ---");

for (const item of allItems) {
  if (item.share_url) {
    if (item.share_url.includes("__TENANT_HOSTNAME__")) {
      addWarning(`"${item.id}": share_url contains unresolved placeholder __TENANT_HOSTNAME__`);
    }
    if (!item.share_url.startsWith("https://")) {
      addWarning(`"${item.id}": share_url does not start with https://`);
    }
  }
  if (item.storage_path && !item.storage_path.startsWith("/")) {
    addWarning(`"${item.id}": storage_path should start with /`);
  }
  validationReport.checks.sharepoint_urls.passed++;
}

printCheck("SharePoint URLs",
  validationReport.checks.sharepoint_urls.passed,
  validationReport.checks.sharepoint_urls.failed
);

// ── Check 7: Duplicate Document IDs ──
console.log("--- Check 7: Duplicate Document IDs ---");

const seenIds = new Map();
for (const item of allItems) {
  if (item.id) {
    if (seenIds.has(item.id)) {
      addError("duplicate_ids", `Duplicate ID "${item.id}" (first at index ${seenIds.get(item.id)}, duplicate at current)`);
    } else {
      seenIds.set(item.id, allItems.indexOf(item));
      validationReport.checks.duplicate_ids.passed++;
    }
  }
}

printCheck("Duplicate IDs",
  validationReport.checks.duplicate_ids.passed,
  validationReport.checks.duplicate_ids.failed
);

// ── Summary ──
console.log();
console.log("=".repeat(60));
console.log("  Validation Summary");
console.log("=".repeat(60));
console.log(`  Documents checked:  ${allItems.length}`);
console.log(`  Required metadata:  ${validationReport.checks.required_metadata.passed}/${allItems.length}`);
console.log(`  Category mapping:   ${validationReport.checks.category_mapping.passed}/${allItems.length}`);
console.log(`  Project refs:       ${validationReport.checks.project_refs.passed}/${allItems.length}`);
console.log(`  Owner refs:         ${validationReport.checks.owner_refs.passed}/${allItems.length}`);
console.log(`  Evidence refs:      ${validationReport.checks.evidence_refs.passed}/${allItems.length}`);
console.log(`  SharePoint URLs:    ${validationReport.checks.sharepoint_urls.passed}/${allItems.length}`);
console.log(`  Duplicate IDs:      ${validationReport.checks.duplicate_ids.passed}/${allItems.length}`);
console.log(`  Errors:             ${totalErrors}`);
console.log(`  Warnings:           ${totalWarnings}`);

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
const reportPath = resolve(GENERATED_DIR, "validation-report.json");
writeFileSync(reportPath, JSON.stringify(validationReport, null, 2), "utf-8");
console.log(`\n  Written: ${reportPath}`);

finalizeReport();

function finalizeReport() {
  process.exit(passed ? 0 : 1);
}
