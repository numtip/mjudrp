# Next Sprint Plan

## Sprint 3B: SharePoint AI Provisioning Kit (Completed)

### Preceded by: Sprint 3A SharePoint Blueprint ✅ + Architecture Lock v1.0 ✅

Architecture is **LOCKED**. Registry Specification v1.0 is **FROZEN**.

### Objectives (Completed)
1. ✅ Created AI Provisioning Kit with 58 reusable templates
2. ✅ Created site templates (5 files)
3. ✅ Created library templates (6 files)
4. ✅ Created column templates mapped to Registry Spec v1.0 (6 files)
5. ✅ Created list templates (5 files)
6. ✅ Created view templates (9 files)
7. ✅ Created permission templates (3 files)
8. ✅ Created content type templates (6 files)
9. ✅ Created validation checklists (4 files)
10. ✅ Created AI prompt library (8 reusable prompts for ChatGPT, Claude, Gemini, Copilot, Cursor)
11. ✅ Created export/import templates (5 files: CSV, Excel, bulk import, SharePoint export, registry import)
12. ✅ Created provisioning manifest.json with versioning and compatibility
13. ✅ Created provisioning validator (scripts/validate-provisioning.mjs)
14. ✅ Created 11 provisioning documentation files
15. ✅ All validation passes (AJV: 0 errors, Provisioning: PASS, Tests: 211/211)
16. ✅ Updated all memory and runtime files

### Kit Summary

| Category | Files |
|----------|-------|
| Site Templates | 5 |
| Library Templates | 6 |
| Column Templates | 6 |
| List Templates | 5 |
| View Templates | 9 |
| Permission Templates | 3 |
| Content Type Templates | 6 |
| Validation Templates | 4 |
| AI Prompts | 8 |
| Export Templates | 5 |
| Manifest + README | 2 |
| **Total** | **58** |
| Provisioning Docs | 11 |

## Sprint 3C: SharePoint Graph Adapter (Future)

### Objectives (P0)
1. Configure Entra ID app registration for Microsoft Graph
2. Obtain admin consent for Sites.Selected permission
3. Build read-only Graph adapter script
4. Validate metadata round-trip (SharePoint → Graph → Registry → AJV)
5. CI integration for automated metadata sync
6. Graph mapping documentation

### Prerequisites
- SharePoint site must be provisioned (Sprint 3B templates available)
- Entra ID app registration approved by MJU IT
- Admin consent for Sites.Selected permission
- Document libraries populated with test content

### Allowed Actions
- Build Graph read-only adapter
- Document Graph integration
- Test with provided site/data

### Forbidden Actions
- Do NOT write to SharePoint via Graph
- Do NOT provision SharePoint automatically
- Do NOT request tenant-wide permissions
