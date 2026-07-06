# Provider Interface Specification

## Overview

The provider interface defines the contract that all storage providers must fulfill. It enables MJU-DRP to work with multiple storage backends without coupling to any specific API.

## Interface Contract

### Required Methods

| Method | Input | Output | Description |
|--------|-------|--------|-------------|
| `resolve_share_url` | `{ storage_path, provider_config }` | `{ share_url, preview_url?, thumbnail_url? }` | Generate or validate a shareable URL for a document at the given path |
| `validate_path` | `storage_path: string` | `{ valid: boolean, normalized_path?: string, error?: string }` | Validate and normalize a storage path according to provider conventions |
| `get_provider_info` | none | `{ name, version, capabilities[], constraints[] }` | Return provider metadata, supported features, and known limitations |
| `health_check` | none | `{ healthy: boolean, latency_ms?: number, error?: string }` | Verify the provider is accessible (future — returns stub during MVP) |

### Optional Methods

| Method | Input | Output | Description |
|--------|-------|--------|-------------|
| `get_file_metadata` | `storage_path: string` | `{ file_type, file_size, modified_at, created_by }` | Retrieve file metadata from the storage provider (requires Microsoft Graph) |
| `list_documents` | `{ folder_path, recursive? }` | `Document[]` | List documents in a storage location (not implemented during MVP) |

## Provider Lifecycle

```
Registered → Configured → Healthy → Active
                                → Degraded
                                → Unhealthy (reconnect)
```

- **Registered**: Provider is known to the system
- **Configured**: Storage paths and credentials are set (MVP uses documented configuration only)
- **Healthy**: Provider passes health check
- **Active**: Provider is actively used for URL resolution

## Configuration Format

```json
{
  "provider": "sharepoint",
  "tenant": "mju365",
  "site": "/sites/ProjectName",
  "base_path": "Shared Documents",
  "config": {
    "base_url": "https://mju365.sharepoint.com",
    "api_version": "v1.0"
  }
}
```

## Error Handling

| Error Type | Description | Recovery |
|------------|-------------|----------|
| `INVALID_PATH` | Storage path does not match provider format | Normalize or reject |
| `INACCESSIBLE` | Provider cannot be reached | Retry with backoff |
| `UNSUPPORTED` | Operation not supported by this provider | Fall back to alternative |
| `MISCONFIGURED` | Provider configuration is incomplete | Alert maintainer |

## Extension Points

- Custom URL generation strategies per provider
- Storage path validation rules
- Metadata enrichment hooks
- Health check customizations
