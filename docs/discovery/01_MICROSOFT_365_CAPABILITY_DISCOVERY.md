# Microsoft 365 Capability Discovery

## Discovery Scope

Investigated 14 Microsoft 365 capabilities for MJU-DRP reuse potential.

---

### Microsoft Graph API

| Field | Value |
|-------|-------|
| Capability | Unified REST API for Microsoft 365 (SharePoint, OneDrive, Entra ID, Teams, etc.) |
| Use case for MJU-DRP | Automated metadata extraction, file listing, share URL generation |
| MVP fit | Medium — not needed for MVP JSON-based registry |
| Pros | One API for all M365 services; official Microsoft SDKs |
| Cons | Requires Entra ID app registration; OAuth 2.0 setup; rate limits |
| Risk | IT approval needed; security review required |
| Recommendation | Document as future integration path. Do not implement during MVP. |

### SharePoint REST API

| Field | Value |
|-------|-------|
| Capability | Native REST API for SharePoint Online (`_api/web/lists`, `_api/web/getfilebyserverrelativeurl`) |
| Use case for MJU-DRP | Access SharePoint document libraries and list metadata |
| MVP fit | Low — requires authentication, better done via Graph API |
| Pros | Direct SharePoint access; no additional setup beyond SharePoint |
| Cons | Legacy API; less feature-rich than Graph; site-scoped |
| Risk | Deprecation path toward Graph API |
| Recommendation | Do not use. Prefer Microsoft Graph API for all SharePoint access. |

### SharePoint Document Library

| Field | Value |
|-------|-------|
| Capability | SharePoint document storage with metadata columns, versioning, check-in/out |
| Use case for MJU-DRP | Primary document storage for all consumer projects |
| MVP fit | High — already proposed in integration strategy |
| Pros | Version history, co-authoring, permissions, folder hierarchy, metadata columns |
| Cons | Requires SharePoint site setup per project |
| Risk | Access may need IT provisioning |
| Recommendation | ✅ **Reuse** — Target storage location for all MJU documents. |

### SharePoint Lists

| Field | Value |
|-------|-------|
| Capability | Lightweight list/database within SharePoint |
| Use case for MJU-DRP | Alternative dynamic registry view; metadata management by non-technical users |
| MVP fit | Medium — could serve as alternative registry frontend |
| Pros | Familiar UI, Excel-like, no code, permissions, Power Automate integration |
| Cons | Not git-tracked; harder to version; diverges from git source of truth |
| Risk | Data drift between SharePoint List and git registry |
| Recommendation | ✅ **Reuse** as alternative view only. Git remains source of truth. |

### SharePoint Columns

| Field | Value |
|-------|-------|
| Capability | Custom metadata columns on SharePoint document libraries |
| Use case for MJU-DRP | Document metadata stored alongside files in SharePoint |
| MVP fit | High — aligns with metadata-first approach |
| Pros | Metadata travels with the document; searchable; column templates |
| Cons | Manual setup per library; schema must match registry schema |
| Risk | Schema drift between registry and SharePoint columns |
| Recommendation | ✅ **Reuse** — Define SharePoint columns matching registry schema. |

### SharePoint Term Store

| Field | Value |
|-------|-------|
| Capability | Managed metadata taxonomy service in SharePoint |
| Use case for MJU-DRP | Enterprise taxonomy for document categories |
| MVP fit | Low — adds complexity; taxonomy is simple JSON for now |
| Pros | Centralized taxonomy; reusable across sites; multi-language |
| Cons | Requires Term Store admin; overkill for 5 categories |
| Risk | Maintenance burden for small taxonomy |
| Recommendation | ✅ **Reuse in future** when taxonomy grows beyond ~20 categories. |

### Microsoft Search

| Field | Value |
|-------|-------|
| Capability | Enterprise search across SharePoint, OneDrive, Exchange, Teams |
| Use case for MJU-DRP | Organization-wide document discovery |
| MVP fit | Low — consumer projects need their own search |
| Pros | Indexes all M365 content; AI-powered results; connectors |
| Cons | Cannot be embedded in consumer project websites directly |
| Risk | Not controllable from MJU-DRP |
| Recommendation | Document as enterprise search option. Use static JSON search for consumer projects. |

### OneDrive API

