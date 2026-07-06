# Site and Library Design

**Status:** BLUEPRINT — 2026-07-06

---

## Recommended Site

**MJU Document Registry**
- URL: `https://mju365.sharepoint.com/sites/MJUDocumentRegistry`
- Type: Communication site (recommended for consuming project visibility)
- Alternative: Team site (if only internal staff access needed)
- Language: Thai + English

## Document Libraries

### 1. DRP Documents

| Attribute | Value |
|-----------|-------|
| **Purpose** | Primary document storage for all registered consumer project documents |
| **Allowed file types** | PDF, DOCX, XLSX, PPTX, images (JPG, PNG), plain text |
| **Metadata requirements** | All DRP metadata columns (see 02_METADATA_COLUMN_BLUEPRINT.md) |
| **Versioning** | Major versions only (1, 2, 3...) — preserve unique version labels |
| **Owner** | DRP Editors group |
| **Lifecycle** | Draft → Review → Approved → Published → Archived |
| **Visibility** | Public documents readable by all; internal documents restricted |
| **Relation to registry** | This library is the primary source for `document-registry.json` |

### 2. DRP Evidence

| Attribute | Value |
|-----------|-------|
| **Purpose** | Store evidence documents mapped to quality assurance criteria (RAE, IQA, etc.) |
| **Allowed file types** | PDF, DOCX, XLSX, images |
| **Metadata requirements** | DRP Document ID, Title, Evidence Ref, Status, Owner, Project Refs |
| **Versioning** | Major only |
| **Owner** | DRP Reviewers |
| **Lifecycle** | Draft → Satisfied → Partial → Not Applicable |
| **Visibility** | Internal by default |
| **Relation to registry** | Source for `evidence-registry.json` |

### 3. DRP Source Data

| Attribute | Value |
|-----------|-------|
| **Purpose** | Store raw data exports, CSV/Excel metadata templates, and batch import files |
| **Allowed file types** | JSON, CSV, XLSX, XML, plain text |
| **Metadata requirements** | Title, Description, Source, Date, Type |
| **Versioning** | None (source data is ephemeral) |
| **Owner** | DRP Editors |
| **Lifecycle** | Import → Process → Archive |
| **Visibility** | Internal only |
| **Relation to registry** | Used for batch metadata import into registry |

### 4. DRP Templates

| Attribute | Value |
|-----------|-------|
| **Purpose** | Store standardized templates: metadata import templates, column templates, report templates |
| **Allowed file types** | DOCX, XLSX, PDF, JSON |
| **Metadata requirements** | Title, Description, Version, Language |
| **Versioning** | Major only |
| **Owner** | DRP Owners |
| **Lifecycle** | Draft → Published → Superseded |
| **Visibility** | Public |
| **Relation to registry** | Templates help staff create registry-compliant metadata |

### 5. DRP Archive

| Attribute | Value |
|-----------|-------|
| **Purpose** | Long-term preservation of superseded/archived documents |
| **Allowed file types** | All types (frozen) |
| **Metadata requirements** | Original metadata preserved; add Archived Date, Superseded By |
| **Versioning** | None (frozen) |
| **Owner** | DRP Owners |
| **Lifecycle** | Published → Archived |
| **Visibility** | Internal |
| **Relation to registry** | Archived documents removed from active registry outputs |

### 6. DRP Working Area

| Attribute | Value |
|-----------|-------|
| **Purpose** | In-progress documents, drafts, collaborative workspace before formal upload |
| **Allowed file types** | All types |
| **Metadata requirements** | Minimal (Title, Owner, Status) |
| **Versioning** | Major + Minor |
| **Owner** | Individual contributors |
| **Lifecycle** | Working → Ready for Review → Move to DRP Documents |
| **Visibility** | Internal (contributors only) |
| **Relation to registry** | Not included in registry outputs until moved to DRP Documents |

## Library Summary

| Library | Primary Use | Registry Linked | Public Content |
|---------|-------------|-----------------|----------------|
| DRP Documents | Production document storage | ✅ Yes | Partial |
| DRP Evidence | QA evidence files | ✅ Yes | No |
| DRP Source Data | Bulk import data | Indirect | No |
| DRP Templates | Standard forms | No | Yes |
| DRP Archive | Long-term preservation | ✅ Yes (excluded from active) | No |
| DRP Working Area | Drafts and collaboration | No | No |

## Naming Convention

- Libraries use the prefix `DRP ` to namespace all MJU-DRP content
- This distinguishes DRP content from other SharePoint content on the same site
- Folder hierarchy within libraries should follow category taxonomy (see Registry Spec)
