# Filesystem Provider

## Status

**Architecture documented.** Intended for local development, testing, and offline scenarios.

## Role

Local filesystem provider for development and testing without Microsoft 365 access. Allows MJU-DRP to validate registry workflows without real SharePoint or OneDrive connectivity.

## Responsibilities

- Provide local path validation for development environments
- Generate file:// URLs for local testing
- Simulate provider operations during CI and local runs
- Serve as a fallback when no network provider is available

## URL Pattern

```
Development: file:///F:/ProjectAI/mjudrp/test-data/{Category}/{Filename}
Unix:        file:///home/user/mjudrp/test-data/{Category}/{Filename}
```

## Configuration

```json
{
  "provider": "filesystem",
  "root": "./test-data",
  "base_path": "./test-data/documents"
}
```

## Supported Operations

| Operation | MVP | Future |
|-----------|-----|--------|
| URL resolution | ✅ Documented | ✅ Implemented |
| Path validation | ✅ Documented | ✅ Implemented |
| Health check | ✅ Always healthy | ✅ Always healthy |

## Use Cases

- Validating registry data without Microsoft 365 access
- Running CI tests that do not require network connectivity
- Development and prototyping of registry features
- Offline document metadata management

## Constraints

- `file://` URLs are not accessible by consumer projects
- No sharing or permission model
- Not suitable for production use
- Must be explicitly selected — never the default in production configuration
