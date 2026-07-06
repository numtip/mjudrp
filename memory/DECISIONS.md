# Architecture Decisions

## ADR-001 through ADR-015 (unchanged)

## ADR-016: SharePoint Pilot Deployment v1.0

| Field | Value |
|-------|-------|
| Decision ID | ADR-016 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | The Deployment Kit (Sprint 3C) provided 68 reusable deployment assets. A controlled pilot deployment is needed before any Graph integration. The pilot must verify that templates produce a working SharePoint site aligned with Registry Spec v1.0. |
| Decision | Create a comprehensive Pilot Deployment workflow with 14 artifacts: runbook, config files, safe deployment wrapper (dry-run by default, requires -Execute flag), verification wrapper (MD + JSON reports), metadata export workflow, import script (CSV/JSON to registry format), validation script (7 checks: required metadata, category mapping, project refs, owner refs, evidence refs, SharePoint URLs, duplicate IDs), Graph readiness report, and pilot health check. All scripts are safe, parameterized, and reviewed before execution. |
| Consequences | Pilot deployment is fully documented and prepared. Administrator can execute the pilot safely with dry-run protection. Validation checks ensure metadata quality. Graph integration readiness is documented. No SharePoint resources provisioned — pilot deployment is prepared but not executed. |
