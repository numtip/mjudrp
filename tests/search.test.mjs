// Test: MiniSearch integration
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import MiniSearch from "minisearch";

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

// Test 1: MiniSearch index file exists
console.log("\n--- MiniSearch Index Existence ---");
const miniIndexPath = resolve(ROOT, "dist/minisearch-index.json");
assert(existsSync(miniIndexPath), "minisearch-index.json exists");

// Test 2: Can load and use MiniSearch index
console.log("\n--- MiniSearch Index Loading ---");
let miniSearch;
const msFields = ["title", "description", "keywords"];
const msStoreFields = ["id", "title", "category", "file_type", "year", "status", "language"];
try {
  const raw = readFileSync(miniIndexPath, "utf-8");
  miniSearch = MiniSearch.loadJSON(raw, { fields: msFields, storeFields: msStoreFields });
  assert(true, "MiniSearch index loads without error");
} catch (e) {
  assert(false, `MiniSearch index loads: ${e.message}`);
}

// Test 3: English search
console.log("\n--- English Search ---");
if (miniSearch) {
  const results = miniSearch.search("Green Office");
  assert(results.length > 0, `"Green Office" returns ${results.length} results`);
  if (results.length > 0) {
    console.log(`       Top result: ${results[0].id} (score: ${results[0].score.toFixed(2)})`);
  }
}

// Test 4: Fuzzy search
console.log("\n--- Fuzzy Search ---");
if (miniSearch) {
  const results = miniSearch.search("Gren", { fuzzy: 0.2 });
  assert(results.length > 0, `"Gren" (fuzzy) returns ${results.length} results`);
}

// Test 5: Empty/no-match queries
console.log("\n--- Edge Cases ---");
if (miniSearch) {
  const empty = miniSearch.search("");
  assert(empty.length === 0, "Empty query returns 0 results");
  const noMatch = miniSearch.search("ZZZZNOTEXIST");
  assert(noMatch.length === 0, "No-match query returns 0 results");
}

// Test 6: Large fixture search
console.log("\n--- Large Fixture Search ---");
try {
  const largeDocs = JSON.parse(readFileSync(resolve(ROOT, "examples/registry-large/documents.json"), "utf-8"));
  const ms = new MiniSearch({ fields: ["title", "description", "keywords"], storeFields: ["id", "title"] });

  const t0 = Date.now();
  ms.addAll(largeDocs);
  const indexTime = Date.now() - t0;

  const t1 = Date.now();
  const results = ms.search("Guideline");
  const searchTime = Date.now() - t1;

  assert(indexTime < 1000, `Index ${largeDocs.length} docs in ${indexTime}ms (< 1000ms)`);
  assert(results.length > 0, `"Guideline" returns ${results.length} results`);
  console.log(`       Index time: ${indexTime}ms, Search time: ${searchTime}ms`);

  // Index size
  const exported = JSON.stringify(ms);
  assert(exported.length < 5 * 1024 * 1024, `Index size: ${(exported.length / 1024).toFixed(0)}KB (< 5MB)`);
} catch (e) {
  console.error(`  Skipping large fixture test: ${e.message}`);
}

// Summary
console.log("\n" + "=".repeat(40));
console.log(`Search Tests: ${passed} passed, ${failed} failed`);
console.log("=".repeat(40));
process.exit(failed > 0 ? 1 : 0);
