# CONDITIONAL Tools

## Overview

Tools that passed practical verification but require specific conditions to be met. These are recommended with caveats.

## Validation

### AJV

| Condition | Details |
|-----------|---------|
| Must install ajv-formats | Schema uses `format: "uri"` and `format: "date-time"` — not supported by base AJV |
| Schema may need adjustments | Optional URL fields with empty strings need `anyOf` pattern in schema |

**Verified:** With ajv-formats and schema fix, all sample documents validate.

## MCP Servers

### Filesystem MCP

| Condition | Details |
|-----------|---------|
| Must configure in Cursor mcp.json | Not pre-configured; requires user or project-level setup |
| Windows path format | Use `F:/` format for Windows absolute paths |
| npx auto-install | First use downloads ~2MB package |

**Installation:** `npx @modelcontextprotocol/server-filesystem <project-path>`

### GitHub MCP

| Condition | Details |
|-----------|---------|
| Must configure in Cursor mcp.json | Not pre-configured |
| GitHub PAT required | Token needs `repo` scope |
| Token security | Store in env; never commit to repository |
| Token expiration | Set reminder; use fine-grained tokens with >6 month expiry |

**Installation:** `npx @github/github-mcp-server` with `GITHUB_TOKEN` env

## General Pattern for Conditional Technologies

Most conditional tools require:
1. Installation (`npm install` or `npx`)
2. Configuration (Cursor mcp.json or project config)
3. Authentication (tokens, API keys — never committed)

This is normal for enterprise tooling. The condition does not indicate a problem with the tool.
