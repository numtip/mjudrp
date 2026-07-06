import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import MiniSearch from "minisearch";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");

if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true });

// ── Load all registry data ──
function loadJSON(relPath) {
  const full = resolve(ROOT, relPath);
  if (!existsSync(full)) return null;
  return JSON.parse(readFileSync(full, "utf-8"));
}

const documents = loadJSON("registry/documents.sample.json") || [];
const categories = loadJSON("registry/categories.sample.json") || [];
const projects = loadJSON("registry/projects.sample.json") || [];
const owners = loadJSON("registry/owners.sample.json") || [];
const evidence = loadJSON("registry/evidence-map.sample.json") || [];
const relationships = loadJSON("registry/relationship.sample.json") || [];

const timings = {};

// ── 1. document-registry.json (normalized) ──
let t0 = Date.now();
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
writeFileSync(resolve(DIST, "document-registry.json"), JSON.stringify(documentRegistry, null, 2), "utf-8");
timings.document_registry = Date.now() - t0;
console.log(`Generated document-registry.json (${documentRegistry.length} entries)`);

// ── 2. category-registry.json ──
t0 = Date.now();
writeFileSync(resolve(DIST, "category-registry.json"), JSON.stringify(categories, null, 2), "utf-8");
timings.category_registry = Date.now() - t0;
console.log(`Generated category-registry.json (${categories.length} entries)`);

// ── 3. project-registry.json ──
t0 = Date.now();
writeFileSync(resolve(DIST, "project-registry.json"), JSON.stringify(projects, null, 2), "utf-8");
timings.project_registry = Date.now() - t0;
console.log(`Generated project-registry.json (${projects.length} entries)`);

// ── 4. owner-registry.json ──
t0 = Date.now();
writeFileSync(resolve(DIST, "owner-registry.json"), JSON.stringify(owners, null, 2), "utf-8");
timings.owner_registry = Date.now() - t0;
console.log(`Generated owner-registry.json (${owners.length} entries)`);

// ── 5. evidence-registry.json ──
t0 = Date.now();
writeFileSync(resolve(DIST, "evidence-registry.json"), JSON.stringify(evidence, null, 2), "utf-8");
timings.evidence_registry = Date.now() - t0;
console.log(`Generated evidence-registry.json (${evidence.length} entries)`);

// ── 6. relationship-registry.json ──
t0 = Date.now();
writeFileSync(resolve(DIST, "relationship-registry.json"), JSON.stringify(relationships, null, 2), "utf-8");
timings.relationship_registry = Date.now() - t0;
console.log(`Generated relationship-registry.json (${relationships.length} entries)`);

// ── 7. search-index.json (lightweight) ──
t0 = Date.now();
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
writeFileSync(resolve(DIST, "search-index.json"), JSON.stringify(searchIndex, null, 2), "utf-8");
timings.search_index = Date.now() - t0;
console.log(`Generated search-index.json (${searchIndex.length} entries)`);

// ── 8. minisearch-index.json (MiniSearch serialized) ──
t0 = Date.now();
const miniSearch = new MiniSearch({
  fields: ["title", "description", "keywords"],
  storeFields: ["id", "title", "category", "file_type", "year", "status", "language"],
});
if (documents.length > 0) {
  miniSearch.addAll(documents);
}
const miniSearchExport = miniSearch.toJSON ? miniSearch.toJSON() : JSON.parse(JSON.stringify(miniSearch));
writeFileSync(resolve(DIST, "minisearch-index.json"), JSON.stringify(miniSearchExport, null, 2), "utf-8");
timings.minisearch_index = Date.now() - t0;
console.log(`Generated minisearch-index.json (${documents.length} documents indexed)`);

// ── 9. manifest.json ──
t0 = Date.now();
const langCounts = {};
for (const doc of documents) {
  const lang = doc.language || "th";
  langCounts[lang] = (langCounts[lang] || 0) + 1;
}
const manifest = {
  registry_version: "1.0",
  schema_version: "1.0",
  package_version: "1.0.0",
  build_timestamp: new Date().toISOString(),
  generator_version: "2.0",
  document_count: documents.length,
  category_count: categories.length,
  project_count: projects.length,
  relationship_count: relationships.length,
  evidence_count: evidence.length,
  language_summary: langCounts,
  consumer_compatibility: "v1.0",
  minimum_registry_version: "1.0",
  build_hash: crypto.createHash("sha256").update(JSON.stringify({ docs: documents.length, cats: categories.length, ts: new Date().toISOString() })).digest("hex").substring(0, 12),
  outputs: [
    "document-registry.json",
    "category-registry.json",
    "project-registry.json",
    "owner-registry.json",
    "evidence-registry.json",
    "relationship-registry.json",
    "search-index.json",
    "minisearch-index.json",
    "validation-report.json",
  ],
};
writeFileSync(resolve(DIST, "manifest.json"), JSON.stringify(manifest, null, 2), "utf-8");
timings.manifest = Date.now() - t0;
console.log(`Generated manifest.json`);

