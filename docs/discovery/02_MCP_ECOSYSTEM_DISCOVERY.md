# MCP Ecosystem Discovery

## Discovery Scope

Investigated current MCP (Model Context Protocol) servers relevant to MJU-DRP workflows. MCP enables AI agents (Cursor, Claude, etc.) to interact directly with tools and data sources.

**Note:** MCP ecosystem evolves rapidly. This is a snapshot assessment.

---

### Microsoft 365 MCP

| Field | Value |
|-------|-------|
| Name | ms365-mcp (community) |
| Source | GitHub — various community implementations |
| Capabilities | Read SharePoint lists, files; send email; calendar access |
| Auth model | OAuth 2.0 / device code flow via Entra ID |
| Maintenance | Community-maintained; varies by implementation |
| Security | Needs app registration; permissions scoped by Graph consent |
| Cursor compatibility | Yes — MCP protocol supported |
| Recommendation | Monitor. Do not install during MVP. Requires Entra ID setup. |

### SharePoint MCP

| Field | Value |
|-------|-------|
| Name | sharepoint-mcp (community) |
| Source | GitHub — sml2h3/sharepoint-mcp, others |
| Capabilities | Read SharePoint document libraries, list items, search |
| Auth model | SharePoint App Principal or delegated user |
| Maintenance | Community; variable update frequency |
| Security | Needs SharePoint app permissions |
| Cursor compatibility | Yes |
| Recommendation | Monitor. Not ready for production dependency. |

### Microsoft Graph MCP

| Field | Value |
|-------|-------|
| Name | graph-mcp-server (community) |
| Source | GitHub — various (e.g., markuswt/graph-mcp) |
| Capabilities | Read/write Graph API resources — users, files, sites, messages |
| Auth model | OAuth 2.0 (client credentials or device code) |
| Maintenance | Community; most are experimental |
| Security | Requires Graph API app registration with broad scopes |
| Cursor compatibility | Yes |
| Recommendation | Monitor. Would be primary MCP for M365 access when approved. |

### OneDrive MCP

| Field | Value |
|-------|-------|
| Name | Part of Graph MCP or standalone community tools |
| Source | GitHub — few standalone options |
| Capabilities | Read OneDrive files, folders, metadata |
| Auth model | OAuth 2.0 via Graph API |
| Maintenance | Low — few dedicated implementations |
| Recommendation | Use Graph MCP instead of standalone OneDrive MCP. |

### Excel MCP

| Field | Value |
|-------|-------|
| Name | excel-mcp (community) |
| Source | GitHub — various |
| Capabilities | Read/write Excel files, worksheets |
| Auth model | Varies; some use Graph API, some file-based |
| Maintenance | Low — experimental |
| Recommendation | Not recommended during MVP. Use Excel Online + JSON export instead. |

### GitHub MCP

| Field | Value |
|-------|-------|
| Name | github-mcp (official — Anthropic partner) |
| Source | GitHub — github/github-mcp-server |
| Capabilities | Repository management, issues, PRs, code search, files |
| Auth model | GitHub Personal Access Token |
| Maintenance | High — officially maintained by GitHub |
| Security | Token-scoped permissions; widely used |
| Cursor compatibility | ✅ Yes — widely used with Cursor |
| Recommendation | ✅ **Certify** — High value for AI agent integration with MJU-DRP repo. |

### Filesystem MCP

| Field | Value |
|-------|-------|
| Name | filesystem-mcp (official — Anthropic) |
| Source | GitHub — modelcontextprotocol/servers |
| Capabilities | Read/write local filesystem; file search, directory listing |
| Auth model | None (filesystem access) |
| Maintenance | High — part of official MCP servers repository |
| Security | Sandboxed to configured directories |
| Cursor compatibility | ✅ Yes |
| Recommendation | ✅ **Certify** — Useful for local file operations on registry data. |

### Browser MCP

| Field | Value |
|-------|-------|
| Name | playwright-mcp (community) |
| Source | GitHub — various Playwright-based MCPs |
| Capabilities | Browser automation, page capture, form filling |
| Auth model | None |
| Maintenance | Medium |
| Recommendation | Low priority for MJU-DRP. Not needed for registry operations. |

### Search MCP

| Field | Value |
|-------|-------|
| Name | search-mcp / web-search-mcp (community) |
| Source | GitHub — various implementations |
| Capabilities | Web search, often via Brave Search, Bing, or DuckDuckGo |
| Auth model | API key for some backends |
| Maintenance | Medium |
| Recommendation | Low priority. Useful for research but not core registry operations. |

---

## Summary

| MCP Server | Certify for MVP? | Notes |
|------------|:----------------:|-------|
| GitHub MCP | ✅ Yes | High value for repo operations |
| Filesystem MCP | ✅ Yes | Local file operations |
| Microsoft Graph MCP | 📐 Monitor | Future when Graph integration approved |
| SharePoint MCP | 📐 Monitor | Future |
| Microsoft 365 MCP | 📐 Monitor | Future |
| OneDrive MCP | 📐 Monitor | Use Graph MCP instead |
| Excel MCP | ❌ Not yet | Use Excel Online + JSON |
| Browser MCP | ❌ Low priority | Not needed |
| Search MCP | ❌ Low priority | Not needed for registry |
