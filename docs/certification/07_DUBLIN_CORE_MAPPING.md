# Dublin Core Mapping — Certification Report

## Standard

| Field | Value |
|-------|-------|
| Standard | Dublin Core Metadata Initiative (DCMI) |
| Version | DCMI Metadata Terms 2020 |
| Elements | 15 base + refinements |
| Format | Property-value pairs |
| ISO Standard | ISO 15836 |

## Why Selected

- Lightweight — 15 core elements cover most metadata needs
- Widely adopted — library, government, and academic institutions
- SEO compatible — maps to HTML `<meta name="DC.*">` tags
- Backward compatible — existing MJU-DRP document schema maps without changes
- Chosen over schema.org (too heavy for MVP), ISO 19115 (geographic-specific), MODS (library-specific), and Microsoft 365-specific (vendor lock-in)

## Verification: Mapping Table

Maps `document.schema.json` properties to Dublin Core terms.

| MJU-DRP Field | Dublin Core Term | Mapping Type | Notes |
|---------------|------------------|-------------|-------|
| `id` | `dc:identifier` | 1:1 | Direct match — unique document ID |
| `title` | `dc:title` | 1:1 | Direct match — document title |
| `description` | `dc:description` | 1:1 | Direct match — abstract/summary |
| `category` | `dc:type` | Derived | Category maps to DCMI Type Vocabulary (e.g., "plan" → "Text", "dataset" → "Dataset") |
| `subcategory` | `dc:subject` | Related | Subcategory as subject refinement |
| `owner` | `dc:creator` | Related | Owner/person responsible for content |
| `department` | `dc:contributor` | Related | Department as organizational contributor |
| `year` | `dc:date` | 1:1 | Primary date — creation or publication year |
| `created_at` | `dc:date` | Refinement | Has `format: date-time`; aligns with `dcterms:created` |
| `updated_at` | `dc:date` | Refinement | Has `format: date-time`; aligns with `dcterms:modified` |
| `keywords` | `dc:subject` | 1:1 | Array of keyword strings as subject terms |
| `language` | `dc:language` | 1:1 | ISO language code (th/en) |
| `file_type` | `dc:format` | 1:1 | MIME type or file extension |
| `share_url` | `dc:identifier` | Related | URL as alternative identifier |
| `version` | `dc:hasVersion` | Related | Document version string |
| `status` | `dc:audience` | Derived | Status as intended audience level (reviewers, public, etc.) |
| `fiscal_year` | `dcterms:available` | Related | Thai fiscal year as temporal coverage |
| `visibility` | `dc:accessRights` | 1:1 | Access/visibility level |
| `evidence_refs` | `dc:relation` | Related | Related resource references |
| `related_documents` | `dc:relation` | Related | Cross-document relationships |
| `tags` | `dc:subject` | Related | Additional subject headings |
| `thumbnail_url` | — | Unmapped | No direct Dublin Core equivalent (proposed as local extension) |
| `preview_url` | — | Unmapped | No direct Dublin Core equivalent (proposed as local extension) |
| `storage_provider` | — | Unmapped | Infrastructure detail; not metadata |
| `storage_path` | — | Unmapped | Infrastructure detail; not metadata |

## Coverage

| Metric | Value |
|--------|-------|
| Schema fields total | 26 |
| Fields with DC mapping | 22 |
| Unmapped fields | 4 (storage_provider, storage_path, preview_url, thumbnail_url) |
| Coverage | 84.6% |

The 4 unmapped fields are infrastructure details (storage provider/ path) or visual assets (preview/thumbnail URLs) that are outside the scope of Dublin Core's descriptive metadata model.

## HTML Meta Tag Generation

For consumer projects that render document pages, Dublin Core metadata can be embedded:

```html
<meta name="DC.title" content="Green Office 2026 Initiative Plan">
<meta name="DC.creator" content="prinya">
<meta name="DC.date" content="2026">
<meta name="DC.type" content="Text">
<meta name="DC.language" content="th">
<meta name="DC.subject" content="sustainability, green office, strategic plan">
<meta name="DC.identifier" content="GO2026-001">
```

This enables search engines, reference managers, and library systems to consume the metadata.

## Limitations

1. **No schema changes needed** — DC mapping is purely a documentation exercise; no field changes required.
2. **Category→Type mapping** is not 1:1 — categories like "plan" and "guideline" need manual mapping to DCMI Type Vocabulary (e.g., "Text", "Dataset", "Service").
3. **Thumbnail/preview URLs** have no DC equivalent — these are local extensions.
4. **Not a validation mechanism** — DC mapping is informational; AJV validates the JSON Schema, not Dublin Core.

## Certification Decision

**Status: CERTIFIED**

| Dimension | Verdict |
|-----------|---------|
| Mapping accuracy | ✅ 22/26 fields mapped |
| No schema impact | ✅ No changes to document.schema.json |
| SEO/Interop value | ✅ DC meta tags usable by consumers |
| Implementation effort | ✅ Minimal — documentation only |

## Risk

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Category→type mapping ambiguity | Medium | Low | Document mapping guidelines for category→DCMI type |
| DC version drift | Low | Low | DC is stable; no significant changes expected |
| Consumer project unawareness | Medium | Low | Add DC meta tag generation to consumer contract docs |

## Recommendation

**Document the mapping in consumer contracts.** When consumer projects render document pages, they should include optional Dublin Core meta tags for SEO and interoperability. No MJU-DRP code changes needed.

## Next Review

When the document schema is extended with new fields that may need DC mapping.
