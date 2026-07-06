import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { resolve, dirname, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const EXPORTS_DIR = resolve(ROOT, "pilot/exports");
const GENERATED_DIR = resolve(ROOT, "pilot/generated");

// ── Ensure output dirs exist ──
for (const d of [GENERATED_DIR]) {
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
}

const PASS = "\x1b[32mPASS\x1b[0m";
const FAIL = "\x1b[31mFAIL\x1b[0m";
const WARN = "\x1b[33mWARN\x1b[0m";

const importReport = {
  timestamp: new Date().toISOString(),
  source: "",
  input_file: "",
  items_read: 0,
  items_converted: 0,
  errors: [],
  warnings: [],
  registry_compatible: false,
  output_files: [],
  summary: { errors: 0, warnings: 0, passed: false },
};

let totalErrors = 0;
let totalWarnings = 0;

function error(msg, detail) {
  console.error(`  ${FAIL}  ${msg}`);
  totalErrors++;
  importReport.errors.push(detail || msg);
}

function warn(msg, detail) {
  console.warn(`  ${WARN}  ${msg}`);
  totalWarnings++;
  importReport.warnings.push(detail || msg);
}

console.log("=".repeat(60));
console.log("  MJU-DRP Pilot Metadata Import");
console.log("=".repeat(60));
console.log();

// ── Find export files ──
function findExportFiles() {
  if (!existsSync(EXPORTS_DIR)) {
    error(`Export directory not found: ${EXPORTS_DIR}`);
    return { csv: null, json: null };
  }

  const files = readdirSync(EXPORTS_DIR);
  const csvFile = files.find((f) => f.endsWith(".csv") && f.includes("metadata"));
  const jsonFile = files.find((f) => f.endsWith(".json") && f.includes("metadata"));

  return {
    csv: csvFile ? resolve(EXPORTS_DIR, csvFile) : null,
    json: jsonFile ? resolve(EXPORTS_DIR, jsonFile) : null,
  };
}

const exportFiles = findExportFiles();

if (!exportFiles.csv && !exportFiles.json) {
  error("No export files found in pilot/exports/. Run export-pilot-metadata.ps1 first.");
  finalizeReport();
  process.exit(1);
}

console.log("  Found export files:");
if (exportFiles.csv) console.log(`    CSV:  ${exportFiles.csv}`);
if (exportFiles.json) console.log(`    JSON: ${exportFiles.json}`);
console.log();

// ── Parse JSON export ──
let exportedItems = [];

if (exportFiles.json) {
  importReport.source = "JSON";
  importReport.input_file = exportFiles.json;
  try {
    const raw = readFileSync(exportFiles.json, "utf-8");
    const parsed = JSON.parse(raw);
    exportedItems = parsed.items || parsed.documents || [];
    // If it's a top-level array, use as-is
    if (Array.isArray(parsed)) {
      exportedItems = parsed;
    }
    importReport.items_read = exportedItems.length;
    console.log(`  Read ${exportedItems.length} items from JSON export`);
  } catch (e) {
    error(`Failed to parse JSON export: ${e.message}`);
  }
} else if (exportFiles.csv) {
  importReport.source = "CSV";
  importReport.input_file = exportFiles.csv;
  try {
    const csvRaw = readFileSync(exportFiles.csv, "utf-8");
    const lines = csvRaw.trim().split("\n");
    if (lines.length < 2) {
      error("CSV has no data rows (header only or empty)");
    } else {
      const headers = lines[0].split(",").map((h) => h.trim());
      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length !== headers.length) {
          warn(`CSV row ${i + 1}: column count mismatch (${values.length} vs ${headers.length})`, { row: i + 1, values });
          continue;
        }
        const item = {};
        for (let j = 0; j < headers.length; j++) {
          item[headers[j]] = values[j];
        }
        exportedItems.push(item);
      }
      importReport.items_read = exportedItems.length;
      console.log(`  Read ${exportedItems.length} items from CSV export`);
    }
  } catch (e) {
    error(`Failed to parse CSV export: ${e.message}`);
  }
}

// ── Convert to registry-compatible format ──
console.log();
console.log("--- Converting to Registry-Compatible Format ---");

const registryDocs = [];
const registryEvidence = [];
const fieldMap = {
  "DRP Document ID": "id",
  "Title": "title",
  "Description": "description",
  "Category": "category",
  "Subcategory": "subcategory",
  "Fiscal Year": "fiscal_year",
  "Year": "year",
  "Version": "version",
  "Status": "status",
  "Owner": "owner",
  "Department": "department",
  "Language": "language",
  "Visibility": "visibility",
  "Share URL": "share_url",
  "Storage Path": "storage_path",
  "File Type": "file_type",
};

