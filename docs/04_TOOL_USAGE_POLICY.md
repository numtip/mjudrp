# Tool Usage Policy

## Approved Tools

### Microsoft 365 Suite
| Tool | Purpose | Usage Rules |
|------|---------|-------------|
| SharePoint Online | Document storage, team libraries | Store binary files only. Keep folder structure aligned with registry taxonomy. |
| OneDrive for Business | Personal document workspace | Share URLs to documents in the registry. |
| Teams | Channel file sharing | Link Teams files via SharePoint. |
| Excel Online | Ad-hoc data analysis, spreadsheet-based registry views | Do not use as primary registry. Export to JSON for registry. |
| SharePoint Lists | Lightweight registry alternative (future) | Evaluate when dynamic list views are needed. |

### GitHub
| Tool | Purpose | Usage Rules |
|------|---------|-------------|
| GitHub Repository | Source of truth for all registry data | All metadata, schemas, scripts, docs live here. |
| GitHub Actions | CI/CD for validation and generation | Run validate and generate on every push. |
| GitHub Issues | Task tracking, bug reports | Use for work items. |
| GitHub Pages | Static hosting (future) | Host generated JSON outputs. |

### Development Tools
| Tool | Purpose | Usage Rules |
|------|---------|-------------|
| Node.js | Script runtime | Runtime for validation and generation scripts. |
| VS Code / Cursor | Development environment | Use Cursor rules from `.cursor/rules/mjudrp.mdc`. |
| Git | Version control | Commit frequently. Write meaningful commit messages. |

### MCP Servers (Newly Approved)
| Tool | Purpose | Usage Rules |
|------|---------|-------------|
| GitHub MCP | Repository operations, file management | Configure in Cursor; use for repo ops |
| Filesystem MCP | Local file access for registry editing | Sandbox to project directory |

### Libraries (Newly Approved)
| Tool | Purpose | Usage Rules |
|------|---------|-------------|
| AJV | JSON Schema validation | Add to validation script in Sprint 2 |
| MiniSearch | Client-side search index | Add to search index generation in Sprint 2 |
| Pagefind | Production static search | Use when consumer projects need production search |

### AI Providers (Approved for Ad-Hoc Use)
| Tool | Purpose | Usage Rules |
|------|---------|-------------|
| ChatGPT | Metadata suggestion, keyword generation | Manual use by owner |
| Claude | Quality review, evidence mapping | Manual use by owner |
| Gemini | Metadata suggestion, document analysis | Manual use by owner |

## Forbidden Tool Usage

- **Do not use** external databases (PostgreSQL, MongoDB, etc.)
- **Do not use** authentication services (Auth0, Firebase Auth, etc.)
- **Do not use** CMS platforms (WordPress, Strapi, etc.)
- **Do not use** OCR services (unless explicitly approved)
- **Do not use** AI chatbot services (unless explicitly approved)
- **Do not use** proprietary SaaS for registry data (data must remain in GitHub)

## Tool Evaluation Process

When considering a new tool:
1. Can an existing approved tool fulfill the need?
2. Is the tool free / open source?
3. Does the tool increase maintenance burden?
4. Is the tool approved by the project owner?
