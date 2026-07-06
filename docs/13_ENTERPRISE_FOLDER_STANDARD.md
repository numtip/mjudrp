# Enterprise Folder Standard

## Purpose

Standardize folder structure across all MJU enterprise projects. This standard ensures consistency, discoverability, and maintainability across Green Office, RAE Landing, Learning Center, Knowledge Engine, MJU-DRP, and future projects.

## Standard Structure

Every enterprise project repository should follow this structure where applicable:

```text
{project-root}/
├── README.md                     # Project overview and quick start
├── PROJECT_CONSTITUTION.md       # Mission, values, and rules
├── PROJECT_MEMORY.md             # Quick reference for AI agents
├── NEXT_SPRINT_PLAN.md           # Current sprint objectives
│
├── docs/                         # Architecture and governance
│   ├── 00_ENTERPRISE_ARCHITECTURE.md
│   ├── 01_RESOURCE_INVENTORY.md
│   ├── ...sequential numbering
│   └── README.md
│
├── memory/                       # AI agent memory system
│   ├── CURRENT_STATE.md
│   ├── NEXT_TASK.md
│   ├── LAST_HANDOFF.md
│   ├── SESSION_LOG.md
│   ├── DECISIONS.md
│   ├── ARCHITECTURE_LOCK.md
│   ├── PROJECT_BASELINE.md
│   ├── PROJECT_CAPABILITIES.md
│   └── PROJECT_CONSTRAINTS.md
│
├── schemas/                      # JSON schemas
│   └── *.schema.json
│
├── registry/                     # Registry/metadata data files
│   └── *.sample.json
│
├── providers/                    # Storage provider definitions
│   ├── README.md
│   ├── provider.interface.md
│   └── *.provider.md
│
├── adapters/                     # External platform adapters
│   ├── README.md
│   └── *-adapter.md
│
├── plugins/                      # Plugin definitions
│   ├── README.md
│   └── *-plugin.md
│
├── runtime/                      # Runtime state and policy
│   ├── CURRENT_RUNTIME.md
│   ├── CURRENT_PHASE.md
│   ├── CURRENT_PROVIDER.md
│   ├── CURRENT_CONSTRAINTS.md
│   ├── CURRENT_OUTPUTS.md
│   └── RUNTIME_POLICY.md
│
├── contracts/                    # Compatibility contracts
│   ├── README.md
│   └── *-contract.md
│
├── scripts/                      # Automation and utility scripts
├── tests/                        # Tests
├── examples/                     # Usage examples
├── dist/                         # Generated outputs
│
├── .github/workflows/            # CI/CD
├── .cursor/rules/                # Cursor IDE rules
└── .gitignore
```

## Mandatory Files

Every project must have:

| File | Purpose | Required For |
|------|---------|--------------|
| `README.md` | Project overview | All projects |
| `PROJECT_CONSTITUTION.md` | Mission and rules | Platform projects |
| `memory/ARCHITECTURE_LOCK.md` | Locked architecture rules | Platform projects |
| `memory/DECISIONS.md` | ADR log | Platform projects |

## Optional Files

| File | When to Include |
|------|-----------------|
| `PROJECT_MEMORY.md` | When AI agent continuity is needed |
| `NEXT_SPRINT_PLAN.md` | When project has active sprint plan |
| `schemas/` | When structured data is managed |
| `registry/` | When registry data is collected |
| `providers/` | When storage providers are abstracted |
| `adapters/` | When external platforms are integrated |
| `plugins/` | When extension points are needed |
| `runtime/` | When runtime state is tracked |
| `contracts/` | When service compatibility is critical |

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Directories | kebab-case | `green-office-2026/` |
| Markdown files | UPPER_SNAKE_CASE | `PROJECT_CONSTITUTION.md` |
| Docs files | Numbered snake_case | `00_ARCHITECTURE.md` |
| JSON schemas | kebab-case | `document.schema.json` |
| Registry data | kebab-case | `documents.sample.json` |
| Scripts | kebab-case | `validate-registry.mjs` |
| Provider/Adapter/Plugin dirs | kebab-case | `sharepoint.provider.md` |
| Memory files | UPPER_SNAKE_CASE | `CURRENT_STATE.md` |

## Project Types

### Platform Project (e.g., MJU-DRP)
Full standard with all layers, schemas, registry, providers, adapters, plugins, contracts, memory system.

### Consumer Project (e.g., RAE Landing)
Minimal: README, docs, schemas (if needed), registry (if consuming), memory (if AI-assisted).

### Utility Project (e.g., scripts, tools)
Minimal: README, scripts, tests, docs as needed.

## Folder Standard Compliance

| MJU-DRP | Status |
|---------|--------|
| All mandatory files | ✅ |
| All standard directories | ✅ |
| Naming conventions | ✅ |
| Memory system | ✅ |
| Documentation sequential numbering | ✅ |

Other projects should adopt this standard when initialized or during their next restructuring sprint.
