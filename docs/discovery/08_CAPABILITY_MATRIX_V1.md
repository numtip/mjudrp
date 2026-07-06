# Capability Matrix v1

## Assessment Results

Fit values: **High** — Ready to use / **Medium** — Needs evaluation / **Low** — Not suitable / **Future** — Defer / **Rejected** — Will not use

| Capability | Tool / Service | Fit | MVP Readiness | Complexity | Risk | Recommendation |
|------------|---------------|:---:|:-------------:|:----------:|:----:|----------------|
| Document storage | SharePoint Document Library | High | Ready | Low | Low | ✅ Reuse — primary storage |
| Document storage | OneDrive | Medium | Ready | Low | Low | ✅ Reuse — individual docs |
| Document metadata registry | MJU-DRP JSON (current) | High | Ready | Low | Low | ✅ Keep |
| Metadata columns | SharePoint Columns | High | Ready | Medium | Medium | ✅ Reuse — schema alignment needed |
| Alternative registry view | SharePoint Lists | Medium | Evaluate | Medium | Medium | ✅ Reuse as view only |
| Taxonomy | SharePoint Term Store | Future | Not needed | Medium | Low | 📐 Defer |
| Metadata standard | Dublin Core | High | Ready | Low | Low | ✅ Adopt as baseline |
| Metadata standard | schema.org CreativeWork | Medium | Optional | Low | Low | ✅ Optional for consumer projects |
| Registry validation | Custom Node.js (current) | High | Ready | Low | Low | ✅ Keep for MVP |
| Schema validation | AJV | High | Ready | Low | Low | ✅ Certify — add in Sprint 2 |
| Schema validation | Zod | Medium | Evaluate | Medium | Low | ⚠️ Candidate — TypeScript projects |
| Search — static | Static JSON (current) | High | Ready | Low | Low | ✅ Keep for MVP |
| Search — client | MiniSearch | High | Ready | Low | Low | ✅ Certify |
| Search — production | Pagefind | High | Ready | Low | Low | ✅ Certify for prod |
| Search — enterprise | Microsoft Search | Low | Not suitable | High | Medium | ❌ Not for consumer projects |
| Search — rejected | Lunr | Rejected | — | — | High | ❌ Poor Thai support |
| AI metadata | ChatGPT | High | Ready | Low | Low | ✅ Use ad-hoc |
| AI metadata | Claude | High | Ready | Low | Low | ✅ Use ad-hoc |
| AI metadata | Gemini | High | Ready | Low | Low | ✅ Use ad-hoc |
| AI metadata | OpenRouter | Future | Not needed | Medium | Low | 📐 Defer |
| MCP — GitHub | github-mcp-server | High | Ready | Low | Low | ✅ Certify |
| MCP — Filesystem | filesystem-mcp | High | Ready | Low | Low | ✅ Certify |
| MCP — Graph | graph-mcp-server | Future | Not ready | Medium | Medium | 📐 Monitor |
| MCP — SharePoint | sharepoint-mcp | Future | Not ready | Medium | Medium | 📐 Monitor |
| Validation CI | GitHub Actions | High | Ready | Low | Low | ✅ Keep |
| Consumer integration | Astro | High | Pattern documented | Low | Low | ✅ Documented |
| Consumer integration | Next.js | High | Pattern documented | Low | Low | ✅ Documented |
| Consumer integration | Vue | High | Pattern documented | Low | Low | ✅ Documented |
| Consumer integration | Laravel | High | Pattern documented | Low | Low | ✅ Documented |
| Consumer integration | Static HTML | High | Pattern documented | Low | Low | ✅ Documented |
| Microsoft Graph API | Graph API | Future | Not approved | High | Medium | 📐 Defer |
| Microsoft Syntex | Syntex | Future | License needed | High | High | 📐 Evaluate later |
| SharePoint Embedded | Embedded | Rejected | — | — | High | ❌ Violates no-CMS rule |
