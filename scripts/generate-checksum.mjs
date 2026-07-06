import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");
const PACKAGE = resolve(ROOT, "release", "latest", "registry-package");

[PACKAGE, DIST].forEach(d => { if (!existsSync(d)) mkdirSync(d, { recursive: true }); });

// Files to checksum — all dist outputs
const PACKAGE_FILES = [
  "document-registry.json",
  "category-registry.json",
  "project-registry.json",
  "owner-registry.json",
  "evidence-registry.json",
  "relationship-registry.json",
  "search-index.json",
  "minisearch-index.json",
  "statistics.json",
  "validation-report.json",
  "performance-report.json",
  "manifest.json",
  "release-notes.md",
  "README.md",
  "checksum.json",
];

function sha256(filePath) {
  const data = readFileSync(filePath);
  return crypto.createHash("sha256").update(data).digest("hex");
}

const now = new Date().toISOString();
const artifacts = [];

for (const file of PACKAGE_FILES) {
  const pkgPath = resolve(PACKAGE, file);
  if (existsSync(pkgPath)) {
    const stat = readFileSync(pkgPath);
    artifacts.push({
      filename: file,
      size: stat.length,
      sha256: sha256(pkgPath),
    });
  }
  // Also copy from dist if not yet in package
  const distPath = resolve(DIST, file);
  if (!existsSync(pkgPath) && existsSync(distPath)) {
    const content = readFileSync(distPath);
    writeFileSync(pkgPath, content);
    const stat = readFileSync(pkgPath);
    artifacts.push({
      filename: file,
      size: stat.length,
      sha256: sha256(pkgPath),
    });
  }
}

const checksum = {
  package_version: "1.0.0",
  registry_version: "1.0",
  generated_at: now,
  total_artifacts: artifacts.length,
  artifacts,
};

writeFileSync(resolve(PACKAGE, "checksum.json"), JSON.stringify(checksum, null, 2), "utf-8");
console.log(`Generated checksum.json — ${artifacts.length} artifacts checksummed`);
