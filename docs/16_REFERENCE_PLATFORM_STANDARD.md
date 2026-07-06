# Reference Platform Standard

## Purpose

This document defines the baseline reference platform for every future MJU-DRP project. All new projects should follow this standard unless explicitly exempted.

## Foundation

| Component | Requirement | MJU-DRP Status |
|-----------|-------------|----------------|
| `README.md` | Mandatory | ✅ |
| `PROJECT_CONSTITUTION.md` | Mandatory for platforms | ✅ |
| `PROJECT_MEMORY.md` | Recommended | ✅ |
| `NEXT_SPRINT_PLAN.md` | Recommended | ✅ |

## Memory System

| File | Purpose | Status |
|------|---------|--------|
| `memory/CURRENT_STATE.md` | Current project state | ✅ |
| `memory/NEXT_TASK.md` | Immediate next tasks | ✅ |
| `memory/LAST_HANDOFF.md` | Agent handoff summary | ✅ |
| `memory/SESSION_LOG.md` | Append-only session log | ✅ |
| `memory/DECISIONS.md` | Architecture Decision Records | ✅ |
| `memory/ARCHITECTURE_LOCK.md` | Locked architecture rules | ✅ |
| `memory/PROJECT_BASELINE.md` | Project baseline definition | ✅ |
| `memory/PROJECT_CAPABILITIES.md` | Current capabilities list | ✅ |
| `memory/PROJECT_CONSTRAINTS.md` | Current constraints list | ✅ |

## Runtime

| File | Purpose | Status |
|------|---------|--------|
| `runtime/CURRENT_RUNTIME.md` | Runtime execution snapshot | ✅ |
| `runtime/CURRENT_PHASE.md` | Current development phase | ✅ |
| `runtime/CURRENT_PROVIDER.md` | Active provider status | ✅ |
| `runtime/CURRENT_CONSTRAINTS.md` | Active constraints | ✅ |
| `runtime/CURRENT_OUTPUTS.md` | Current outputs | ✅ |
| `runtime/RUNTIME_POLICY.md` | Runtime operation rules | ✅ |

## Registry

| Component | Requirement | Status |
|-----------|-------------|--------|
| JSON schemas | Mandatory | ✅ 6 schemas |
| Sample registry data | Mandatory | ✅ 5 files |
| Validation script | Mandatory | ✅ validates-registry.mjs |
| Search index generator | Recommended | ✅ generate-search-index.mjs |
| Memory update script | Recommended | ✅ update-memory.mjs |

## Providers

| Component | Requirement | Status |
|-----------|-------------|--------|
| Provider README | Mandatory | ✅ |
| Provider interface | Mandatory | ✅ |
| SharePoint provider | Recommended | ✅ |
| OneDrive provider | Recommended | ✅ |
| Filesystem provider | Recommended | ✅ |
| Future providers blueprint | Recommended | ✅ |

## Adapters

| Component | Requirement | Status |
|-----------|-------------|--------|
| Adapter README | Mandatory | ✅ |
| Microsoft Graph adapter | Recommended | ✅ |
| SharePoint adapter | Recommended | ✅ |
| OneDrive adapter | Recommended | ✅ |
| GitHub adapter | Recommended | ✅ |

## Plugins

| Component | Requirement | Status |
|-----------|-------------|--------|
| Plugin README | Recommended | ✅ |
| Metadata plugin | Blueprint | ✅ |
| Validator plugin | Blueprint | ✅ |
| Search plugin | Blueprint | ✅ |
| Export plugin | Blueprint | ✅ |
| Import plugin | Blueprint | ✅ |

## Contracts

| Component | Requirement | Status |
|-----------|-------------|--------|
| Contracts README | Recommended | ✅ |
| Consumer contract | Recommended | ✅ |
| Provider contract | Recommended | ✅ |
| Registry contract | Recommended | ✅ |
| Schema versioning policy | Recommended | ✅ |

## Governance

| Component | Requirement | Status |
|-----------|-------------|--------|
| Architecture locks | Mandatory for platforms | ✅ 8 locks |
| ADR process | Mandatory | ✅ 6 ADRs |
| Validation CI | Mandatory | ✅ GitHub Actions |
| Documentation | Mandatory | ✅ 16 docs files |

## Token-Savior Workflow

| Component | Requirement | Status |
|-----------|-------------|--------|
| Token-savior workflow doc | Mandatory | ✅ |
| Context pack standard | Recommended | ✅ |
| Project memory system doc | Recommended | ✅ |
| Report format standard | Mandatory | ✅ |

## GitHub Workflow

| Component | Requirement | Status |
|-----------|-------------|--------|
| CI validation | Mandatory | ✅ |
| Schema validation | Recommended | ✅ (included in validate) |
| Output generation | Recommended | ✅ |
| Upload artifacts | Recommended | ✅ |

## Validation

| Check | Tool | Status |
|-------|------|--------|
| Registry data validation | validate-registry.mjs | ✅ |
| Output generation | generate-search-index.mjs | ✅ |
| Memory update | update-memory.mjs | ✅ |
| CI automation | .github/workflows/validate.yml | ✅ |

## Documentation

| Area | Files | Status |
|------|-------|--------|
| Enterprise architecture | `docs/00_` – `docs/02_` | ✅ |
| Build vs buy | `docs/03_` | ✅ |
| Tool usage policy | `docs/04_` | ✅ |
| Registry architecture | `docs/05_` | ✅ |
| Consumer integration | `docs/06_` | ✅ |
| Microsoft 365 strategy | `docs/07_` | ✅ |
| Governance model | `docs/08_` | ✅ |
| Roadmap | `docs/09_` | ✅ |
| Token-savior workflow | `docs/10_` | ✅ |
| Context pack standard | `docs/11_` | ✅ |
| Project memory system | `docs/12_` | ✅ |
| Enterprise folder standard | `docs/13_` | ✅ |
| Architecture evolution | `docs/14_` | ✅ |
| Knowledge layer blueprint | `docs/15_` | ✅ |
| Reference platform standard | `docs/16_` | ✅ |

## Cursor IDE Rules

| Component | Requirement | Status |
|-----------|-------------|--------|
| Project rules | Mandatory | ✅ `.cursor/rules/mjudrp.mdc` |
| Memory system rules | Mandatory | ✅ Included |
| Report format rules | Mandatory | ✅ Included |

## Adoption

New projects should:
1. Copy the relevant sections of this standard
2. Remove components not applicable to the project type
3. Add project-specific extensions
4. Update the memory system with project-specific information
5. Register the project in MJU-DRP's project registry
