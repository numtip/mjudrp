# FUTURE Technologies

## Overview

Technologies that are viable and may be valuable in the future but are deferred from current sprint plans. Each has a trigger condition for re-evaluation.

| # | Technology | Future Sprint | Trigger Condition |
|---|------------|--------------|-------------------|
| 1 | Pagefind | Sprint 3+ | Consumer projects have deployed HTML pages with search needs |
| 2 | Microsoft Graph API | Sprint 3+ | Entra ID app registration approved; automated metadata sync needed |
| 3 | SharePoint Term Store | Sprint 3+ | Taxonomy exceeds ~20 categories |
| 4 | Excel Online Workflow | Sprint 3+ | Non-technical staff need to contribute metadata; manual process insufficient |
| 5 | Power Automate Integration | Sprint 3+ | Registry needs notifications or automated reactions |
| 6 | Provider Layer Implementation | Sprint 4+ | Registry scale requires structured provider abstraction |
| 7 | Plugin Layer Implementation | Sprint 4+ | Multiple search/validation strategies needed |
| 8 | Relationship Engine | Sprint 4+ | Cross-document queries become complex |
| 9 | Knowledge Layer | Sprint 4+ | Registry data needs semantic/graph querying |
| 10 | Analytics / Usage Reporting | Sprint 4+ | Consumer projects need usage insights |
| 11 | Microsoft Syntex | Future | License available; Thai language support confirmed |
| 12 | OpenRouter (multi-AI proxy) | Future | AI tool diversity increases; single-provider limits reached |
| 13 | Microsoft 365 MCP (community) | Future | Community MCP matures; production-ready |
| 14 | SharePoint MCP (community) | Future | Sharepoint MCP matures; production-ready |
| 15 | Graph MCP (community) | Future | Graph MCP matures; approved for use |

## Deferral Rationale

### Pagefind (Sprint 3+)

Pagefind is the right production search solution, but it requires HTML content to index. MJU-DRP currently produces JSON, not HTML. Until consumer projects have deployed HTML pages, Pagefind has nothing to index. MiniSearch covers all search needs during MVP.

### Microsoft Graph API (Sprint 3+)

Graph API access requires:
1. Entra ID app registration in MJU's Microsoft 365 tenant
2. IT/admin approval for API permissions
3. Development of metadata synchronization logic

None of these are feasible without coordination beyond the MJU-DRP repository. The current manual metadata workflow is sustainable for MVP.

### SharePoint Term Store (Sprint 3+)

The current taxonomy (~5 categories) is easily managed with Choice columns. The Term Store (managed metadata) becomes valuable when the taxonomy grows beyond ~20 categories or when hierarchical terms are needed.

### Provider/Plugin Layers (Sprint 4+)

These architectural layers were documented in Foundation Hardening v1.2. They will be implemented when:
- Multiple storage providers beyond filesystem are needed
- Multiple validation strategies must coexist
- The plugin architecture provides clear value over direct implementation

### Knowledge Layer (Sprint 4+)

The knowledge layer blueprint exists in `docs/15_KNOWLEDGE_LAYER_BLUEPRINT.md`. Implementation is deferred until the registry has substantial real data and consumer projects need semantic queries.

## Re-evaluation Process

To promote a FUTURE technology to an active sprint:

1. Verify the trigger condition is met
2. Re-evaluate technology fit (may have changed since ERC)
3. Create updated certification report
4. Add to sprint plan
5. Obtain project owner approval

## Future Technology Watchlist

| Technology | Watch Reason | Next Check |
|------------|-------------|------------|
| Microsoft 365 MCP | Community maturity | Sprint 3 |
| Graph MCP | Community maturity | Sprint 3 |
| Microsoft Syntex | Thai support status | Sprint 4 |
| Pagefind releases | New integration patterns | Sprint 3 |
