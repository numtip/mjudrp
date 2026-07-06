# Context Pack Standard

## What is a Context Pack?

A context pack is a compact summary of a file or set of files that an AI agent can use instead of reading the full file. Context packs preserve essential information while minimizing token usage.

## When to Use Context Packs

Use a context pack when:
- Referencing a large file (>100 lines) in a chat message
- Providing file summaries to another agent
- Including file contents in a limited-token environment
- Referencing multiple files at once

## Context Pack Format

### For Single Files

```
📄 path/to/file.ext (XX lines)
  Purpose: [one-line description]
  Key sections:
    - section_name (line N): [brief description]
    - section_name (line N): [brief description]
  Key data:
    - [key data point 1]
    - [key data point 2]
```

### For Directories

```
📁 path/to/dir/
  ├── file1.ext (XX lines) — [purpose]
  ├── file2.ext (XX lines) — [purpose]
  └── file3.ext (XX lines) — [purpose]
```

### For Registry Data

```
📊 registry/documents.sample.json (7 entries)
  Projects: green-office-2026, rae-landing, learning-center
  Categories: strategic-plan, guideline, report, template, catalog
  Owners: sustainability, research, learning
  Evidence maps: 6 entries
```

### For Schemas

```
📐 schemas/document.schema.json
  Required fields: id, title, category, owner, storage_provider,
                   storage_path, share_url, project_refs
  Optional fields: 20+ metadata fields
  Enums: status, storage_provider, visibility
```

## Context Pack Examples

### File Manifest
```
mjudrp/
├── 6 schemas (document, category, project, owner, evidence, relationship)
├── 5 registry files (7 docs, 3 cats, 3 projects, 3 owners, 6 evidence maps)
├── 3 scripts (validate, search-index, update-memory)
├── 6 memory files (state, next-task, handoff, log, decisions, locks)
├── 13 docs (architecture, governance, roadmap, etc.)
├── 1 CI workflow (validate.yml)
├── 1 cursor rule (mjudrp.mdc)
└── 4 root files (README, constitution, memory, sprint plan)
```

### Schema Version Summary
```
Schemas:
  document: 22 fields, 8 required, 4 enums
  category: 8 fields, 3 required
  project: 12 fields, 3 required
  owner: 6 fields, 3 required
  evidence: 10 fields, 4 required
  relationship: 6 fields, 3 required
```

## Benefits

- Reduces token consumption by 70-90% for file references
- Preserves essential context without full file contents
- Enables faster agent onboarding
- Standardizes communication between agents
