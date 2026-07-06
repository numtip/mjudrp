# Provisioning Overview

**Status:** COMPLETE — 2026-07-06
**Sprint:** 3B — SharePoint AI Provisioning Kit

## What is the Provisioning Kit?

The AJU-DRP AI Provisioning Kit converts the SharePoint Enterprise Blueprint (Sprint 3A) into reusable Infrastructure-as-Code artifacts. Every template, prompt, and validation rule is designed for human administrators, AI agents, PowerShell, and future Microsoft Graph automation.

## Kit Contents

| Category | Location | Count |
|----------|----------|-------|
| Site Templates | `provisioning/site/` | 5 files |
| Library Templates | `provisioning/libraries/` | 6 files |
| Column Templates | `provisioning/columns/` | 6 files |
| List Templates | `provisioning/lists/` | 5 files |
| View Templates | `provisioning/views/` | 9 files |
| Permission Templates | `provisioning/permissions/` | 3 files |
| Content Type Templates | `provisioning/content-types/` | 6 files |
| Validation Templates | `provisioning/validation/` | 4 files |
| AI Prompts | `provisioning/prompts/` | 8 files |
| Export Templates | `provisioning/exports/` | 5 files |
| Manifest | `provisioning/manifest.json` | 1 file |
| **Total** | | **58 files** |

## Who Uses What

| Role | Uses |
|------|------|
| SharePoint Administrator | site/, libraries/, columns/, lists/, views/, permissions/, content-types/ |
| Registry Maintainer | columns/, exports/, validation/ |
| AI Agent (Cursor) | prompts/, exports/, validation/ |
| Microsoft 365 Copilot | prompts/ (metadata review, classification) |
| Human Reviewer | validation/ (checklists), prompts/ (use with external AI) |
