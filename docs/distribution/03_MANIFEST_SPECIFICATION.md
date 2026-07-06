# Manifest Specification

## Overview

The `manifest.json` file is the authoritative metadata document for every registry package. It provides consumers with the information needed to validate compatibility, track versions, and understand the package contents.

## Schema

```json
{
  "registry_version": "string",
  "schema_version": "string",
  "package_version": "string",
  "build_timestamp": "string (ISO 8601)",
  "generator_version": "string",
  "document_count": "number",
  "category_count": "number",
  "project_count": "number",
  "relationship_count": "number",
  "evidence_count": "number",
  "language_summary": {
    "th": "number",
    "en": "number"
  },
  "consumer_compatibility": "string",
  "minimum_registry_version": "string",
  "build_hash": "string",
  "outputs": ["string"]
}
```

## Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `registry_version` | ✅ | string | Registry Specification version (e.g., "1.0") |
| `schema_version` | ✅ | string | JSON Schema version (e.g., "1.0") |
| `package_version` | ✅ | string | Release package version (semver, e.g., "1.0.0") |
| `build_timestamp` | ✅ | string | ISO 8601 timestamp of package generation |
| `generator_version` | ✅ | string | Generator script version |
| `document_count` | ✅ | number | Total documents in package |
| `category_count` | ✅ | number | Total categories in package |
| `project_count` | ✅ | number | Total projects in package |
| `relationship_count` | ✅ | number | Total relationships in package |
| `evidence_count` | ✅ | number | Total evidence mappings in package |
| `language_summary` | ✅ | object | Document count by language code |
| `consumer_compatibility` | ✅ | string | Minimum consumer contract version supported |
| `minimum_registry_version` | ✅ | string | Minimum registry version required |
| `build_hash` | ✅ | string | SHA-256 prefix (12 chars) of manifest content |
| `outputs` | ✅ | array[string] | List of all output files in package |

## Version Compatibility

| Package Version | Registry Spec | Consumer Contract |
|----------------|---------------|-------------------|
| 1.0.x | v1.0 | v1.0 |

## Consumer Usage

Consumers should always check `consumer_compatibility` and `minimum_registry_version` before processing package data:

```js
const manifest = await fetch("/latest/registry-package/manifest.json").then(r => r.json());
if (manifest.consumer_compatibility === "v1.0") {
  // Process package
}
```
