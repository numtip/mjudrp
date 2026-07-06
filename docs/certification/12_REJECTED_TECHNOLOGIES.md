# REJECTED Technologies

## Overview

Technologies evaluated during ECD v1.3 and confirmed as rejected during ERC v1.4. These are not suitable for MJU-DRP now or in the foreseeable future.

| # | Technology | Rejection Reason | ECD Reference |
|---|------------|-----------------|---------------|
| 1 | SharePoint Embedded | Violates "no CMS" rule; adds unnecessary complexity | `docs/discovery/01_*.md` |
| 2 | Lunr.js | Poor Thai search support; outperformed by MiniSearch | `docs/discovery/03_*.md` |
| 3 | Custom Auth / RBAC | Not needed during MVP; access managed in Microsoft 365 | `docs/discovery/08_*.md` |
| 4 | OCR Service | Out of scope; Microsoft Syntex may be a future option | `docs/discovery/01_*.md` |
| 5 | AI Chatbot | Out of scope; registry does not need conversational interface | `docs/discovery/08_*.md` |
| 6 | Workflow Engine | Out of scope; Power Automate handles workflows | `docs/discovery/01_*.md` |
| 7 | Admin Panel / CMS | Duplicates git and GitHub functionality | ADR-002 |
| 8 | Database (MVP) | Static JSON is sufficient for registry scale | ADR-003 |
| 9 | Browser MCP | Not needed for registry operations | `docs/discovery/02_*.md` |
| 10 | Search MCP | Not needed; MiniSearch handles registry search | `docs/discovery/02_*.md` |

## Why These Were Confirmed

All rejections from ECD v1.3 were re-verified during ERC:

1. **SharePoint Embedded** — No scenario exists where MJU-DRP needs an embedded CMS. SharePoint Document Libraries serve the storage role.
2. **Lunr.js** — MiniSearch's 5000-doc test at 67ms confirms it outperforms Lunr for MJU-DRP's scale. Lunr's Thai support limitation is well-documented.
3. **Custom Auth/RBAC** — Access to documents is managed entirely in Microsoft 365. The registry stores advisory `visibility` metadata only.
4. **OCR** — No requirement to extract text from scanned documents. If needed in future, Microsoft Syntex is the preferred option.
5. **Chatbot** — Registry is a data layer, not a user-facing application. Chatbots would be built by consumer projects.
6. **Workflow Engine** — Power Automate exists in the Microsoft 365 stack. Building a custom workflow engine duplicates this.
7. **Admin Panel** — GitHub UI + Git CLI provides all necessary administrative functions during MVP.
8. **Database** — 5000 MiniSearch entries occupy ~1.19MB. This fits comfortably in a JSON file committed to git.
9. **Browser MCP** — No browser automation needed for registry operations.
10. **Search MCP** — Web search is irrelevant to registry document search.

## Reinstate Conditions

These rejections should be revisited only if:

| Technology | Reinstate Condition |
|------------|-------------------|
| SharePoint Embedded | MJU-DRP scope expands to include document authoring |
| Lunr.js | MiniSearch becomes unmaintained or has critical bugs |
| Custom Auth | Registry becomes user-facing; compliance requires access control |
| OCR | Consumer project demands text extraction from scanned PDFs |
| Chatbot | Registry scope expands to user-facing search interface |
| Workflow Engine | Power Automate is unavailable; manual workflows become impractical |
| Admin Panel | Registry grows beyond what git/GitHub can manage efficiently |
| Database | Registry exceeds 50,000 documents; git performance degrades |
| Browser MCP | Registry workflow requires browser automation |
| Search MCP | Registry needs web search results in metadata |
