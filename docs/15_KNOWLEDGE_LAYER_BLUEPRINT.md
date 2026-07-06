# Knowledge Layer Blueprint

## Status

**Architecture blueprint only.** Not implemented. Describes future semantic layer on top of the document registry.

## Purpose

The knowledge layer adds semantic relationships between documents, people, projects, departments, policies, and evidence. It transforms MJU-DRP from a document registry into a knowledge graph that consumer projects can navigate semantically.

## Vision

```
Current (Flat Registry):
  Document → Category
  Document → Project
  Document → Owner
  Document → Evidence

Future (Knowledge Graph):
  Document ──→ Category
  Document ──→ Project ──→ Department
  Document ──→ Owner ──→ Department
  Document ──→ Evidence ──→ Policy
  Document ──→ Related Document
  Person ──→ Department ──→ Policy
  Policy ──→ Evidence Requirement ──→ Project
```

## Entities

| Entity | Current Registry | Knowledge Layer |
|--------|:----------------:|:---------------:|
| Documents | ✅ Documents | ✅ Enriched with relationships |
| Categories | ✅ Taxonomy | ✅ Hierarchical navigation |
| Projects | ✅ Registered | ✅ With dependency graph |
| Owners | ✅ Contact info | ✅ People directory with roles |
| Evidence | ✅ Mapped to documents | ✅ Mapped to policies + criteria |
| Departments | ❌ Not tracked | ✅ Organization hierarchy |
| People | ❌ Not tracked (owner only) | ✅ Individual profiles |
| Policies | ❌ Not tracked | ✅ Policy documents and applicability |
| Relationships | ❌ Empty (schema exists) | ✅ Full relationship network |

## Relationship Types

| Relationship | Source | Target | Example |
|-------------|--------|--------|---------|
| belongs_to | Document | Category | GO2026-001 → strategic-plan |
| owned_by | Document | Person | GO2026-001 → Sustainability Office |
| part_of | Project | Department | green-office-2026 → Office of Sustainability |
| evidences | Document | Criterion | RAE-001 → RAE-CRITERIA-01 |
| governs | Policy | Project | Sustainability Policy → green-office-2026 |
| reports_to | Person | Department | researcher_a → Research Admin |
| related_to | Document | Document | GO2026-001 ↔ GO2026-002 |
| supersedes | Document | Document | v2.1 → v2.0 |

## Query Examples (Future)

```javascript
// "Find all policies applicable to the Green Office project"
knowledge.query({
  subject: "green-office-2026",
  relationship: "governs",
  direction: "incoming"
});

// "Show all evidence documents for RAE criteria related to sustainability"
knowledge.query({
  type: "evidence",
  filter: { criteria: "sustainability" }
});

// "Who are the document owners in the Research Administration department?"
knowledge.query({
  type: "person",
  filter: { department: "Research Administration" },
  relationship: "owns_document"
});
```

## Implementation Path

1. **Phase 1 — Registry Enhancement** (current)
   - Schema supports relationships (relationship.schema.json exists)
   - Evidence mapping links documents to criteria
   - Basic cross-references

2. **Phase 2 — Relationship Population** (future sprint)
   - Populate relationship registry with real data
   - Add department entity
   - Enrich owner entries with role and department

3. **Phase 3 — Knowledge Graph** (future)
   - Generate graph data structure from registry
   - Support graph queries in search index
   - Enable semantic navigation for consumer projects

4. **Phase 4 — Inference** (future)
   - Derive implicit relationships from explicit ones
   - Suggest document connections
   - Detect policy coverage gaps

## Design Principles

- Knowledge is derived from registry data, not duplicated
- Relationships are explicit (stored in relationship registry) or derived (computed)
- The knowledge layer is read-only for consumer projects
- Graph outputs are pre-generated (static-first)
- No graph database during MVP

## Constraints

- No graph database (Neo4j, etc.) without explicit approval
- Knowledge layer does not replace the document registry
- All knowledge relationships must be traceable to source data
- Consumer projects opt-in to knowledge layer outputs
