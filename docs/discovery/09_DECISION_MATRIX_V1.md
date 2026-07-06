# Decision Matrix v1

## Build / Buy / Reuse Decisions

Decision key: **Build** — Custom development / **Buy** — Licensed service / **Reuse** — Use existing platform / **Decline** — Not building

| # | Capability | Build | Buy | Reuse | Existing Candidate | Decision | Reason | Status | Next Step |
|---|-----------|:----:|:---:|:-----:|-------------------|----------|--------|--------|-----------|
| 1 | Document storage | ❌ | ❌ | ✅ | SharePoint / OneDrive (existing M365 tenant) | **Reuse** | Already licensed, versioned, permissioned | ✅ Active | Align folder structure with registry taxonomy |
| 2 | Metadata management | ✅ | ❌ | ❌ | MJU-DRP JSON registry + git | **Build** (lightweight) | No off-the-shelf git-based metadata registry for cross-project use | ✅ Active | Enrich with Dublin Core mapping |
| 3 | Registry format | ✅ | ❌ | ❌ | JSON files + JSON Schema | **Build** (static JSON) | Static-first principle; JSON is universal | ✅ Active | No change needed |
| 4 | Schema validation | ✅ | ❌ | ✅ | AJV (npm library) | **Reuse** (AJV) | Best-in-class JSON Schema validator; pure JS | 📐 Certify | Add AJV to validation script in Sprint 2 |
| 5 | Search index | ✅ | ❌ | ✅ | MiniSearch / Pagefind | **Reuse** (library) | Static-first compatible; Thai support | 📐 Certify | Implement MiniSearch in Sprint 2 |
| 6 | SharePoint sync | 📐 | ❌ | ✅ | Microsoft Graph API | **Reuse** (Graph API) | Official Microsoft API for SharePoint access | 📐 Future | Document integration path; wait for approval |
| 7 | OneDrive sync | 📐 | ❌ | ✅ | Microsoft Graph API | **Reuse** (Graph API) | Same API as SharePoint sync | 📐 Future | Include in Graph API integration scope |
| 8 | Consumer integration | ❌ | ❌ | ✅ | GitHub raw URLs / GitHub Pages | **Reuse** (GitHub) | Static file serving; no custom API needed | ✅ Active | Add GitHub Pages for production |
| 9 | AI metadata | ❌ | ❌ | ✅ | ChatGPT / Claude / Gemini | **Reuse** (existing AI tools) | Use existing AI providers; do not build AI engine | ✅ Active | Document manual workflow for registry population |
| 10 | Duplicate detection | ✅ | ❌ | ✅ | Claude (ad-hoc) + validation script | **Build** (validation) + **Reuse** (AI review) | Existing script detects ID dupes; AI for content dupes | ✅ Active | Enhance duplicate detection in Sprint 2 |
| 11 | MCP usage | ❌ | ❌ | ✅ | GitHub MCP + Filesystem MCP | **Reuse** (MCP servers) | Official MCP servers for repo and file operations | 📐 Certify | Enable in Cursor configuration |
| 12 | Authentication | ❌ | ❌ | ❌ | None | **Decline** | Not needed during MVP; M365 handles access | ✅ Locked | No action |
| 13 | Workflow | ❌ | ❌ | ❌ | None | **Decline** | Out of scope for registry platform | ✅ Locked | No action |
| 14 | OCR | ❌ | ❌ | ❌ | None (or Syntex future) | **Decline** | Out of scope; Syntex could handle in future | ✅ Locked | No action |
| 15 | Database | ❌ | ❌ | ❌ | None | **Decline** | Static-first during MVP | ✅ Locked | No action |

## Decision Summary

| Decision Count | Value |
|:--------------:|-------|
| Reuse | 10 |
| Build | 3 (metadata registry, duplicate detection, registry format) |
| Future (Reuse) | 3 (Graph API sync, SharePoint sync, OneDrive sync) |
| Certify (new) | 4 (AJV, MiniSearch/Pagefind, GitHub MCP, Filesystem MCP) |
| Decline | 5 (auth, workflow, OCR, database, AI engine) |

## Key Principles Guiding Decisions

1. **Use before build** — 10 of 15 capabilities are "Reuse"
2. **No unnecessary custom systems** — 5 capabilities declined
3. **Static-first** — Search, registry, validation all static-compatible
4. **Metadata-first** — Build only metadata management, not file management
5. **Token-savior** — AI tools are used ad-hoc by the owner, not built into the platform
