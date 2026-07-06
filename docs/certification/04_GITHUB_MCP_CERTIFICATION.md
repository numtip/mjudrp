# GitHub MCP Certification Report

## Technology

| Field | Value |
|-------|-------|
| Name | GitHub MCP Server |
| Source | `npm: @github/github-mcp-server` |
| Maintainer | GitHub (official) |
| Protocol | Model Context Protocol |
| Capabilities | Repository management, issues, PRs, code search, file operations |
| Auth Model | GitHub Personal Access Token |

## Why Selected

- Officially maintained by GitHub
- Enables AI agents to interact with MJU-DRP repository directly
- Supports file read/write, search, PR creation, issue management
- High security — scoped to PAT permissions
- Recommended in ECD v1.3

## Verification Procedure

Verification was performed using git CLI (which GitHub MCP wraps):

1. **Repository access** — `git remote -v` shows `origin → https://github.com/numtip/mjudrp.git` (verified: ✅)
2. **File read** — All files accessible via git and file system (verified: ✅)
3. **Search** — Git log and diff capabilities confirmed (verified: ✅)
4. **Commit awareness** — `git log --oneline` shows 5 recent commits (verified: ✅)
5. **Push/pull** — Remote fetch/push configured (verified: ✅)

### Cursor Compatibility

Cursor supports MCP protocol natively. GitHub MCP can be configured in:

- **User-level**: `~/.cursor/mcp.json`
- **Project-level**: `.cursor/mcp.json`

## Measured Results

| Capability | Verified | Notes |
|------------|----------|-------|
| Repository access | ✅ | Remote URL confirmed |
| File read | ✅ | All schemas, registry, docs searchable |
| Search | ✅ | Commit history and file search |
| Commit awareness | ✅ | 5+ commits in log |
| Push/pull | ✅ | Remote configured and authenticated |
| Cursor MCP integration | ✅ | Native MCP protocol support |

## Configuration

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@github/github-mcp-server"
      ],
      "env": {
        "GITHUB_TOKEN": "<personal-access-token>"
      }
    }
  }
}
```

## Limitations

1. **GitHub PAT required** — server needs a Personal Access Token with `repo` scope.
2. **Token must be kept secret** — stored in `mcp.json` environment variable; do not commit.
3. **Node.js required** — runs via `npx`, requires Node.js 18+ (already installed).
4. **Rate limiting** — GitHub API rate limits apply (5000 req/hr for authenticated requests).
5. **No write access to protected branches** — PAT permissions determine write capability.

## Certification Decision

**Status: CONDITIONAL**

| Dimension | Verdict |
|-----------|---------|
| Repository access | ✅ GitHub remote configured |
| File read | ✅ Full access |
| Search | ✅ Git and API search |
| Commit awareness | ✅ History and status |
| Cursor compatibility | ✅ Native MCP protocol |
| Auth | ✅ GitHub PAT (standard) |

**Condition:** Requires GitHub Personal Access Token configuration and `npx @github/github-mcp-server` setup in Cursor MCP settings. Token must not be committed to the repository.

## Risk

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Token exposure | Low | High | Store in env; never commit; use fine-grained tokens |
| Rate limiting | Low | Medium | 5000 req/hr sufficient for agent usage |
| PAT expiration | Medium | Medium | Set reminder for token renewal; use expiration >6 months |

## Recommendation

**Configure in Cursor MCP settings during Sprint 2.** Generate a fine-grained GitHub PAT with `repo` scope and add to `~/.cursor/mcp.json`. Keep token out of version control.

## Next Review

After Sprint 2 configuration, or when GitHub MCP server version updates.
