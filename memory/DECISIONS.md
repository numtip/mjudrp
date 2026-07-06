# Architecture Decisions

## ADR-001 through ADR-013 (unchanged)

## ADR-014: AI Provisioning Kit v1.0

| Field | Value |
|-------|-------|
| Decision ID | ADR-014 |
| Date | 2026-07-06 |
| Status | Accepted |
| Context | The SharePoint Enterprise Blueprint (Sprint 3A) defined the target architecture. Converting this into reusable provisioning templates enables AI-assisted and automated SharePoint setup. |
| Decision | Create a comprehensive AI Provisioning Kit with 58 JSON/MD/CSV templates, 8 AI prompts, 5 export formats, a provisioning manifest, and a provisioning validator. All templates use Registry Spec v1.0 column mappings. All AI prompts are model-agnostic (compatible with ChatGPT, Claude, Gemini, Copilot, and Cursor). |
| Consequences | SharePoint provisioning is documented and templated. AI agents can assist with metadata review, classification, and quality checks using standardized prompts. Future Graph automation can map templates directly to Graph API resources. No SharePoint resources provisioned — templates are reusable artifacts. |