const arrayFields = ["Keywords", "Tags", "Project Refs", "Evidence Refs", "Related Documents"];

for (const item of exportedItems) {
  try {
    const doc = {};

    // Map scalar fields
    for (const [csvField, regField] of Object.entries(fieldMap)) {
      if (item[csvField] !== undefined && item[csvField] !== "") {
        if (regField === "year") {
          doc[regField] = parseInt(item[csvField], 10) || item[csvField];
        } else {
          doc[regField] = item[csvField];
        }
      }
    }

    // Map array fields (comma or semicolon separated)
    for (const csvField of arrayFields) {
      const regField = csvField
        .replace(/\s+/g, "_")
        .toLowerCase()
        .replace(/_refs$/, "_refs")
        .replace(/_documents$/, "_documents");
      if (item[csvField] !== undefined && item[csvField] !== "") {
        doc[regField] = item[csvField]
          .split(/[,;]/)
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      }
    }

    // Handle keywords and tags explicitly
    if (item["Keywords"] !== undefined && item["Keywords"] !== "") {
      doc.keywords = item["Keywords"].split(",").map((s) => s.trim()).filter((s) => s);
    }
    if (item["Tags"] !== undefined && item["Tags"] !== "") {
      doc.tags = item["Tags"].split(",").map((s) => s.trim()).filter((s) => s);
    }
    if (item["Project Refs"] !== undefined && item["Project Refs"] !== "") {
      doc.project_refs = item["Project Refs"].split(";").map((s) => s.trim()).filter((s) => s);
    }
    if (item["Evidence Refs"] !== undefined && item["Evidence Refs"] !== "") {
      doc.evidence_refs = item["Evidence Refs"].split(";").map((s) => s.trim()).filter((s) => s);
    }
    if (item["Related Documents"] !== undefined && item["Related Documents"] !== "") {
      doc.related_documents = item["Related Documents"].split(";").map((s) => s.trim()).filter((s) => s);
    }

    // Add metadata
    doc.storage_provider = "sharepoint";
    doc.created_at = new Date().toISOString();
    doc.updated_at = new Date().toISOString();

    // Determine if document or evidence based on ID prefix
    if (doc.id && doc.id.startsWith("EVD-")) {
      registryEvidence.push(doc);
    } else {
      registryDocs.push(doc);
    }
  } catch (e) {
    error(`Failed to convert item "${item.id || "unknown"}": ${e.message}`, { item, error: e.message });
  }
}

importReport.items_converted = registryDocs.length + registryEvidence.length;
console.log(`  Converted ${registryDocs.length} documents and ${registryEvidence.length} evidence items`);

// ── Write output ──
console.log();
console.log("--- Writing Outputs ---");

const documentsOutput = resolve(GENERATED_DIR, "documents.pilot.json");
const reportOutput = resolve(GENERATED_DIR, "import-report.json");

const pilotOutput = {
  timestamp: new Date().toISOString(),
  source: importReport.input_file,
  documents: registryDocs,
  evidence: registryEvidence,
  total_documents: registryDocs.length,
  total_evidence: registryEvidence.length,
};

writeFileSync(documentsOutput, JSON.stringify(pilotOutput, null, 2), "utf-8");
importReport.output_files.push(documentsOutput);
console.log(`  Written: ${documentsOutput}`);

// ── Finalize report ──
importReport.registry_compatible = totalErrors === 0;
importReport.summary = {
  errors: totalErrors,
  warnings: totalWarnings,
  passed: totalErrors === 0,
};

writeFileSync(reportOutput, JSON.stringify(importReport, null, 2), "utf-8");
importReport.output_files.push(reportOutput);
console.log(`  Written: ${reportOutput}`);

console.log();
console.log("=".repeat(60));
console.log("  Import Summary");
console.log("=".repeat(60));
console.log(`  Items read:       ${importReport.items_read}`);
console.log(`  Items converted:  ${importReport.items_converted}`);
console.log(`  Errors:           ${totalErrors}`);
console.log(`  Warnings:         ${totalWarnings}`);
console.log(`  Registry Compat:  ${importReport.registry_compatible ? PASS : FAIL}`);
console.log();

finalizeReport();

function finalizeReport() {
  if (totalErrors > 0) {
    console.log(`  Result: ${FAIL}`);
  } else {
    console.log(`  Result: ${PASS}`);
  }
}

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}
