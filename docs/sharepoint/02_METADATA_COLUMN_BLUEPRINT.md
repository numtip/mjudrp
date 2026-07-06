# Metadata Column Blueprint

**Status:** BLUEPRINT — 2026-07-06
**Maps to:** `schemas/document.schema.json`

---

## Column Definitions

Each column maps to a property in the MJU-DRP Document Schema. Columns should be created as **Site Columns** (reusable across libraries) then added to library content types.

| # | Column Name | Schema Property | SharePoint Type | Required | Default | Validation |
|---|-------------|-----------------|----------------|----------|---------|------------|
| 1 | DRP Document ID | `id` | Single line text | ✅ | — | Pattern: `^[A-Z0-9]+-[0-9]{3,}$` |
| 2 | Title | `title` | Single line text | ✅ | — | Max 255 chars |
| 3 | Description | `description` | Multiple lines text | ❌ | — | Rich text optional |
| 4 | Category | `category` | Choice (managed metadata if available) | ✅ | — | Values from `categories.sample.json` |
| 5 | Subcategory | `subcategory` | Choice | ❌ | — | Dependent on Category |
| 6 | Fiscal Year | `fiscal_year` | Single line text | ❌ | — | Thai year (e.g., "2568") |
| 7 | Year | `year` | Number | ❌ | — | Gregorian year (e.g., 2026) |
| 8 | Version | `version` | Single line text | ❌ | "1.0" | Pattern: `^\d+\.\d+$` |
| 9 | Status | `status` | Choice | ❌ | "draft" | Draft, Review, Approved, Published, Archived, Superseded |
| 10 | Owner | `owner` | Person or Group | ✅ | — | Must be a valid SharePoint user or group |
| 11 | Department | `department` | Choice | ❌ | — | List of MJU departments |
| 12 | Keywords | `keywords` | Multiple lines text (comma-separated) | ❌ | — | Comma-separated list |
| 13 | Tags | `tags` | Multiple lines text (comma-separated) | ❌ | — | Comma-separated list |
| 14 | Language | `language` | Choice | ❌ | "th" | th, en |
| 15 | File Type | `file_type` | Choice (auto-filled by SharePoint) | ❌ | — | pdf, docx, xlsx, pptx, etc. |
| 16 | Project Refs | `project_refs` | Multiple lines text (semicolon-separated) | ✅ | — | Project IDs from `projects.sample.json` |
| 17 | Evidence Refs | `evidence_refs` | Multiple lines text (semicolon-separated) | ❌ | — | Evidence IDs from `evidence-map.sample.json` |
| 18 | Related Documents | `related_documents` | Multiple lines text (semicolon-separated) | ❌ | — | DRP Document IDs |
| 19 | Visibility | `visibility` | Choice | ❌ | "internal" | Public, Internal, Confidential, Restricted |
| 20 | Storage Path | `storage_path` | Single line text | ✅ | Auto | Relative path in SharePoint |
| 21 | Share URL | `share_url` | Hyperlink | ✅ | Auto | SharePoint file URL |
| 22 | Created At | `created_at` | Date and Time | ❌ | Auto | ISO 8601 |
| 23 | Updated At | `updated_at` | Date and Time | ❌ | Auto | ISO 8601 |

## Managed Metadata (Term Store)

If the SharePoint Term Store is available, use managed metadata for:

| Column | Term Set | Notes |
|--------|----------|-------|
| Category | MJU-DRP Categories | Sync from `categories.sample.json` |
| Department | MJU Departments | University organizational units |
| Language | MJU Languages | th, en |

Without Term Store, use Choice columns with the same values.

## Required vs Optional

| Library | Required Columns |
|---------|-----------------|
| DRP Documents | DRP Document ID, Title, Category, Owner, Project Refs, Share URL, Storage Path |
| DRP Evidence | DRP Document ID, Title, Status, Owner, Project Refs |
| DRP Source Data | Title, Description, Source |
| DRP Templates | Title, Description, Version |
| DRP Archive | All original + Archived Date, Superseded By |
| DRP Working Area | Title, Owner |

## Default Values

| Column | Default | Reason |
|--------|---------|--------|
| Status | "draft" | Most documents start in draft |
| Language | "th" | Primary university language |
| Visibility | "internal" | Default to restricted access |
| Version | "1.0" | Initial version |

## AI-Assisted Metadata Fields

These fields are candidates for AI-assisted filling:

| Field | AI Assistance | Method |
|-------|--------------|--------|
| Description | ✅ Generate from document content | Upload → AI summarizes |
| Keywords | ✅ Extract key terms | NLP keyword extraction |
| Tags | ✅ Suggest relevant tags | Based on content analysis |
| Category | ✅ Suggest from taxonomy | Classify based on content |
| Evidence Refs | ✅ Suggest matching criteria | Map content to evidence criteria |
| Related Documents | ✅ Detect duplicates and related | Compare with existing registry |

## Column Group

All DRP columns should be grouped under **"MJU Document Registry Columns"** in SharePoint for easy management.