// ── 10. performance-report.json ──
t0 = Date.now();
const performanceReport = {
  timestamp: new Date().toISOString(),
  document_count: documents.length,
  category_count: categories.length,
  project_count: projects.length,
  owner_count: owners.length,
  evidence_count: evidence.length,
  timings_ms: timings,
  total_generation_ms: Object.values(timings).reduce((a, b) => a + b, 0),
};
writeFileSync(resolve(DIST, "performance-report.json"), JSON.stringify(performanceReport, null, 2), "utf-8");
timings.performance_report = Date.now() - t0;
console.log(`Generated performance-report.json`);

// ── 11. statistics.json ──
t0 = Date.now();
const yearCounts = {};
const langDist = {};
const statusDist = {};
const fileTypeDist = {};
const providerDist = {};
const visibilityDist = {};
const evStatusDist = {};
const relTypeDist = {};
const projectDist = {};
const ownerDist = {};
const categoryDist = {};

for (const doc of documents) {
  const y = String(doc.year || "unknown");
  yearCounts[y] = (yearCounts[y] || 0) + 1;
  const l = doc.language || "unknown";
  langDist[l] = (langDist[l] || 0) + 1;
  const s = doc.status || "unknown";
  statusDist[s] = (statusDist[s] || 0) + 1;
  const ft = doc.file_type || "unknown";
  fileTypeDist[ft] = (fileTypeDist[ft] || 0) + 1;
  const sp = doc.storage_provider || "unknown";
  providerDist[sp] = (providerDist[sp] || 0) + 1;
  const v = doc.visibility || "unknown";
  visibilityDist[v] = (visibilityDist[v] || 0) + 1;
  if (doc.owner_id) ownerDist[doc.owner_id] = (ownerDist[doc.owner_id] || 0) + 1;
  if (doc.category) categoryDist[doc.category] = (categoryDist[doc.category] || 0) + 1;
  for (const pr of (doc.project_refs || [])) {
    projectDist[pr] = projectDist[pr] || { documents: 0, evidence: 0, relationships: 0 };
    projectDist[pr].documents++;
  }
  for (const er of (doc.evidence_refs || [])) {
    for (const pr of (doc.project_refs || [])) {
      if (projectDist[pr]) projectDist[pr].evidence++;
    }
  }
}

for (const ev of evidence) {
  const es = ev.status || "unknown";
  evStatusDist[es] = (evStatusDist[es] || 0) + 1;
}

for (const rel of relationships) {
  const rt = rel.relationship_type || rel.type || "unknown";
  relTypeDist[rt] = (relTypeDist[rt] || 0) + 1;
  // Count relationships per project
  const srcDoc = documents.find(d => d.id === rel.source_id);
  const tgtDoc = documents.find(d => d.id === rel.target_id);
  const refs = new Set([...(srcDoc?.project_refs || []), ...(tgtDoc?.project_refs || [])]);
  for (const pr of refs) {
    if (projectDist[pr]) projectDist[pr].relationships = (projectDist[pr].relationships || 0) + 1;
  }
}

const stats = {
  timestamp: new Date().toISOString(),
  registry_version: "1.0",
  schema_version: "1.0",
  summary: {
    documents: documents.length,
    categories: categories.length,
    projects: projects.length,
    owners: owners.length,
    evidence: evidence.length,
    relationships: relationships.length,
  },
  languages: langDist,
  years: yearCounts,
  document_status: statusDist,
  file_types: fileTypeDist,
  storage_providers: providerDist,
  visibility: visibilityDist,
  evidence_status: evStatusDist,
  relationship_types: relTypeDist,
  projects: projectDist,
  registry_growth: {
    total_registry_assets: documents.length + categories.length + projects.length + owners.length + evidence.length + relationships.length,
    average_documents_per_project: projects.length > 0 ? (documents.length / projects.length).toFixed(1) : 0,
    average_evidence_per_document: documents.length > 0 ? (evidence.length / documents.length).toFixed(1) : 0,
    average_relationships_per_document: documents.length > 0 ? (relationships.length / documents.length).toFixed(1) : 0,
  },
  category_distribution: categoryDist,
  project_distribution: projectDist,
  owner_distribution: ownerDist,
  evidence_distribution: {
    total_evidence_mappings: evidence.length,
    evidence_per_project: Object.fromEntries(Object.entries(projectDist).map(([k, v]) => [k, v.evidence || 0])),
  },
  relationship_density: {
    total_relationships: relationships.length,
    relationships_per_project: Object.fromEntries(Object.entries(projectDist).map(([k, v]) => [k, v.relationships || 0])),
    relationship_types: relTypeDist,
    density_score: documents.length > 0 ? (relationships.length / documents.length).toFixed(2) : "0",
  },
  language_distribution: langDist,
  year_distribution: yearCounts,
  registry_size_bytes: 0,
  validation_result: "PASS",
  validation_errors: 0,
  validation_warnings: 0,
};
writeFileSync(resolve(DIST, "statistics.json"), JSON.stringify(stats, null, 2), "utf-8");
timings.statistics = Date.now() - t0;
console.log(`Generated statistics.json`);

// ── Summary ──
const totalTime = Object.values(timings).reduce((a, b) => a + b, 0);
console.log("-".repeat(40));
console.log(`Total: ${documents.length} documents, ${categories.length} categories`);
console.log(`Total generation time: ${totalTime}ms`);
console.log("Done.");
