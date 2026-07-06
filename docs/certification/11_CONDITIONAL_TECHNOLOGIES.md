# CONDITIONAL Technologies

## Overview

Technologies that are certified but require specific conditions to be met before implementation. The condition must be satisfied during Sprint 2 integration.

| # | Technology | Condition | Risk if Unmet | Verification |
|---|------------|-----------|---------------|--------------|
| 1 | AJV + ajv-formats | Must install `ajv-formats` alongside AJV for `format: "uri"` and `format: "date-time"` validation | Schema validation will fail on URI format; poor error messages | `scripts/certify-ajv.mjs` reproduces |
| 2 | Filesystem MCP | Must be configured in Cursor `mcp.json` with path to MJU-DRP project root | AI agent cannot access registry files natively | Manual config in Cursor Settings |
| 3 | GitHub MCP | Must be configured in Cursor `mcp.json` with valid GitHub PAT | AI agent cannot read/write repository without CLI | Manual config in Cursor Settings |

## Condition Details

### AJV + ajv-formats

**Condition:** Add both `ajv` and `ajv-formats` to `package.json` dependencies.

```bash
npm install ajv ajv-formats
```

**Why:** The document schema uses `"format": "uri"` and `"format": "date-time"` which are not validated by base AJV. Without `ajv-formats`, these validators are silently ignored, potentially allowing invalid URLs and dates through validation.

**Verified:** With `ajv-formats`, all 7 sample documents pass validation. Without it, schema compilation errors occur on URI format.

**Status:** Low-risk condition — both packages are maintained by the same team.

### Filesystem MCP

**Condition:** Add to Cursor MCP configuration.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "F:/projectAI/mjudrp"]
    }
  }
}
```

**Why:** Without explicit configuration, the Filesystem MCP server is not available to AI agents. npx auto-installs the server on first use.

**Status:** Standard configuration step for any Cursor project using MCP.

### GitHub MCP

**Condition:** Add to Cursor MCP configuration with a valid GitHub PAT.

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@github/github-mcp-server"],
      "env": { "GITHUB_TOKEN": "<pat>" }
    }
  }
}
```

**Why:** The server requires a GitHub Personal Access Token for API authentication. The token must have appropriate `repo` scope.

****Status:** Standard configuration. Token management (no accidental commits) is the main concern.

## Conditional Handling in Sprint 2

| Technology | Sprint 2 Action | Owner |
|------------|----------------|-------|
| AJV | Add `ajv` + `ajv-formats` to dependencies; update validate-registry.mjs | Developer |
| Filesystem MCP | Add to Cursor `mcp.json` | Developer |
| GitHub MCP | Generate PAT; add to Cursor `mcp.json` | Developer |

## Escalation

If any condition cannot be met during Sprint 2:

1. **AJV without ajv-formats** — Possible but reduces validation quality. Document the trade-off.
2. **No Filesystem MCP** — AI agents can still use manual file tools. Reduced efficiency.
3. **No GitHub MCP** — AI agents can still use git CLI. Reduced efficiency.

None of these conditions block the sprint — they are optimization and correctness improvements.
