import { execSync } from "child_process";
import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");
const RELEASE = resolve(ROOT, "release");
const LATEST = resolve(RELEASE, "latest");
const PACKAGE = resolve(LATEST, "registry-package");
const V1 = resolve(RELEASE, "v1");

const PASS = "\x1b[32mPASS\x1b[0m";
const FAIL = "\x1b[31mFAIL\x1b[0m";

const steps = [];
let exitCode = 0;

function run(desc, cmd) {
  console.log(`\n[${steps.length + 1}] ${desc}`);
  try {
    execSync(cmd, { cwd: ROOT, stdio: "inherit" });
    console.log(`  ${PASS} ${desc}`);
    steps.push({ step: desc, status: "PASS" });
  } catch (e) {
    console.error(`  ${FAIL} ${desc}`);
    steps.push({ step: desc, status: "FAIL", error: e.message });
    exitCode = 1;
  }
}

function copyIfExists(src, dest) {
  if (existsSync(src)) {
    copyFileSync(src, dest);
    return true;
  }
  return false;
}

const NOW = new Date().toISOString();

console.log("=".repeat(60));
console.log("  MJU-DRP Release Pipeline");
console.log("=".repeat(60));

// Step 1: Validate registry
run("Validate Registry", "node scripts/validate-registry.mjs");

// Step 2: Generate search index and outputs
run("Generate Search Index", "node scripts/generate-search-index.mjs");

// Step 3: Run tests
run("Run Tests", "npm test");

if (exitCode === 0) {
  // Step 4: Ensure package directory
  console.log("\n[4] Create Package Directory");
  if (!existsSync(PACKAGE)) mkdirSync(PACKAGE, { recursive: true });
  console.log(`  ${PASS} Package directory ready`);

  // Step 5: Copy all dist outputs to package
  console.log("\n[5] Copy Package Artifacts");
  const distFiles = [
    "document-registry.json", "category-registry.json", "project-registry.json",
    "owner-registry.json", "evidence-registry.json", "relationship-registry.json",
    "search-index.json", "minisearch-index.json", "statistics.json",
    "validation-report.json", "performance-report.json", "manifest.json",
  ];
  let copied = 0;
  for (const f of distFiles) {
    if (copyIfExists(resolve(DIST, f), resolve(PACKAGE, f))) copied++;
  }
  console.log(`  ${PASS} Copied ${copied}/${distFiles.length} artifacts`);

  // Step 6: Create enhanced manifest
  console.log("\n[6] Enhance Manifest");
  const manifestPath = resolve(PACKAGE, "manifest.json");
  if (existsSync(manifestPath)) {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
    const docs = JSON.parse(readFileSync(resolve(PACKAGE, "document-registry.json"), "utf-8"));
    const stats = JSON.parse(readFileSync(resolve(PACKAGE, "statistics.json"), "utf-8"));
    const langCounts = {};
    for (const d of docs) {
      const lang = d.language || "th";
      langCounts[lang] = (langCounts[lang] || 0) + 1;
    }
    manifest.package_version = "1.0.0";
    manifest.category_count = stats.summary?.categories || 0;
    manifest.project_count = stats.summary?.projects || 0;
    manifest.relationship_count = stats.summary?.relationships || 0;
    manifest.evidence_count = stats.summary?.evidence || 0;
    manifest.language_summary = langCounts;
    manifest.consumer_compatibility = "v1.0";
    manifest.minimum_registry_version = "1.0";
    manifest.build_hash = crypto.createHash("sha256").update(JSON.stringify(manifest)).digest("hex").substring(0, 12);
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
    console.log(`  ${PASS} Manifest enhanced`);
  }

  // Step 7: Generate release notes
  console.log("\n[7] Generate Release Notes");
  run("Generate Release Notes", "node scripts/generate-release-notes.mjs");

  // Step 8: Generate checksums
  console.log("\n[8] Generate Checksums");
  run("Generate Checksums", "node scripts/generate-checksum.mjs");

  // Step 9: Validate package
  console.log("\n[9] Validate Package");
  run("Validate Package", "node scripts/validate-package.mjs");

  // Step 10: Copy to v1/ for versioned release
  console.log("\n[10] Copy to Versioned Release (v1/)");
  if (!existsSync(V1)) mkdirSync(V1, { recursive: true });
  const v1PkgDir = resolve(V1, "registry-package");
  if (!existsSync(v1PkgDir)) mkdirSync(v1PkgDir, { recursive: true });
  const pkgFiles = readFileSync ? [] : [];
  // Simple copy
  try {
    const files = [
      "document-registry.json", "category-registry.json", "project-registry.json",
      "owner-registry.json", "evidence-registry.json", "relationship-registry.json",
      "search-index.json", "minisearch-index.json", "statistics.json",
      "validation-report.json", "performance-report.json", "manifest.json",
      "release-notes.md", "checksum.json", "README.md",
    ];
    let v1Copied = 0;
    for (const f of files) {
      const src = resolve(PACKAGE, f);
      if (existsSync(src)) {
        const dest = resolve(v1PkgDir, f);
        copyFileSync(src, dest);
        v1Copied++;
      }
    }
    console.log(`  ${PASS} Copied ${v1Copied} artifacts to v1/`);
  } catch (e) {
    console.log(`  ${FAIL} v1 copy failed: ${e.message}`);
  }
}

// Summary
console.log("\n" + "=".repeat(60));
console.log("  Release Pipeline Summary");
console.log("=".repeat(60));
for (const s of steps) {
  const icon = s.status === "PASS" ? "\x1b[32m✅\x1b[0m" : "\x1b[31m❌\x1b[0m";
  console.log(`  ${icon} ${s.step}`);
}
console.log(`\n  Final Result: ${exitCode === 0 ? PASS : FAIL}`);
process.exit(exitCode);
