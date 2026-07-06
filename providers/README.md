# Provider Layer

## Purpose

The provider layer abstracts document storage backends behind a common interface. It allows MJU-DRP to interact with any storage provider (SharePoint, OneDrive, filesystem, future providers) through a uniform contract without coupling to provider-specific APIs.

## Design Principle

MJU-DRP does not store binary files. The provider layer is responsible for metadata about storage locations, share URL generation, and storage path validation — not file upload or retrieval.

## Provider Interface

Every provider implements:

- `resolve_share_url(metadata)` — Generate or validate a shareable URL for a document
- `validate_path(path)` — Ensure a storage path follows provider conventions
- `get_provider_info()` — Return provider metadata (name, capabilities, constraints)
- `health_check()` — Verify provider connectivity (future use)

## Current Providers

| Provider | Status | Description |
|----------|--------|-------------|
| SharePoint | Documented | Primary storage for team document libraries |
| OneDrive | Documented | Personal document storage for individual ownership |
| Filesystem | Documented | Local filesystem for development and testing |
| Future | Blueprint | Extension points for additional providers |

## Evolution

Providers are architecture documentation only during MVP. Implementation begins when Microsoft Graph API integration is approved.

## Files

| File | Content |
|------|---------|
| `provider.interface.md` | Common provider contract and lifecycle |
| `sharepoint.provider.md` | SharePoint storage provider specification |
| `onedrive.provider.md` | OneDrive storage provider specification |
| `filesystem.provider.md` | Local filesystem provider specification |
| `future-providers.md` | Provider extension blueprint |
