# REJECTED Tools

## Overview

Tools evaluated for MJU-DRP and rejected. These may be useful for other projects but were not suitable for our use case.

## Validation Tools

| Tool | Rejection Reason | Better Alternative |
|------|-----------------|-------------------|
| Zod | Schema-first approach; tight coupling between schema and validation | AJV (schema-agnostic) |
| TypeBox | TypeScript-first; overly complex for JSON-only validation | AJV |
| Custom validation (full) | Maintainable but duplicates AJV functionality | AJV + existing custom checks |

## Search Tools

| Tool | Rejection Reason | Better Alternative |
|------|-----------------|-------------------|
| Lunr.js | Poor Thai search support; undocumented for Thai | MiniSearch (Thai-compatible) |
| FlexSearch | Lower search quality for Thai; less documentation | MiniSearch |
| Fuse.js | Slower than alternatives; no native Thai support | MiniSearch |

## Storage

| Tool | Rejection Reason | Better Alternative |
|------|-----------------|-------------------|
| SharePoint Embedded | Violates no-CMS principle; unnecessary complexity | SharePoint Document Libraries |
| Database (MVP) | Operational overhead; JSON is sufficient for scale | Static JSON |

## Misc

| Tool | Rejection Reason |
|------|-----------------|
| Custom Auth/RBAC | Not needed; access managed in Microsoft 365 |
| OCR service | Out of scope for registry platform |
| AI Chatbot | Out of scope; registry is a data layer |
| Workflow Engine | Power Automate exists in M365 stack |
| Admin Panel/CMS | Duplicates git and GitHub UI |
| Browser MCP | No browser automation needed |
| Search MCP | Web search irrelevant to registry search |
| Excel MCP | Immature; use Excel Online + JSON export |

## General Rejection Criteria

Rejected tools fell into these categories:

1. **Out of scope** — function not required by MJU-DRP (OCR, chatbot, workflow)
2. **Better alternative exists** — superior tool available (MiniSearch > Lunr)
3. **Architecture violation** — violates "static-first" or "no CMS" rules
4. **Immature** — community project not production-ready (Excel MCP)
5. **Overengineered** — too complex for the problem (TypeBox, DB)

## Re-Evaluation Policy

Rejected tools can be re-evaluated if:
- The rejection reason changes (e.g., new requirement makes OCR relevant)
- The better alternative becomes unavailable (e.g., MiniSearch deprecated)
- Project scope expands beyond current boundaries
