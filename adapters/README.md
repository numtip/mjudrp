# Adapter Layer

## Purpose

The adapter layer bridges MJU-DRP to external platforms and APIs. Adapters translate between MJU-DRP's internal contracts and each external platform's native protocols, formats, and authentication models.

## Design Principle

Adapters isolate MJU-DRP from external platform changes. If an external API changes, only the adapter is updated — the registry core remains untouched.

## Adapter Types

| Adapter | External Platform | Purpose |
|---------|------------------|---------|
| Microsoft Graph | Microsoft 365 API | Unified access to SharePoint, OneDrive, and Entra ID |
| SharePoint | SharePoint Online | SharePoint-specific operations |
| OneDrive | OneDrive for Business | OneDrive-specific operations |
| GitHub | GitHub API | Registry publishing and CI integration |

## Current Status

**Architecture only.** No adapter code is implemented during MVP. Adapters are documented to guide future implementation.

## Evolution Path

1. Architecture documentation (current)
2. Interface definitions
3. Stub/mock implementations for testing
4. Full implementations with Microsoft Graph API

## Files

| File | Content |
|------|---------|
| `microsoft-graph-adapter.md` | Microsoft Graph API adapter specification |
| `sharepoint-adapter.md` | SharePoint-specific adapter specification |
| `onedrive-adapter.md` | OneDrive-specific adapter specification |
| `github-adapter.md` | GitHub integration adapter specification |
