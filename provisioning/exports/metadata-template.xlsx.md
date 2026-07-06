# Metadata Excel Template

Use this template to create an Excel spreadsheet for batch metadata import/export.

## Worksheet Structure

Create an Excel workbook with the following columns:

| Column | A | B | C | D | E | F | G |
|--------|---|---|---|---|---|---|---|
| Row 1 | **Title** | **Category** | **Status** | **Fiscal Year** | **Owner** | **Visibility** | **Project Refs** |
| Row 2 | template title | report | draft | 2569 | owner-research | internal | research-portal |

## Extended Template (all 22 columns)

A B C D E F G H I J K L M N O P Q R S T U V
DRP Document ID | Title | Description | Category | Subcategory | Fiscal Year | Year | Version | Status | Owner | Department | Keywords | Tags | Language | File Type | Project Refs | Evidence Refs | Related Documents | Visibility | Storage Path | Share URL | Notes

## Validation Rules

1. DRP Document ID: Must be unique, pattern PROJECT-### (e.g., GO2026-001)
2. Category: Must match DRP Categories list
3. Status: One of draft/review/approved/published/archived/superseded
4. Visibility: One of public/internal/confidential/restricted
5. Project Refs: Semicolon-separated project IDs
6. Language: th or en

## Import Process

1. Fill template with document metadata
2. Export as CSV
3. Import via SharePoint "Import Spreadsheet" or Power Automate
4. Validate using MJU-DRP AJV validation
5. Create PR to add to registry JSON
