# Current Provider

## Status

**No active provider.** All provider definitions are architecture documentation only.

## Provider State

| Provider | Architectural | Implemented | Active |
|----------|:------------:|:-----------:|:------:|
| SharePoint | ✅ | ❌ | ❌ |
| OneDrive | ✅ | ❌ | ❌ |
| Filesystem | ✅ | ❌ | ❌ |
| Teams | ✅ | ❌ | ❌ |

## How Registry Entries Reference Providers

Each document entry specifies a `storage_provider` field:

```json
{
  "id": "GO2026-001",
  "storage_provider": "sharepoint",
  "storage_path": "/sites/GreenOffice/Shared Documents/Plans/...",
  "share_url": "https://mju365.sharepoint.com/..."
}
```

This field is validated but not resolved during MVP. The URL is stored as-is and is accessible independently of the provider implementation.

## Provider Activation Criteria

A provider becomes active when:

1. Provider specification is finalized in `providers/{name}.provider.md`
2. Microsoft Graph API access is approved and configured
3. Adapter implementation connects to the provider
4. Health check passes for the target environment
5. Validation script checks provider field consistency

## Migration Path

When providers are activated:

1. `storage_provider` field becomes actionable (not just informational)
2. URLs can be regenerated from `storage_path` + provider config
3. Validation can verify that stored paths actually exist
4. Consumer projects receive verified, working URLs
