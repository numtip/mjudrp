# Architecture Decisions

## ADR-001 through ADR-016 (unchanged)

## ADR-017: Operations Mode v1.0

| Field | Value |
|-------|-------|
| Decision ID | ADR-017 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | All 4 major platform components are complete: SharePoint Blueprint (Sprint 3A), AI Provisioning Kit (Sprint 3B), SharePoint Deployment Kit (Sprint 3C), and SharePoint Pilot Deployment (Sprint 3D). Architecture is LOCKED. Registry Spec is FROZEN. Continuing to develop new features would violate the Architecture Lock policy. The project must now transition from Blueprint to Production. |
| Decision | Freeze Platform v1.0 and enter Operations Mode. No new platform features. Only operational improvements (documentation, guides, templates) and defect fixes via ADR. Create: CHANGELOG_v1.0.md, PLATFORM_v1.0_BASELINE.md, DEPLOYMENT_READINESS_REPORT.md, 9 environment inventory templates, 7 operations guides, and M365 readiness checklist. Tag repository as platform-v1.0. Update all memory and runtime files. |
| Consequences | Platform is frozen. Operations Mode enables deployment support without architectural changes. Next action is to wait for the user to create a real SharePoint site before beginning Sprint 3E (Graph Adapter). No code changes to architecture, schemas, registry, or distribution without ADR. |
