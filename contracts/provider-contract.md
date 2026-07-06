# Provider Contract

## Version

**v1.0 (Draft)** — Architecture only. Not implemented.

## Parties

- **MJU-DRP**: Registry core
- **Providers**: SharePoint, OneDrive, Filesystem, Future providers

## Provider Obligations

1. **Implement interface** — Fulfill the provider interface methods (see `providers/provider.interface.md`)
2. **Self-contained** — Each provider manages its own configuration and authentication
3. **Graceful degradation** — If a provider is unavailable, return clear error states
4. **Document constraints** — Document provider-specific limitations and configuration
5. **Version compatibility** — Maintain compatibility with the provider interface version

## MJU-DRP Obligations

1. **Define clear interface** — Provider interface is documented and stable
2. **Provider isolation** — Provider implementations are isolated from each other
3. **Error handling** — Provider errors do not crash the registry core
4. **Testing support** — Test fixtures and mock providers are available

## Interface Stability

| Interface Element | Stability | Change Policy |
|-------------------|-----------|---------------|
| Method signatures | Stable | Version bump required |
| Return types | Stable | Version bump required |
| Error types | Stable | Addition only |
| Configuration format | Stable | Additive changes allowed |

## Provider Registration

```json
{
  "providers": {
    "sharepoint": {
      "enabled": false,
      "config": { "tenant": "mju365" }
    },
    "onedrive": {
      "enabled": false,
      "config": {}
    },
    "filesystem": {
      "enabled": false,
      "config": { "root": "./test-data" }
    }
  }
}
```

## Testing

Each provider must provide:

1. Unit tests for URL resolution and path validation
2. Integration test stubs for CI environments
3. Mock provider for testing registry operations without network

## Deprecation

Provider deprecation process:

1. Mark provider as deprecated in provider registry
2. Notify all documents using this provider
3. Provide migration path to alternative provider
4. Remove provider after transition period (minimum 2 sprints)
