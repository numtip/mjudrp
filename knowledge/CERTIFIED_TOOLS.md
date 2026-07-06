# CERTIFIED Tools

## Overview

Tools that passed practical verification against real project data and workflows. These are recommended for use across MJU projects.

## Validation Tools

### AJV + ajv-formats

| Attribute | Value |
|-----------|-------|
| Use case | JSON Schema validation |
| Verified with | Real document.schema.json + 7 sample documents |
| Performance | 5ms for 7 documents; 0.71ms per document |
| Dependencies | `ajv` + `ajv-formats` |
| CI compatible | Yes (pure JS, npm ci) |
| Limitation | Requires ajv-formats for `format: uri` and `format: date-time` |
| Version tested | ajv@8, ajv-formats@2 |

**Install:** `npm install ajv ajv-formats`

## Search Tools

### MiniSearch

| Attribute | Value |
|-----------|-------|
| Use case | Client-side full-text search |
| Verified with | 7 real + 5000 simulated documents |
| Performance | 67ms for 5000 doc index; <1ms search |
| Index size | ~250 bytes per document; 1.19MB for 5000 docs |
| Dependencies | None (zero-dependency) |
| Thai support | UTF-8/Unicode compatible |
| Fuzzy search | Yes (edit distance) |

**Install:** `npm install minisearch`

## Storage & Metadata

### SharePoint Document Libraries

| Attribute | Value |
|-----------|-------|
| Use case | Primary document storage with metadata |
| Verified | Architecture — columns, versioning, permissions |
| Integration | Manual during MVP; Graph API in future |
| Limitations | No cross-site queries without Graph API |

### Dublin Core Metadata Standard

| Attribute | Value |
|-----------|-------|
| Use case | Metadata interoperability and SEO |
| Verified | 22/26 fields mapped (84.6% coverage) |
| Schema impact | None — mapping is documentation only |
| Consumer benefit | HTML meta tags for search engines |

## MCP Servers

### Filesystem MCP

| Attribute | Value |
|-----------|-------|
| Use case | AI agent filesystem operations |
| Setup | `npx @modelcontextprotocol/server-filesystem <path>` |
| Capabilities | Read, write, search, list files |
| Security | Sandboxed to configured directory |

### GitHub MCP

| Attribute | Value |
|-----------|-------|
| Use case | AI agent GitHub operations |
| Setup | `npx @github/github-mcp-server` + PAT |
| Capabilities | Repo read/write, search, issues, PRs |
| Security | Token-scoped permissions |

## AI Tools (Ad-hoc Use)

| Tool | Use | Limitations |
|------|-----|-------------|
| ChatGPT | Metadata suggestion, duplicate detection | Output requires human review |
| Claude | Metadata suggestion, duplicate detection | Output requires human review |
| Gemini | Metadata suggestion, duplicate detection | Output requires human review |

## Verification Methodology

All tools were verified using:
1. Real project data (registry documents, schemas)
2. Multiple scale levels (7 → 500 → 5000 documents where applicable)
3. Edge cases (empty queries, invalid data, missing fields)
4. CI compatibility (pure JS, no network requirements)

## Reproduce

```bash
# AJV verification
node scripts/certify-ajv.mjs

# MiniSearch verification
node scripts/certify-minisearch.mjs
```
