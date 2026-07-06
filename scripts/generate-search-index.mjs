import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");

const DOCUMENTS_PATH = resolve(ROOT, "registry/documents.sample.json");

if (!existsSync(DOCUMENTS_PATH)) {
  console.error("Error: registry/documents.sample.json not found");
  process.exit(1);
}

const raw = readFileSync(DOCUMENTS_PATH, "utf-8");
let documents;

try {
  documents = JSON.parse(raw);
} catch (e) {
  console.error("Error: Invalid JSON in documents.sample.json:", e.message);
  process.exit(1);
}

if (!Array.isArray(documents)) {
  console.error("Error: documents.sample.json must be an array");
  process.exit(1);
}

// Ensure dist directory exists
if (!existsSync(DIST)) {
  mkdirSync(DIST, { recursive: true });
}

// Generate search index
const searchIndex = documents.map((doc) => ({
  id: doc.id,
  title: doc.title,
  description: doc.description || "",
  keywords: doc.keywords || [],
  tags: doc.tags || [],
  category: doc.category || "",
  year: doc.year || null,
  project_refs: doc.project_refs || [],
  evidence_refs: doc.evidence_refs || [],
}));

writeFileSync(
  resolve(DIST, "search-index.json"),
  JSON.stringify(searchIndex, null, 2),
  "utf-8"
);

console.log(`Generated search-index.json with ${searchIndex.length} entries`);

// Generate normalized document registry
const documentRegistry = documents.map((doc) => ({
  id: doc.id,
  title: doc.title,
  description: doc.description || "",
  category: doc.category,
  subcategory: doc.subcategory || null,
  year: doc.year,
  fiscal_year: doc.fiscal_year || null,
  version: doc.version || "1.0",
  status: doc.status || "draft",
  owner: doc.owner,
  department: doc.department || null,
  keywords: doc.keywords || [],
  tags: doc.tags || [],
  language: doc.language || "th",
  file_type: doc.file_type || null,
  file_size: doc.file_size || null,
  storage_provider: doc.storage_provider,
  storage_path: doc.storage_path,
  share_url: doc.share_url,
  preview_url: doc.preview_url || null,
  thumbnail_url: doc.thumbnail_url || null,
  project_refs: doc.project_refs || [],
  evidence_refs: doc.evidence_refs || [],
  related_documents: doc.related_documents || [],
  visibility: doc.visibility || "internal",
  created_at: doc.created_at || null,
  updated_at: doc.updated_at || null,
}));

writeFileSync(
  resolve(DIST, "document-registry.json"),
  JSON.stringify(documentRegistry, null, 2),
  "utf-8"
);

console.log(`Generated document-registry.json with ${documentRegistry.length} entries`);
console.log("Done.");
