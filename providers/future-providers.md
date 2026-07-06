# Future Providers

## Extension Model

The provider interface is designed for extensibility. New storage backends can be added by implementing the provider contract without modifying existing providers or the registry core.

## Candidate Future Providers

### Teams Provider
- **Purpose**: Access files stored in Microsoft Teams channels
- **Backend**: Teams channel files (stored in underlying SharePoint site)
- **URL Pattern**: Derives from SharePoint with Teams context
- **Priority**: Low — Teams files are already accessible via SharePoint provider
- **Prerequisite**: Microsoft Graph API access

### Google Drive Provider
- **Purpose**: Support documents stored in Google Workspace
- **Backend**: Google Drive API
- **URL Pattern**: `https://drive.google.com/file/d/{FILE_ID}/view`
- **Priority**: Low — not currently needed by MJU projects
- **Prerequisite**: Google Workspace integration approval

### Amazon S3 Provider
- **Purpose**: Support documents stored in S3-compatible storage
- **Backend**: AWS S3 or compatible
- **URL Pattern**: `https://{bucket}.s3.{region}.amazonaws.com/{key}`
- **Priority**: Very low — no current requirement
- **Prerequisite**: AWS account and integration approval

### Local Network Share Provider
- **Purpose**: Support documents on internal network shares
- **Backend**: SMB/CIFS network shares
- **URL Pattern**: `file://server/share/path`
- **Priority**: Very low — only if Microsoft 365 is unavailable
- **Prerequisite**: Network access and security review

## Provider Addition Process

1. Create provider specification in `providers/{name}.provider.md`
2. Implement provider interface methods
3. Register provider in the provider registry configuration
4. Add provider-specific validation rules to the validation script
5. Update documentation
6. Test with sample registry data

## Design Rules

- New providers must not break existing provider contracts
- Multiple providers can be active simultaneously
- Registry entries specify which provider they use via `storage_provider`
- No provider implementation during MVP without explicit approval
