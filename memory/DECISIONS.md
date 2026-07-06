# Architecture Decisions

## ADR-001 through ADR-014 (unchanged)

## ADR-015: SharePoint Deployment Kit v1.0

| Field | Value |
|-------|-------|
| Decision ID | ADR-015 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | The AI Provisioning Kit (Sprint 3B) provided the WHAT (template definitions). The Deployment Kit (Sprint 3C) provides the HOW (execution scripts). A clear separation between template definitions and deployment execution is needed for enterprise operations. |
| Decision | Create a comprehensive Deployment Kit with 68 assets: 10 PowerShell template scripts, 8 Site Scripts, 5 Site Designs, 7 CSV templates, 7 JSON templates, verification (7), rollback (4), discovery (7), and health check (3) assets. All scripts use placeholders (no tenant-specific values). All operations are template-first with the principle "AI generates, Administrator deploys." |
| Consequences | SharePoint deployment is fully documented and templated with PowerShell scripts, Site Scripts, and Site Designs. Administrator can deploy manually or via automation. Rollback and recovery procedures are documented. Health check rules define acceptable thresholds. No SharePoint resources provisioned — deployment assets are reusable templates. |
