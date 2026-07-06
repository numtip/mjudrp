# Project Capabilities

## Active Capabilities

| Capability | Description | Status |
|------------|-------------|--------|
| Document Metadata Registry | Store and validate document metadata with schema enforcement | ✅ Active |
| Category Taxonomy | Hierarchical document classification with Thai/English names | ✅ Active |
| Project Mapping | Register consumer projects and link documents | ✅ Active |
| Owner Directory | Document owner/contact directory | ✅ Active |
| Evidence Mapping | Link documents to assessment criteria and evidence requirements | ✅ Active |
| Registry Validation | Automated validation of required fields, duplicates, cross-references | ✅ Active |
| Search Index Generation | Generate lightweight searchable JSON index | ✅ Active |
| Normalized Registry Export | Generate full normalized document registry output | ✅ Active |
| CI/CD Validation | GitHub Actions workflow for automated validation on push/PR | ✅ Active |
| Memory System | AI agent continuity with 9 memory files | ✅ Active |
| Token-Savior Workflow | Compact context packs, reports, and handoffs | ✅ Active |
| Architecture Governance | ADR system, architecture locks, change control | ✅ Active |

## Documented Capabilities (Not Implemented)

| Capability | Layer | Implementation Sprint |
|------------|-------|----------------------|
| Storage provider abstraction | Providers | Future |
| SharePoint URL resolution | Providers | Future |
| OneDrive URL resolution | Providers | Future |
| Microsoft Graph integration | Adapters | Future |
| Plugin extension system | Plugins | Future |
| Consumer versioned contracts | Contracts | Future |
| Relationship graph | Registry | Sprint 2 |
| Knowledge graph | Knowledge | Future |
| Relationship population | Registry | Sprint 2 |
| Real metadata population | Registry | Sprint 2 |

## Capability Maturity

```
MVP    → Active    (validated, tested, documented)
Doc    → Blueprint (architecture documented, not implemented)
Future → Planned   (not yet started)
```

## Capability Map by Layer

| Layer | Active | Documented | Future |
|-------|--------|------------|--------|
| Foundation | 4 | 0 | 0 |
| Registry | 5 | 1 | 2 |
| Providers | 0 | 3 | 0 |
| Adapters | 0 | 4 | 0 |
| Plugins | 0 | 5 | 0 |
| Contracts | 0 | 4 | 0 |
| Runtime | 0 | 6 | 0 |
| Knowledge | 0 | 0 | 1 |
