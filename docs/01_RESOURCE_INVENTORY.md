# Resource Inventory

## Current Resources

### Microsoft 365
| Resource | Status | Notes |
|----------|--------|-------|
| SharePoint Online | Available | MJU tenant |
| OneDrive for Business | Available | Individual document storage |
| Teams | Available | Channel files |
| Excel Online | Available | For ad-hoc data work |
| SharePoint Lists | Available | Possible lightweight registry alternative |

### GitHub
| Resource | Status | Notes |
|----------|--------|-------|
| Repository | Initialized | https://github.com/numtip/mjudrp |
| GitHub Actions | Available | CI/CD for validation |
| GitHub Pages | Not configured | Possible static hosting for JSON outputs |

### Development
| Resource | Status | Notes |
|----------|--------|-------|
| Node.js | Available | Runtime for validation scripts |
| VS Code / Cursor | Available | Primary development environment |
| Git | Available | Version control |

## Resource Gaps

| Missing Resource | Impact | Priority |
|-----------------|--------|----------|
| Microsoft Graph API access | Cannot automate metadata extraction from SharePoint | Medium |
| Real project documentation | Registry has sample data only | High |
| Consumer project integration | No projects consuming registry data yet | High |
| Static hosting for outputs | JSON outputs only available via GitHub raw URLs | Low |

## Dependency Map

```
MJU-DRP depends on:   Consumer projects depend on:
├── Node.js           ├── MJU-DRP JSON outputs
├── Git / GitHub      └── (their own tech stack)
├── GitHub Actions
└── Microsoft 365
```
