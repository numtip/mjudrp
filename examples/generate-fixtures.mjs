// Registry fixture generator — produces small (10), medium (100), large (1000) doc datasets
// Usage: node examples/generate-fixtures.mjs

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const CATEGORIES = ["strategic-plan", "guideline", "report", "template", "catalog", "policy", "meeting", "evidence", "announcement", "research"];
const PROJECTS = [
  { id: "green-office-2026", name: "Green Office 2026", dept: "Sustainability" },
  { id: "rae-landing", name: "RAE Landing", dept: "Research" },
  { id: "learning-center", name: "Learning Center", dept: "Education" },
  { id: "research-portal", name: "Research Portal", dept: "Research" },
];
const OWNERS = [
  { id: "owner-sustainability", name: "Sustainability Office" },
  { id: "owner-research", name: "Research Admin" },
  { id: "owner-learning", name: "Learning Center" },
];
const LANGUAGES = ["th", "en", "th", "th", "en"];
const FILE_TYPES = ["pdf", "docx", "xlsx", "pptx"];
const STORAGE_PROVIDERS = ["sharepoint", "onedrive", "teams"];
const STATUSES = ["draft", "review", "approved", "published", "archived"];
const VISIBILITIES = ["public", "internal", "confidential"];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN(arr, n) { const shuffled = [...arr].sort(() => Math.random() - 0.5); return shuffled.slice(0, n); }

function generateDoc(index, prefix, projectId) {
  const cat = pick(CATEGORIES);
  const owner = pick(OWNERS);
  const lang = pick(LANGUAGES);
  const ft = pick(FILE_TYPES);
  const sp = pick(STORAGE_PROVIDERS);
  const status = pick(STATUSES);
  const vis = pick(VISIBILITIES);
  const projRefs = projectId ? [projectId] : [pick(PROJECTS).id];

  return {
    id: `${prefix}-${String(index).padStart(4, "0")}`,
    title: `${cat.charAt(0).toUpperCase() + cat.slice(1)} Document ${index}`,
    description: `Auto-generated ${cat} document #${index} for fixture testing.`,
    category: cat,
    subcategory: index % 3 === 0 ? "general" : "specific",
    year: 2024 + (index % 3),
    fiscal_year: String(2567 + (index % 3)),
    version: `1.${index % 5}`,
    status,
    owner: owner.id,
    department: owner.name,
    keywords: [cat, "fixture", "test", `doc-${index}`],
    tags: [cat, status],
    language: lang,
    file_type: ft,
    file_size: 100000 + Math.floor(Math.random() * 5000000),
    storage_provider: sp,
    storage_path: `/sites/${cat}/${prefix}/${cat}_doc_${index}.${ft}`,
    share_url: `https://mju365.sharepoint.com/sites/${cat}/Shared%20Documents/${prefix}/${cat}_doc_${index}.${ft}`,
    preview_url: "",
    thumbnail_url: "",
    project_refs: projRefs,
    evidence_refs: [],
    related_documents: [],
    visibility: vis,
    created_at: `202${index % 3}-0${(index % 9) + 1}-0${(index % 28) + 1}T08:00:00Z`,
    updated_at: `202${index % 3}-0${(index % 9) + 1}-0${(index % 28) + 1}T10:30:00Z`,
  };
}

function buildFixture(count, prefix, projectId) {
  return Array.from({ length: count }, (_, i) => generateDoc(i + 1, prefix, projectId));
}

function writeFixture(dir, count, prefix, projectId) {
  const base = resolve(ROOT, dir);
  if (!existsSync(base)) mkdirSync(base, { recursive: true });

  const docs = buildFixture(count, prefix, projectId);
  writeFileSync(resolve(base, "documents.json"), JSON.stringify(docs, null, 2));

  const cats = CATEGORIES.map((c, i) => ({ id: c, name: c, description: `${c} category`, sort_order: i }));
  writeFileSync(resolve(base, "categories.json"), JSON.stringify(cats, null, 2));

  const projs = PROJECTS.map((p) => ({ ...p, status: "active", created_at: "2026-01-01T00:00:00Z" }));
  writeFileSync(resolve(base, "projects.json"), JSON.stringify(projs, null, 2));

  const ownrs = OWNERS.map((o) => ({ ...o, email: `${o.id}@mju.ac.th` }));
  writeFileSync(resolve(base, "owners.json"), JSON.stringify(ownrs, null, 2));

  console.log(`Created: ${dir}/ — ${count} documents`);
}

// Generate fixtures
writeFixture("examples/registry-small", 10, "SML", "green-office-2026");
writeFixture("examples/registry-medium", 100, "MED", "rae-landing");
writeFixture("examples/registry-large", 1000, "LRG", null);

console.log("\nFixture generation complete.");