| Field | Value |
|-------|-------|
| Capability | Access OneDrive files via Microsoft Graph |
| Use case for MJU-DRP | Document listing, metadata extraction for individually owned files |
| MVP fit | Low — not needed until real metadata sync |
| Pros | Part of Graph API; SDK available |
| Cons | Same auth requirements as Graph API |
| Recommendation | Include in Graph API integration scope. Not separate implementation. |

### Excel Online

| Field | Value |
|-------|-------|
| Capability | Browser-based spreadsheet editing and collaboration |
| Use case for MJU-DRP | Ad-hoc data collection, spreadsheet-based registry import/export |
| MVP fit | High — already used for data gathering |
| Pros | Familiar to non-technical users; real-time collaboration |
| Cons | Not a database; JSON export step needed; data validation limited |
| Risk | Users may treat Excel as the source of truth |
| Recommendation | ✅ **Reuse** for initial data collection. Export to JSON for registry. Git remains source of truth. |

### Microsoft Graph SDK for JavaScript

| Field | Value |
|-------|-------|
| Capability | Official JavaScript SDK for Microsoft Graph API |
| Use case for MJU-DRP | Client-side or Node.js access to Microsoft Graph |
| MVP fit | Low — no Graph integration during MVP |
| Pros | TypeScript support, auth helpers, pagination handling |
| Cons | Adds dependency; 10MB+ package size |
| Recommendation | ✅ **Reuse** when Graph integration is approved. |

### Microsoft Graph Toolkit

| Field | Value |
|-------|-------|
| Capability | Web components for Microsoft Graph (login, people picker, file list, etc.) |
| Use case for MJU-DRP | UI components for consumer projects (file browser, person card) |
| MVP fit | Low — consumer projects not being built in this sprint |
| Pros | Drop-in web components; handles auth; themable |
| Cons | Requires Entra ID; web component dependency |
| Recommendation | ✅ **Reuse** when consumer projects need M365 UI components. |

### SharePoint Embedded

| Field | Value |
|-------|-------|
| Capability | Embed SharePoint document storage in custom applications (via API) |
| Use case for MJU-DRP | Custom document management UI (explicitly not building this) |
| MVP fit | Rejected — MJU-DRP does not build a document management UI |
| Pros | Isolated storage, API-driven |
| Cons | Licensing cost; complex setup; violates no-CMS rule |
| Recommendation | ❌ **Rejected** — MJU-DRP does not build CMS or document management UI. |

### Microsoft Syntex

| Field | Value |
|-------|-------|
| Capability | AI-powered content processing (metadata extraction, OCR, document classification) |
| Use case for MJU-DRP | Automated metadata extraction from documents |
| MVP fit | Low — requires Syntex license; overkill for MVP |
| Pros | AI metadata extraction, content assembly, compliance |
| Cons | Per-user licensing; complex setup; Thai language support unclear |
| Risk | Licensing cost; may not support Thai |
| Recommendation | Document for future evaluation. Not during MVP. |

### Microsoft Entra ID

| Field | Value |
|-------|-------|
| Capability | Identity and access management for Microsoft 365 |
| Use case for MJU-DRP | Authentication for Graph API access (future) |
| MVP fit | Low — no auth during MVP |
| Pros | Industry standard; integrated with M365 |
| Cons | Needs app registration; permission scopes must be configured |
| Recommendation | ✅ **Reuse** when Graph API integration is approved. |

---

## Summary

| Capability | Recommendation | MVP Priority |
|------------|---------------|:------------:|
| SharePoint Document Library | ✅ Reuse | High |
| SharePoint Lists | ✅ Reuse (as view) | Medium |
| SharePoint Columns | ✅ Reuse | High |
| Excel Online | ✅ Reuse | High |
| Microsoft Graph API | 📐 Future integration | Low |
| Microsoft Graph SDK | 📐 Future dependency | Low |
| Microsoft Graph Toolkit | 📐 Future dependency | Low |
| SharePoint Term Store | 📐 Future adoption | Low |
| Microsoft Search | 📐 Enterprise option | Low |
| SharePoint REST API | ❌ Do not use | None |
| SharePoint Embedded | ❌ Rejected | None |
| Microsoft Syntex | 📐 Future evaluation | None |
| Microsoft Entra ID | 📐 Future dependency | Low |
